"use client";

import { useEffect, useRef, useState } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  pulse: number;
}

/**
 * Interactive network node graph — nodes drift and connect.
 * Pulses brighter on mouse proximity.
 */
export function NetworkGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let nodes: Node[] = [];
    let animationId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const count = Math.min(30, Math.floor(canvas.width / 40));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        pulse: Math.random() * Math.PI * 2,
      }));
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += 0.02;

        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;

        const distMouse = Math.hypot(n.x - mx, n.y - my);
        const nearMouse = distMouse < 120;
        const glow = nearMouse ? 0.8 : 0.3 + Math.sin(n.pulse) * 0.15;

        // Connections
        nodes.forEach((other) => {
          const dist = Math.hypot(n.x - other.x, n.y - other.y);
          if (dist < 140 && dist > 0) {
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(other.x, other.y);
            const alpha = (1 - dist / 140) * (nearMouse ? 0.15 : 0.06);
            ctx.strokeStyle = `rgba(185, 74, 74, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });

        // Node dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, nearMouse ? 3 : 2, 0, Math.PI * 2);
        ctx.fillStyle = nearMouse
          ? `rgba(197, 48, 48, ${glow})`
          : `rgba(255, 255, 255, ${glow * 0.4})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    };

    resize();
    draw();

    canvas.addEventListener("mousemove", onMove);
    const observer = new ResizeObserver(resize);
    observer.observe(canvas.parentElement ?? canvas);

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener("mousemove", onMove);
      observer.disconnect();
    };
  }, [mounted]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full opacity-70"
    />
  );
}
