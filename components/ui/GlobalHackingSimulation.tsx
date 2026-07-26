"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Node {
  x: number;
  y: number;
  label: string;
  ip: string;
  isTarget?: boolean;
}

interface AttackArc {
  from: Node;
  to: Node;
  progress: number;
  speed: number;
  type: string;
  color: string;
}

interface MatrixDrop {
  x: number;
  y: number;
  speed: number;
  text: string;
}

export function GlobalHackingSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });
  const [stats, setStats] = useState({
    activeAttacks: 142,
    packetsPerSec: "8.4 GB/s",
    lastTarget: "US-EAST-DATACENTER [192.168.4.102]",
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    resize();

    // Create World Data Nodes
    const createNodes = (): Node[] => {
      const w = canvas.width;
      const h = canvas.height;
      return [
        { x: w * 0.18, y: h * 0.28, label: "NYC-DC1", ip: "104.22.11.45" },
        { x: w * 0.12, y: h * 0.52, label: "LAX-GW", ip: "64.233.160.1" },
        { x: w * 0.22, y: h * 0.75, label: "SAO-PAULO", ip: "177.12.89.4" },
        { x: w * 0.32, y: h * 0.18, label: "LON-CORE", ip: "185.199.108.153" },
        { x: w * 0.68, y: h * 0.18, label: "FRA-HQ", ip: "194.12.22.8" },
        { x: w * 0.76, y: h * 0.55, label: "SGP-HUB", ip: "128.199.200.1" },
        { x: w * 0.84, y: h * 0.32, label: "TYO-EDGE", ip: "133.242.18.90" },
        { x: w * 0.88, y: h * 0.72, label: "SYD-NODE", ip: "139.130.4.5" },
      ];
    };

    let nodes = createNodes();

    // Attack types with color variations matching theme #b94a4a
    const attackTypes = [
      { name: "ZERO-DAY EXPLOIT", color: "#b94a4a" },
      { name: "DDOS FLOOD", color: "#e65c5c" },
      { name: "SQL INJECTION", color: "#ff4d4d" },
      { name: "RANSOMWARE PAYLOAD", color: "#993333" },
      { name: "BRUTEFORCE SSH", color: "#ff6666" },
    ];

    let arcs: AttackArc[] = [];
    const spawnArc = () => {
      if (nodes.length < 2) return;
      const fromIdx = Math.floor(Math.random() * nodes.length);
      let toIdx = Math.floor(Math.random() * nodes.length);
      while (toIdx === fromIdx) {
        toIdx = Math.floor(Math.random() * nodes.length);
      }
      const typeObj = attackTypes[Math.floor(Math.random() * attackTypes.length)];
      arcs.push({
        from: nodes[fromIdx],
        to: nodes[toIdx],
        progress: 0,
        speed: 0.008 + Math.random() * 0.012,
        type: typeObj.name,
        color: typeObj.color,
      });
    };

    // Matrix digital rain columns
    const charSet = "010101010101ABCDEFGHJKLMNPQRSTUVWXYZ#$@%&*";
    const matrixDrops: MatrixDrop[] = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speed: 1 + Math.random() * 2.5,
      text: charSet[Math.floor(Math.random() * charSet.length)],
    }));

    // Interval to trigger attack telemetry UI updates
    const telemetryInterval = setInterval(() => {
      const randomNode = nodes[Math.floor(Math.random() * nodes.length)];
      setStats({
        activeAttacks: Math.floor(120 + Math.random() * 80),
        packetsPerSec: `${(5 + Math.random() * 7).toFixed(1)} GB/s`,
        lastTarget: `${randomNode.label} [${randomNode.ip}]`,
      });
    }, 2500);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Render Frame
    let frame = 0;
    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Grid pattern in theme red tint
      ctx.strokeStyle = "rgba(185, 74, 74, 0.04)";
      ctx.lineWidth = 1;
      const gridSize = 50;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // 2. Matrix Digital Rain
      ctx.font = "11px monospace";
      matrixDrops.forEach((drop) => {
        drop.y += drop.speed;
        if (drop.y > canvas.height) {
          drop.y = -20;
          drop.x = Math.random() * canvas.width;
        }
        if (Math.random() < 0.05) {
          drop.text = charSet[Math.floor(Math.random() * charSet.length)];
        }
        ctx.fillStyle = "rgba(185, 74, 74, 0.25)";
        ctx.fillText(drop.text, drop.x, drop.y);
      });

      // Spawn arcs randomly
      if (frame % 25 === 0 && arcs.length < 18) {
        spawnArc();
      }

      // 3. Draw Attack Arcs & Flying Packets
      arcs.forEach((arc, idx) => {
        arc.progress += arc.speed;

        const { from, to, progress, color } = arc;
        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Control point for curved bezier arc
        const midX = (from.x + to.x) / 2;
        const midY = (from.y + to.y) / 2 - Math.min(120, dist * 0.3);

        // Arc line
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.quadraticCurveTo(midX, midY, to.x, to.y);
        ctx.strokeStyle = "rgba(185, 74, 74, 0.15)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Flying packet particle along bezier curve
        const t = Math.min(1, progress);
        const px = (1 - t) * (1 - t) * from.x + 2 * (1 - t) * t * midX + t * t * to.x;
        const py = (1 - t) * (1 - t) * from.y + 2 * (1 - t) * t * midY + t * t * to.y;

        // Packet Head Glow
        const grad = ctx.createRadialGradient(px, py, 0, px, py, 12);
        grad.addColorStop(0, color);
        grad.addColorStop(0.5, "rgba(185, 74, 74, 0.5)");
        grad.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.arc(px, py, 12, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();

        // Impact shockwave at target when complete
        if (progress >= 1) {
          ctx.beginPath();
          ctx.arc(to.x, to.y, 25, 0, Math.PI * 2);
          ctx.strokeStyle = color;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      });

      // Remove completed arcs
      arcs = arcs.filter((a) => a.progress < 1.05);

      // 4. Draw World Nodes
      nodes.forEach((node) => {
        // Mouse hover interaction
        const mdx = mouseRef.current.x - node.x;
        const mdy = mouseRef.current.y - node.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        const isHovered = mDist < 60;

        // Pulsing outer node ring
        const pulse = Math.sin(frame * 0.05 + node.x) * 4 + 8;
        ctx.beginPath();
        ctx.arc(node.x, node.y, pulse + (isHovered ? 6 : 0), 0, Math.PI * 2);
        ctx.strokeStyle = isHovered ? "#ff6666" : "rgba(185, 74, 74, 0.4)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Node center dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = isHovered ? "#ffffff" : "#b94a4a";
        ctx.fill();

        // Node label and IP
        ctx.fillStyle = isHovered ? "#ffffff" : "rgba(255, 255, 255, 0.6)";
        ctx.font = "10px monospace";
        ctx.fillText(node.label, node.x + 12, node.y - 4);

        ctx.fillStyle = "rgba(185, 74, 74, 0.8)";
        ctx.font = "9px monospace";
        ctx.fillText(node.ip, node.x + 12, node.y + 8);
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      resize();
      nodes = createNodes();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      clearInterval(telemetryInterval);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Background Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-auto" />

      {/* Cyber overlay elements */}
      <div className="cyber-grid absolute inset-0 opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-radial from-accent/10 via-transparent to-background pointer-events-none" />

      {/* Live Global Attack Telemetry Overlay Badge */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute top-24 left-4 md:left-8 z-20 pointer-events-auto hidden sm:block"
      >
        <div className="glass-card tech-corners rounded-lg p-3 text-xs font-mono max-w-xs border-accent/30 shadow-lg">
          <div className="flex items-center justify-between gap-3 border-b border-border pb-1.5 mb-2">
            <span className="flex items-center gap-2 text-accent font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              GLOBAL THREAT TELEMETRY
            </span>
            <span className="text-[10px] text-text-muted">LIVE SIM</span>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-text-muted">ACTIVE VECTORS:</span>
              <span className="text-accent font-bold">{stats.activeAttacks}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">BANDWIDTH:</span>
              <span className="text-text font-medium">{stats.packetsPerSec}</span>
            </div>
            <div className="flex justify-between truncate pt-1 border-t border-border/50 text-[10px]">
              <span className="text-text-muted">TARGET:</span>
              <span className="text-accent-glow font-mono truncate">{stats.lastTarget}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Fade out gradient at bottom of hero */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </div>
  );
}
