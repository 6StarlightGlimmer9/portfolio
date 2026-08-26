"use client";

import { useEffect, useRef } from "react";

/**
 * 鼠标粒子特效 + 自定义光标
 * - 中心小圆点（即时跟随）
 * - 外圈环（lerp 延迟跟随，hover 可交互元素时放大变红）
 * - 移动时生成扩散粒子（红色系，渐隐）
 * - 全局 cursor: none 已在 globals.css 设置
 */
export default function CursorParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const dot = dotRef.current!;
    const ring = ringRef.current!;

    let dpr = window.devicePixelRatio || 1;
    let w = window.innerWidth;
    let h = window.innerHeight;

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // 鼠标状态
    let mx = w / 2;
    let my = h / 2;
    // 圆环位置（lerp 跟随）
    let rx = mx;
    let ry = my;

    interface P {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      max: number;
      size: number;
      hue: number;
    }
    const particles: P[] = [];
    const MAX_PARTICLES = 180;

    let isOverInteractive = false;
    let isDown = false;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      // 生成粒子（移动越快生成越多，限制上限）
      const dx = mx - lastMx;
      const dy = my - lastMy;
      const speed = Math.min(Math.hypot(dx, dy), 40);
      const count = Math.min(3, 1 + Math.floor(speed / 8));
      for (let i = 0; i < count; i++) {
        if (particles.length >= MAX_PARTICLES) particles.shift();
        const ang = Math.random() * Math.PI * 2;
        const sp = Math.random() * 1.6 + 0.3;
        particles.push({
          x: mx,
          y: my,
          vx: Math.cos(ang) * sp + dx * 0.04,
          vy: Math.sin(ang) * sp + dy * 0.04,
          life: 0,
          max: 40 + Math.random() * 30,
          size: Math.random() * 2.5 + 1,
          hue: 348 + (Math.random() * 20 - 10), // 红色系
        });
      }
      lastMx = mx;
      lastMy = my;

      // 检测是否 hover 可交互元素
      const el = e.target as HTMLElement;
      const interactive = el.closest(
        'a, button, [role="button"], input, textarea, [data-cursor="pointer"]',
      );
      isOverInteractive = !!interactive;
    };
    let lastMx = mx;
    let lastMy = my;

    const onDown = () => (isDown = true);
    const onUp = () => (isDown = false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    let raf = 0;
    const loop = () => {
      // 圆环 lerp 跟随
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      const ringSize = isOverInteractive ? 44 : isDown ? 24 : 30;
      ring.style.transform = `translate3d(${rx - ringSize / 2}px, ${
        ry - ringSize / 2
      }px, 0)`;
      ring.style.width = ringSize + "px";
      ring.style.height = ringSize + "px";
      ring.style.borderColor = isOverInteractive
        ? "rgba(255,77,109,0.9)"
        : "rgba(255,0,60,0.6)";
      ring.style.boxShadow = isOverInteractive
        ? "0 0 16px rgba(255,0,60,0.6)"
        : "0 0 8px rgba(255,0,60,0.3)";
      dot.style.transform = `translate3d(${mx - 3}px, ${my - 3}px, 0)`;

      // 粒子渲染
      ctx.clearRect(0, 0, w, h);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.vy += 0.02; // 轻微下落
        if (p.life >= p.max) {
          particles.splice(i, 1);
          continue;
        }
        const t = 1 - p.life / p.max;
        const alpha = t * 0.9;
        const size = p.size * (0.4 + t * 0.6);
        ctx.beginPath();
        ctx.fillStyle = `hsla(${p.hue}, 100%, 60%, ${alpha})`;
        ctx.shadowColor = `hsla(${p.hue}, 100%, 55%, ${alpha})`;
        ctx.shadowBlur = 8;
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[9999]"
        aria-hidden
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-1.5 w-1.5 rounded-full bg-accent-soft"
        style={{ boxShadow: "0 0 6px rgba(255,0,60,0.9)" }}
        aria-hidden
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full border transition-[width,height,border-color,box-shadow] duration-150"
        aria-hidden
      />
    </>
  );
}
