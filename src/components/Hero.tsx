"use client";

import { motion } from "framer-motion";
import { heroVideo, profile } from "@/data/portfolio";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex h-screen min-h-[640px] w-full items-center justify-center overflow-hidden"
    >
      {/* 背景视频 */}
      <video
        src={heroVideo}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />

      {/* 蒙版 - 参考图二风格，保留更多画面 */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(7,7,11,0.55) 0%, rgba(7,7,11,0.3) 30%, rgba(7,7,11,0.5) 70%, rgba(7,7,11,0.85) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 30%, rgba(7,7,11,0.85) 100%)",
        }}
      />
      <div className="grid-bg absolute inset-0 opacity-20" />

      {/* 内容 */}
      <div className="relative z-10 mx-auto w-full max-w-[1700px] px-6 sm:px-10">
        {/* 左上角导航标记 */}
        <div className="absolute left-6 top-6 hidden font-mono text-[10px] uppercase tracking-[0.3em] text-accent-soft md:block">
          <span className="text-accent">//</span> {profile.status}
        </div>
        <div className="absolute right-6 top-6 hidden font-mono text-[10px] uppercase tracking-[0.3em] text-muted md:block">
          <span className="text-accent">●</span> 2026 <span className="text-accent">●</span> PORTFOLIO
        </div>

        {/* 中央大标题 */}
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-6 font-mono text-sm tracking-[0.3em] text-accent-soft sm:text-base"
            style={{ textShadow: "0 0 12px rgba(255,0,60,0.7)" }}
          >
            HAN SHIFENG
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            className="font-display text-[4.5rem] font-black leading-none tracking-tight text-white sm:text-[7rem] lg:text-[10rem]"
            style={{
              textShadow:
                "0 0 20px rgba(255,0,60,0.6), 0 4px 30px rgba(255,0,60,0.4), 0 0 60px rgba(255,0,60,0.25)",
            }}
          >
            {profile.name}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mx-auto mt-6 font-mono text-xs tracking-[0.35em] text-muted-foreground sm:text-sm"
            style={{ textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}
          >
            SOFTWARE ENGINEER · FULL-STACK DEVELOPER · CONTENT CREATOR
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mx-auto mt-8 max-w-3xl font-sans text-base leading-relaxed text-foreground/90 sm:text-lg"
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}
          >
            软件工程 · 社媒运营 · 游戏 Mod 开发
            <br />
            27 届应届生 · 立即到岗
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-10 flex items-center justify-center gap-5 font-mono text-sm tracking-wider"
          >
            <a
              href="#portfolio"
              className="corner-cut bg-accent px-7 py-3.5 font-semibold text-bg transition-all hover:bg-accent-soft hover:shadow-[0_0_25px_rgba(255,0,60,0.6)]"
              data-cursor="pointer"
              style={{ boxShadow: "0 0 20px rgba(255,0,60,0.35)" }}
            >
              查看作品 <span className="blink ml-1">_</span>
            </a>
            <a
              href="#contact"
              className="corner-cut border-2 border-accent bg-transparent px-7 py-3.5 font-semibold text-foreground transition-all hover:border-accent-soft hover:bg-accent/10 hover:text-accent-soft"
              data-cursor="pointer"
            >
              联系我
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.3em] text-muted"
      >
        <div className="flex flex-col items-center gap-2">
          <span>SCROLL</span>
          <span className="h-10 w-px animate-pulse bg-gradient-to-b from-accent to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}