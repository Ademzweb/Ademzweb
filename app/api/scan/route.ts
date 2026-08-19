import { NextRequest, NextResponse } from "next/server";
import dns from "node:dns";
import tls from "node:tls";
import https from "node:https";

// ── Types ────────────────────────────────────────────────────────────────────

interface DnsResult {
  a: string[];
  mx: Array<{ exchange: string; priority: number }>;
  ns: string[];
  txt: string[];
}

interface SslResult {
  subject: string;
  issuer: string;
  validFrom: string;
  validTo: string;
  daysUntilExpiry: number;
  protocol: string;
  cipher: string;
  keyExchange: string;
  bits: number;
  serialNumber: string;
  fingerprint: string;
}

interface HeaderCheck {
  header: string;
  label: string;
  present: boolean;
  value: string | null;
  status: "pass" | "fail" | "warn";
  weight: number;
}

interface ScanResult {
  target: string;
  timestamp: string;
  duration: number;
  dns: DnsResult | null;
  ssl: SslResult | null;
  headers: HeaderCheck[] | null;
  score: number;
  grade: string;
  errors: string[];
}

// ── Security: Input validation ───────────────────────────────────────────────

const BLOCKED_PATTERNS = [
  /^localhost$/i,
  /^127\./,
  /^10\./,
  /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
  /^192\.168\./,
  /^0\./,
  /^169\.254\./,
  /^\[?::1\]?$/,
  /^\[?fe80:/i,
  /^\[?fd[0-9a-f]{2}:/i,
];

function isValidDomain(input: string): boolean {
  const cleaned = input.replace(/^https?:\/\//, "").split("/")[0].split(":")[0].trim();
  if (!cleaned || cleaned.length > 253) return false;
  if (BLOCKED_PATTERNS.some((p) => p.test(cleaned))) return false;
  // Must look like a domain (at least one dot, valid chars)
  const domainRegex = /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
  return domainRegex.test(cleaned);
}

function cleanDomain(input: string): string {
  return input.replace(/^https?:\/\//, "").split("/")[0].split(":")[0].trim().toLowerCase();
}

// ── Helpers: Timeout wrapper ─────────────────────────────────────────────────

function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms);
    promise.then(
      (val) => { clearTimeout(timer); resolve(val); },
      (err) => { clearTimeout(timer); reject(err); }
    );
  });
}

// ── Check 1: DNS Resolution ──────────────────────────────────────────────────

async function checkDns(domain: string): Promise<DnsResult> {
  const resolver = new dns.promises.Resolver();
  resolver.setServers(["8.8.8.8", "1.1.1.1"]);

  const [aRecords, mxRecords, nsRecords, txtRecords] = await Promise.allSettled([
    resolver.resolve4(domain),
    resolver.resolveMx(domain),
    resolver.resolveNs(domain),
    resolver.resolveTxt(domain),
  ]);

  return {
    a: aRecords.status === "fulfilled" ? aRecords.value : [],
    mx: mxRecords.status === "fulfilled" ? mxRecords.value : [],
    ns: nsRecords.status === "fulfilled" ? nsRecords.value : [],
    txt: txtRecords.status === "fulfilled" ? txtRecords.value.map((t) => t.join("")) : [],
  };
}

// ── Check 2: SSL/TLS Certificate ─────────────────────────────────────────────

