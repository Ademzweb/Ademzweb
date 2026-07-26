"use client";

import { useEffect, useRef } from "react";

/**
 * Subtle matrix-style falling characters — red/white on dark.
 * Low opacity so it stays enterprise-grade, not distracting.
 */
export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const chars = "01</>{}[]#SECURE_ADEMZWEB".split("");
    let columns: number[] = [];
    let animationId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const fontSize = 14;
      columns = Array(Math.floor(canvas.width / fontSize)).fill(0);
    };

    const draw = () => {
      ctx.fillStyle = "rgba(10, 12, 16, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const fontSize = 14;
      ctx.font = `${fontSize}px monospace`;

      columns.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const isRed = Math.random() > 0.85;
        ctx.fillStyle = isRed
          ? "rgba(185, 74, 74, 0.25)"
          : "rgba(255, 255, 255, 0.08)";
        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          columns[i] = 0;
        }
        columns[i] = y + fontSize;
      });

      animationId = requestAnimationFrame(draw);
    };

    resize();
    draw();

    const observer = new ResizeObserver(resize);
    observer.observe(canvas.parentElement ?? canvas);

    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full opacity-40"
    />
  );
}
