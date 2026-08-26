"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { internshipImages, internship } from "@/data/portfolio";
import { SectionTitle } from "./About";

export default function Internship() {
  const [active, setActive] = useState(0);

  const prev = () =>
    setActive((i) => (i - 1 + internshipImages.length) % internshipImages.length);
  const next = () => setActive((i) => (i + 1) % internshipImages.length);

  return (
    <section id="internship" className="relative w-full py-24 lg:py-32">
      <div className="relative mx-auto max-w-[1700px] px-6 lg:px-10">
        <SectionTitle index="03" title="实习经历" en="EXPERIENCE" />

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {/* 左：图片切换 16:9 */}
          <div className="panel corner-cut cell-16-9 relative overflow-hidden">
            <AnimatePresence mode="wait">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <motion.img
                key={active}
                src={internshipImages[active]}
                alt={`实习 ${active + 1}`}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute inset-0 h-full w-full object-contain"
              />
            </AnimatePresence>

            {/* 渐变遮罩 */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/90 via-transparent to-transparent" />

            {/* 左按钮 */}
            <button
              data-cursor="pointer"
              onClick={prev}
              className="group absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-bg/30 backdrop-blur-sm transition-all hover:bg-accent/60 hover:shadow-[0_0_15px_rgba(255,0,60,0.5)]"
              aria-label="上一张"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                className="text-foreground/70 transition-colors group-hover:text-white"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* 右按钮 */}
            <button
              data-cursor="pointer"
              onClick={next}
              className="group absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-bg/30 backdrop-blur-sm transition-all hover:bg-accent/60 hover:shadow-[0_0_15px_rgba(255,0,60,0.5)]"
              aria-label="下一张"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                className="text-foreground/70 transition-colors group-hover:text-white"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            {/* 底部指示器 */}
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
              {internshipImages.map((_, i) => (
                <button
                  key={i}
                  data-cursor="pointer"
                  onClick={() => setActive(i)}
                  className={`h-2 transition-all ${
                    i === active
                      ? "w-8 bg-accent"
                      : "w-2 bg-muted/40 hover:bg-accent-soft"
                  }`}
                  aria-label={`第 ${i + 1} 张`}
                />
              ))}
            </div>

            {/* 计数 */}
            <span
              className="absolute left-3 top-3 font-mono text-xs text-accent"
              style={{ textShadow: "0 0 8px rgba(255,0,60,0.6)" }}
            >
              {String(active + 1).padStart(2, "0")} / {String(internshipImages.length).padStart(2, "0")}
            </span>
          </div>

          {/* 右：介绍 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="panel corner-cut flex flex-col p-8"
          >
            <div className="flex items-center gap-3 font-mono text-sm text-accent-soft">
              <span>{internship.period}</span>
              <span className="h-px flex-1 bg-line-soft" />
              <span className="text-muted">INTERN</span>
            </div>
            <h3
              className="mt-3 font-display text-2xl font-bold text-foreground sm:text-3xl"
              style={{ textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}
            >
              {internship.role}
            </h3>
            <p className="mt-1 font-sans text-base text-muted-foreground">
              @ {internship.company}
            </p>

            <div className="mt-5 space-y-4">
              {internship.descParagraphs.map((p, i) => (
                <p key={i}
                  className="flex items-start gap-3 font-sans text-base leading-relaxed text-foreground/90"
                  style={{ textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}
                >
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent"
                    style={{ boxShadow: "0 0 6px rgba(255,0,60,0.8), 0 0 12px rgba(255,0,60,0.3)" }}
                  />
                  <span>{p}</span>
                </p>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {internship.tags.map((t) => (
                <span
                  key={t}
                  className="border border-line-soft bg-bg-soft px-3 py-1.5 font-mono text-xs text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}