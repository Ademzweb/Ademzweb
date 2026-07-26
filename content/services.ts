/**
 * SERVICES SECTION CONTENT
 * Extended with technical deep-dive specifications for interactive modals.
 */

export interface ServiceDetail {
  id: string;
  icon: string;
  title: string;
  description: string;
  tagline: string;
  sla: string;
  attackVectors: string[];
  features: string[];
  frameworks: string[];
  deliverables: string[];
}

export const servicesContent = {
  sectionLabel: "Our Services",
  title: "Comprehensive Security Solutions",
  description:
    "Click on any service card below to open the technical inspector, examine attack vectors covered, review SLAs, and request tailored audit specs.",

  services: [
    {
      id: "vulnerability-assessment",
      icon: "Search",
      title: "Vulnerability Assessment",
      description:
        "Systematic identification and prioritization of security weaknesses across your infrastructure, applications, and networks.",
      tagline: "Automated & expert-driven continuous weakness discovery",
      sla: "24-Hour Express Initial Scan",
      attackVectors: [
        "Unpatched CVE Exploits",
        "Misconfigured Services",
        "Outdated Server Software",
        "Exposed Management Interfaces",
      ],
      features: [
        "Continuous automated vulnerability scanning across 10,000+ asset IPs",
        "CVSS v3.1 severity scoring & business impact context",
        "Zero-noise false positive filtering by human red team lead",
        "Actionable remediation tickets integrated with Jira / GitHub",
      ],
      frameworks: ["NIST 800-53", "CIS Benchmarks", "OWASP ASVS"],
      deliverables: ["CVSS Executive Summary", "Remediation Playbook", "Re-test Verification Report"],
    },
    {
      id: "penetration-testing",
      icon: "Target",
      title: "Penetration Testing",
      description:
        "Simulated real-world attacks to uncover exploitable vulnerabilities before malicious actors can leverage them.",
      tagline: "Manual adversary simulation by Offensive Security certified experts",
      sla: "5 to 10 Business Days",
      attackVectors: [
        "Privilege Escalation",
        "Lateral Movement",
        "Zero-Day Exploit Chaining",
        "Authentication Bypasses",
      ],
      features: [
        "Black-box, Gray-box, and White-box offensive testing methodologies",
        "Real-world exploit payload delivery safely targeted in sandbox",
        "Active directory & domain takeover scenario testing",
        "1-on-1 walkthrough video session with senior pentester",
      ],
      frameworks: ["PTES", "OWASP Top 10", "OSSTMM"],
      deliverables: ["Full Exploit Chain Documentation", "Executive Board Deck", "Proof-of-Concept Scripts"],
    },
    {
      id: "web-app-security",
      icon: "Globe",
      title: "Web Application Security",
      description:
        "In-depth testing of web applications for OWASP Top 10 vulnerabilities, logic flaws, and authentication bypasses.",
      tagline: "End-to-end full-stack web application hardening",
      sla: "3 to 7 Business Days",
      attackVectors: [
        "SQL Injection & NoSQLi",
        "Cross-Site Scripting (XSS)",
        "SSRF & Remote Code Execution",
        "Broken Business Logic",
      ],
      features: [
        "Manual inspection of stateful user workflows and token handling",
        "CSRF, OAuth 2.0, JWT, and SAML single sign-on vulnerability audits",
        "Client-side DOM manipulation & WebSocket payload inspection",
        "Detailed code-level fix recommendations for Next.js, React, Node, Python, Java",
      ],
      frameworks: ["OWASP Top 10 2021", "WSTG v4.2", "CWE Top 25"],
      deliverables: ["Vulnerability Matrix", "Remediation Patch Code Snippets", "Executive Certificate"],
    },
    {
      id: "api-security",
      icon: "Code",
      title: "API Security Testing",
      description:
        "Comprehensive API security assessments covering authentication, authorization, rate limiting, and data exposure risks.",
      tagline: "REST, GraphQL, gRPC & Microservices Security Hardening",
      sla: "3 to 5 Business Days",
      attackVectors: [
        "BOLA / IDOR Exploits",
        "Mass Assignment Flaws",
        "API Rate Limit Bypasses",
        "GraphQL Depth Abuse",
      ],
      features: [
        "Automated OpenAPI / Swagger schema fuzzing and anomaly injection",
        "Broken Object Level Authorization (BOLA) deep context testing",
        "JWT signature manipulation & secret key brute-force audit",
        "Rate-limiting, throttling, and DDoS resilience verification",
      ],
      frameworks: ["OWASP API Security Top 10", "OpenAPI Specification 3.1"],
      deliverables: ["Postman Test Collection", "API Schema Patch Guidelines", "Security Scorecard"],
    },
    {
      id: "network-security",
      icon: "Network",
      title: "Network Security",
      description:
        "Evaluation of network architecture, firewall configurations, segmentation, and intrusion detection capabilities.",
      tagline: "Zero-Trust network architecture & perimeter defense audit",
      sla: "5 to 10 Business Days",
      attackVectors: [
        "Rogue Access Points",
        "Man-in-the-Middle (MitM)",
        "VLAN Hopping",
        "Firewall Rule Leakage",
      ],
      features: [
        "Internal & External network perimeter security architecture review",
        "Next-Gen Firewall (NGFW) & WAF rule efficiency analysis",
        "VPN, IPsec, and Zero Trust Network Access (ZTNA) protocol audit",
        "Network segmentation & micro-segmentation validation",
      ],
      frameworks: ["Zero Trust Architecture (NIST SP 800-207)", "CIS Controls v8"],
      deliverables: ["Network Topology Map", "Rule Gap Analysis", "Hardening Blueprint"],
    },
    {
      id: "cloud-security",
      icon: "Cloud",
      title: "Cloud Security",
      description:
        "Security assessments for AWS, Azure, and GCP environments including IAM, storage, and configuration reviews.",
      tagline: "Multi-Cloud infrastructure & IAM entitlement control",
      sla: "4 to 7 Business Days",
      attackVectors: [
        "S3 Bucket Leaks",
        "IAM Over-Privileging",
        "Container Breakouts",
        "Kubernetes API Exposures",
      ],
      features: [
        "Automated CSPM policy evaluation for AWS, Azure, and Google Cloud",
        "IAM Least-Privilege entitlement audit & privilege escalation mapping",
        "Kubernetes & Docker container image security scanning",
        "Infrastructure as Code (Terraform, CloudFormation) security review",
      ],
      frameworks: ["CIS Amazon Web Services Foundations", "CIS Kubernetes Benchmark"],
      deliverables: ["Cloud Security Posture Report", "Terraform Fix Scripts", "IAM Risk Matrix"],
    },
    {
      id: "security-audits",
      icon: "ClipboardCheck",
      title: "Security Audits",
      description:
        "Independent audits of your security policies, controls, and procedures against industry standards and best practices.",
      tagline: "Rigorous independent governance & technical control review",
      sla: "7 to 14 Business Days",
      attackVectors: [
        "Governance Gaps",
        "Third-Party Vendor Leaks",
        "Insider Risk Deficits",
        "Policy Drift",
      ],
      features: [
        "End-to-end audit of technical controls, policies, and employee compliance",
        "Third-party vendor risk assessment & supply chain security check",
        "Disaster Recovery (DR) & Business Continuity (BCP) drill testing",
        "Gap analysis against leading international cybersecurity standards",
      ],
      frameworks: ["ISO/IEC 27001:2022", "SOC 2 Trust Services Criteria"],
      deliverables: ["Audit Findings Registry", "Gap Analysis Roadmap", "Board Attestation Letter"],
    },
    {
      id: "compliance",
      icon: "ShieldCheck",
      title: "Compliance Consulting",
      description:
        "Guidance and implementation support for SOC 2, ISO 27001, HIPAA, PCI-DSS, and GDPR compliance requirements.",
      tagline: "Accelerated audit readiness for global regulatory frameworks",
      sla: "Ongoing / Turnkey Ready",
      attackVectors: [
        "Audit Non-Compliance",
        "Regulatory Fines",
        "Data Privacy Violations",
        "Unencrypted PII",
      ],
      features: [
        "Turnkey policy drafting & control implementation roadmap",
        "Evidence collection automation with Vanta, Drata, or custom scripts",
        "Mock auditor interviews & evidence review sessions",
        "Continuous compliance monitoring & alert dashboard setup",
      ],
      frameworks: ["SOC 2 Type II", "ISO 27001", "HIPAA Security Rule", "PCI-DSS v4.0", "GDPR"],
      deliverables: ["Compliance Readiness Scorecard", "Custom Policy Manuals", "Auditor-Ready Evidence Vault"],
    },
    {
      id: "incident-response",
      icon: "Siren",
      title: "Incident Response",
      description:
        "Rapid 24/7 incident response services to contain breaches, preserve evidence, and restore normal operations.",
      tagline: "Immediate breach containment & digital forensics investigations",
      sla: "15-Minute SLA (Emergency Retainer)",
      attackVectors: [
        "Ransomware Encryption",
        "Business Email Compromise",
        "Data Exfiltration",
        "Active APT Infiltration",
      ],
      features: [
        "24/7/365 Emergency Response hotline & rapid containment team",
        "Digital Forensics & Incident Response (DFIR) deep memory/disk analysis",
        "Malware reverse engineering & command-and-control server neutralization",
        "Crisis communications & regulatory notification assistance",
      ],
      frameworks: ["NIST SP 800-61 Rev. 2", "ISO/IEC 27035"],
      deliverables: ["Root Cause Analysis Report", "Forensic Artifact Timeline", "Threat Containment Attestation"],
    },
    {
      id: "security-training",
      icon: "GraduationCap",
      title: "Security Awareness Training",
      description:
        "Interactive training programs to educate employees on phishing, social engineering, and security best practices.",
      tagline: "Human-firewall fortification & phishing simulation programs",
      sla: "Custom Campaign Schedules",
      attackVectors: [
        "Spear Phishing",
        "Executive Impersonation",
        "SMS Phishing (Smishing)",
        "Credential Harvest Pages",
      ],
      features: [
        "Customized phishing campaign simulations tailored to your industry",
        "Micro-learning modules (3-5 min) covering top security threats",
        "Real-time phish-reporting browser extension for employees",
        "Employee risk score tracking & departmental benchmark analytics",
      ],
      frameworks: ["NIST Phishing Guidance", "CISA Security Awareness Standards"],
      deliverables: ["Phishing Resilience Dashboard", "Training Completion Certificates", "Quarterly Risk Trends"],
    },
  ],
};
