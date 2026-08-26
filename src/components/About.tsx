"use client";

import { motion } from "framer-motion";
import { profile, bioParagraphs, skills, education } from "@/data/portfolio";

export function SectionTitle({
  index,
  title,
  en,
}: {
  index: string;
  title: string;
  en: string;
}) {
  return (
    <div className="flex items-end gap-4 border-b border-line pb-5">
      <span
        className="font-mono text-base text-accent"
        style={{ textShadow: "0 0 10px rgba(255,0,60,0.7)" }}
      >
        {index}
      </span>
      <h2
        className="font-display text-4xl font-black uppercase tracking-tight text-foreground sm:text-5xl lg:text-6xl"
        style={{ textShadow: "0 2px 14px rgba(0,0,0,0.9)" }}
      >
        {title}
      </h2>
      <span className="mb-2 font-mono text-base uppercase tracking-[0.3em] text-muted-foreground"
        style={{ textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}
      >
        / {en}
      </span>
      <span className="mb-2 ml-auto hidden font-mono text-sm text-muted sm:block"
        style={{ textShadow: "0 1px 3px rgba(0,0,0,0.4)" }}
      >
        [ SECTION_{index} ]
      </span>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative w-full py-24 lg:py-32">
      <div className="grid-bg absolute inset-0 opacity-20" />
      <div className="relative mx-auto max-w-[1700px] px-6 lg:px-10">
        <SectionTitle index="01" title="关于我" en="ABOUT" />

        {/* 第一行：左基本信息 + 右自我介绍 */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.3fr]">
          {/* 左：基本信息 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="panel corner-cut p-8"
          >
            <div className="flex items-start justify-between border-b border-line-soft pb-6">
              <div>
                <h3
                  className="font-display text-5xl font-black text-foreground"
                  style={{ textShadow: "0 0 20px rgba(255,0,60,0.5), 0 2px 10px rgba(0,0,0,0.8)" }}
                >
                  {profile.name}
                </h3>
                <p className="mt-1 font-mono text-base tracking-[0.2em] text-accent-soft"
                  style={{ textShadow: "0 0 8px rgba(255,0,60,0.4)" }}
                >
                  {profile.nameEn}
                </p>
              </div>
              <span className="corner-cut border border-accent bg-accent/15 px-4 py-2 font-mono text-sm text-accent"
                style={{ textShadow: "0 0 8px rgba(255,0,60,0.5)" }}
              >
                求职中
              </span>
            </div>

            <ul className="mt-7 space-y-4 font-mono text-base">
              <InfoRow k="状态" v={profile.status} highlight />
              <InfoRow k="学校" v={profile.school} />
              <InfoRow k="专业" v={profile.major} />
              <InfoRow k="生日" v={profile.birthday} />
              <InfoRow k="邮箱" v={profile.email} />
              <InfoRow k="电话" v={profile.phone} />
            </ul>
          </motion.div>

          {/* 右：自我介绍 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="panel corner-cut p-8"
          >
            <h4 className="mb-5 font-mono text-base tracking-[0.3em] text-accent-soft"
              style={{ textShadow: "0 0 8px rgba(255,0,60,0.4)" }}
            >
              // 自我介绍
            </h4>
            <div className="space-y-4">
              {bioParagraphs.map((p, i) => (
                <p key={i} className="flex items-start gap-3 font-sans text-lg leading-relaxed text-foreground/95"
                  style={{ textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}
                >
                  <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-accent"
                    style={{ boxShadow: "0 0 8px rgba(255,0,60,0.8), 0 0 16px rgba(255,0,60,0.4)" }}
                  />
                  <span>{p}</span>
                </p>
              ))}
            </div>
          </motion.div>
        </div>

        {/* 第二行：技能矩阵 + 教育经历 平铺开 */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[2fr_1fr]">
          {/* 技能矩阵 - 宽 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="panel corner-cut p-8"
          >
            <h3 className="mb-6 font-mono text-base tracking-[0.3em] text-accent-soft"
              style={{ textShadow: "0 0 8px rgba(255,0,60,0.4)" }}
            >
              // 技能矩阵
            </h3>
            <div className="space-y-6">
              {skills.map((g) => (
                <div key={g.group}>
                  <div className="mb-3 flex items-center gap-3">
                    <span className="h-3 w-3 bg-accent" style={{ boxShadow: "0 0 8px rgba(255,0,60,0.6)" }} />
                    <span
                      className="font-display text-lg font-bold tracking-wider text-foreground"
                      style={{ textShadow: "0 1px 6px rgba(0,0,0,0.8)" }}
                    >
                      {g.group}
                    </span>
                    <span className="h-px flex-1 bg-line-soft" />
                    <span className="font-mono text-sm text-muted"
                      style={{ textShadow: "0 1px 3px rgba(0,0,0,0.4)" }}
                    >
                      {String(g.tags.length).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {g.tags.map((t) => (
                      <span
                        key={t}
                        data-cursor="pointer"
                        className="border border-line-soft bg-bg-soft px-4 py-2 font-mono text-base text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-accent hover:text-foreground hover:shadow-[0_0_12px_rgba(255,0,60,0.4)]"
                        style={{ textShadow: "0 1px 3px rgba(0,0,0,0.4)" }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 教育经历 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="panel corner-cut p-8"
          >
            <h3 className="mb-5 font-mono text-base tracking-[0.3em] text-accent-soft"
              style={{ textShadow: "0 0 8px rgba(255,0,60,0.4)" }}
            >
              // 教育经历
            </h3>
            <div className="flex items-baseline gap-3">
              <h4
                className="font-display text-xl font-bold text-foreground"
                style={{ textShadow: "0 1px 8px rgba(0,0,0,0.7)" }}
              >
                {education.school}
              </h4>
              <span className="font-mono text-sm text-muted"
                style={{ textShadow: "0 1px 3px rgba(0,0,0,0.4)" }}
              >· {education.degree}</span>
            </div>
            <p className="mt-1 font-mono text-sm text-accent-soft"
              style={{ textShadow: "0 0 6px rgba(255,0,60,0.3)" }}
            >{education.period}</p>
            <ul className="mt-5 space-y-3">
              {education.highlights.map((h, i) => (
                <li
                  key={i}
                  className="font-sans text-base leading-relaxed text-foreground/85"
                  style={{ textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}
                >
                  <span className="mr-2 text-accent">▸</span>
                  {h}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function InfoRow({
  k,
  v,
  highlight,
}: {
  k: string;
  v: string;
  highlight?: boolean;
}) {
  return (
    <li className="flex items-center justify-between">
      <span className="text-muted-foreground"
        style={{ textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}
      >{k}</span>
      <span
        className={
          highlight
            ? "font-semibold text-accent"
            : "font-semibold text-foreground"
        }
        style={{
          textShadow: highlight
            ? "0 0 10px rgba(255,0,60,0.5)"
            : "0 1px 6px rgba(0,0,0,0.6)",
        }}
      >
        {v}
      </span>
    </li>
  );
}