async function checkSsl(domain: string): Promise<SslResult> {
  return new Promise((resolve, reject) => {
    const socket = tls.connect(
      { host: domain, port: 443, servername: domain, rejectUnauthorized: false, timeout: 8000 },
      () => {
        try {
          const cert = socket.getPeerCertificate(true);
          const cipher = socket.getCipher();
          const protocol = socket.getProtocol() || "unknown";

          if (!cert || !cert.valid_to) {
            socket.destroy();
            return reject(new Error("No certificate returned"));
          }

          const validTo = new Date(cert.valid_to);
          const now = new Date();
          const daysUntilExpiry = Math.floor((validTo.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

          const getStr = (val: any): string => (Array.isArray(val) ? val[0] : val) || "";

          const result: SslResult = {
            subject: getStr(cert.subject?.CN) || getStr(cert.subject?.O) || domain,
            issuer: getStr(cert.issuer?.O) || getStr(cert.issuer?.CN) || "Unknown",
            validFrom: cert.valid_from,
            validTo: cert.valid_to,
            daysUntilExpiry,
            protocol,
            cipher: cipher?.name || "unknown",
            keyExchange: cipher?.version || "unknown",
            bits: cert.bits || 0,
            serialNumber: cert.serialNumber || "",
            fingerprint: cert.fingerprint256 || cert.fingerprint || "",
          };


          socket.destroy();
          resolve(result);
        } catch (e) {
          socket.destroy();
          reject(e);
        }
      }
    );

    socket.on("error", (err) => {
      socket.destroy();
      reject(err);
    });

    socket.on("timeout", () => {
      socket.destroy();
      reject(new Error("TLS connection timed out"));
    });
  });
}

// ── Check 3: HTTP Security Headers ──────────────────────────────────────────

async function checkHeaders(domain: string): Promise<HeaderCheck[]> {
  return new Promise((resolve, reject) => {
    const req = https.get(
      `https://${domain}`,
      { timeout: 8000, headers: { "User-Agent": "AdemzwebSecurityScanner/1.0" } },
      (res) => {
        // Follow one redirect if needed
        if (res.statusCode && [301, 302, 307, 308].includes(res.statusCode) && res.headers.location) {
          const loc = res.headers.location;
          const locationStr = Array.isArray(loc) ? loc[0] : loc;
          const redirectUrl = locationStr.startsWith("http") ? locationStr : `https://${domain}${locationStr}`;
          
          https.get(
            redirectUrl,
            { timeout: 8000, headers: { "User-Agent": "AdemzwebSecurityScanner/1.0" } },
            (redirectRes) => {
              res.destroy();
              resolve(analyzeHeaders(redirectRes.headers));
              redirectRes.destroy();
            }
          ).on("error", (err) => reject(err));
          return;
        }

        resolve(analyzeHeaders(res.headers));
        res.destroy();
      }
    );

    req.on("error", (err) => reject(err));
    req.on("timeout", () => { req.destroy(); reject(new Error("HTTP request timed out")); });
  });
}

function analyzeHeaders(headers: Record<string, string | string[] | undefined>): HeaderCheck[] {
  const get = (name: string): string | null => {
    const val = headers[name.toLowerCase()];
    if (Array.isArray(val)) return val[0] || null;
    return val || null;
  };

  return [
    {
      header: "strict-transport-security",
      label: "HSTS (Strict-Transport-Security)",
      present: !!get("strict-transport-security"),
      value: get("strict-transport-security"),
      status: get("strict-transport-security") ? "pass" : "fail",
      weight: 20,
    },
    {
      header: "content-security-policy",
      label: "Content-Security-Policy",
      present: !!get("content-security-policy"),
      value: get("content-security-policy"),
      status: get("content-security-policy") ? "pass" : "warn",
      weight: 15,
    },
    {
      header: "x-content-type-options",
      label: "X-Content-Type-Options",
      present: !!get("x-content-type-options"),
      value: get("x-content-type-options"),
      status: get("x-content-type-options")?.toLowerCase() === "nosniff" ? "pass" : "fail",
      weight: 10,
    },
    {
      header: "x-frame-options",
      label: "X-Frame-Options",
      present: !!get("x-frame-options"),
      value: get("x-frame-options"),
      status: get("x-frame-options") ? "pass" : "warn",
      weight: 10,
    },
    {
      header: "referrer-policy",
      label: "Referrer-Policy",
      present: !!get("referrer-policy"),
      value: get("referrer-policy"),
      status: get("referrer-policy") ? "pass" : "warn",
      weight: 10,
    },
    {
      header: "permissions-policy",
      label: "Permissions-Policy",
      present: !!get("permissions-policy"),
      value: get("permissions-policy"),
      status: get("permissions-policy") ? "pass" : "warn",
      weight: 10,
    },
    {
      header: "x-xss-protection",
      label: "X-XSS-Protection",
      present: !!get("x-xss-protection"),
      value: get("x-xss-protection"),
      status: get("x-xss-protection") ? "pass" : "warn",
      weight: 5,
    },
    {
      header: "x-dns-prefetch-control",
      label: "X-DNS-Prefetch-Control",
      present: !!get("x-dns-prefetch-control"),
      value: get("x-dns-prefetch-control"),
      status: get("x-dns-prefetch-control") ? "pass" : "warn",
      weight: 5,
    },
  ];
}

// ── Score Calculation ─────────────────────────────────────────────────────────

function calculateScore(
  dnsResult: DnsResult | null,
  sslResult: SslResult | null,
  headersResult: HeaderCheck[] | null
): { score: number; grade: string } {
  let score = 0;
  let maxScore = 0;

  // DNS: 15 points for having A records
  maxScore += 15;
  if (dnsResult && dnsResult.a.length > 0) score += 15;

  // SSL: 25 points
  maxScore += 25;
  if (sslResult) {
    score += 10; // SSL exists
    if (sslResult.daysUntilExpiry > 30) score += 5;
    else if (sslResult.daysUntilExpiry > 0) score += 2;
    if (sslResult.protocol === "TLSv1.3") score += 5;
    else if (sslResult.protocol === "TLSv1.2") score += 3;
    if (sslResult.bits >= 256) score += 5;
    else if (sslResult.bits >= 128) score += 3;
  }

  // Headers: 60 points (sum of weights from header checks)
  if (headersResult) {
    headersResult.forEach((h) => {
      maxScore += h.weight;
      if (h.status === "pass") score += h.weight;
      else if (h.status === "warn" && h.present) score += Math.floor(h.weight * 0.5);
    });
  } else {
    maxScore += 85; // total header weights
  }

  const normalizedScore = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;

  let grade: string;
  if (normalizedScore >= 90) grade = "A+";
  else if (normalizedScore >= 80) grade = "A";
  else if (normalizedScore >= 70) grade = "B+";
  else if (normalizedScore >= 60) grade = "B";
  else if (normalizedScore >= 50) grade = "C";
  else if (normalizedScore >= 35) grade = "D";
  else grade = "F";

  return { score: normalizedScore, grade };
}

// ── API Handler ──────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    const body = await request.json();
    const rawTarget = body.target;

    if (!rawTarget || typeof rawTarget !== "string") {
      return NextResponse.json(
        { error: "Missing 'target' field. Provide a domain name." },
        { status: 400 }
      );
    }

    const domain = cleanDomain(rawTarget);

    if (!isValidDomain(domain)) {
      return NextResponse.json(
        { error: `Invalid domain: "${domain}". Enter a valid public domain (e.g. google.com).` },
        { status: 400 }
      );
    }

    const errors: string[] = [];

    // Run all 3 checks in parallel with timeouts
    const [dnsSettled, sslSettled, headersSettled] = await Promise.allSettled([
      withTimeout(checkDns(domain), 10000, "DNS"),
      withTimeout(checkSsl(domain), 10000, "SSL"),
      withTimeout(checkHeaders(domain), 10000, "Headers"),
    ]);

    const dnsResult = dnsSettled.status === "fulfilled" ? dnsSettled.value : null;
    if (dnsSettled.status === "rejected") errors.push(`DNS: ${dnsSettled.reason?.message || "Failed"}`);

    const sslResult = sslSettled.status === "fulfilled" ? sslSettled.value : null;
    if (sslSettled.status === "rejected") errors.push(`SSL: ${sslSettled.reason?.message || "Failed"}`);

    const headersResult = headersSettled.status === "fulfilled" ? headersSettled.value : null;
    if (headersSettled.status === "rejected") errors.push(`Headers: ${headersSettled.reason?.message || "Failed"}`);

    const { score, grade } = calculateScore(dnsResult, sslResult, headersResult);

    const result: ScanResult = {
      target: domain,
      timestamp: new Date().toISOString(),
      duration: Date.now() - startTime,
      dns: dnsResult,
      ssl: sslResult,
      headers: headersResult,
      score,
      grade,
      errors,
    };

    return NextResponse.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
