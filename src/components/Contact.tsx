"use client";

import { motion } from "framer-motion";
import { contactLinks, socialLinks, profile } from "@/data/portfolio";
import { SectionTitle } from "./About";

function SocialIcon({ platform }: { platform: string }) {
  switch (platform) {
    case "bilibili":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
          <path d="M17.813 4.653h.854c1.51.054 2.769.578 3.773 1.574 1.004.995 1.524 2.249 1.56 3.76v7.36c-.036 1.51-.556 2.769-1.56 3.773s-2.262 1.524-3.773 1.56H5.333c-1.51-.036-2.769-.556-3.773-1.56S.036 18.858 0 17.347v-7.36c.036-1.511.556-2.769 1.56-3.76 1.004-.995 2.262-1.519 3.773-1.573h.853L4.63 3.48c-.195-.195-.293-.44-.293-.736 0-.294.098-.54.293-.735l.073-.074c.195-.194.44-.291.736-.291.294 0 .54.097.735.291L7.3 4.653h1.435l.002-.005h6.51l.002.005h1.435l1.163-2.409c.195-.194.44-.291.735-.291.295 0 .541.097.736.291l.074.074c.194.195.291.44.291.735 0 .295-.104.54-.299.736l-1.079 1.965zM5.333 7.24c-.747 0-1.372.26-1.873.78-.501.52-.767 1.145-.79 1.873v7.653c.018.728.284 1.353.79 1.873.501.52 1.126.78 1.873.78h13.334c.747 0 1.372-.26 1.873-.78.501-.52.767-1.145.79-1.873v-7.653c-.018-.728-.284-1.353-.79-1.873-.501-.52-1.126-.78-1.873-.78H5.333z" />
          <path d="M7.511 10.323c.351 0 .643.117.875.35.232.233.349.525.349.876v1.715c0 .351-.117.643-.349.876a1.17 1.17 0 0 1-.875.349c-.351 0-.643-.117-.876-.349a1.174 1.174 0 0 1-.349-.876v-1.715c0-.351.117-.643.349-.876.233-.233.525-.35.876-.35zm8.978 0c.351 0 .643.117.875.35.233.233.35.525.35.876v1.715c0 .351-.117.643-.35.876a1.17 1.17 0 0 1-.875.349c-.351 0-.643-.117-.876-.349a1.174 1.174 0 0 1-.349-.876v-1.715c0-.351.117-.643.349-.876.233-.233.525-.35.876-.35z" />
        </svg>
      );
    case "douyin1":
    case "douyin2":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z" />
        </svg>
      );
    case "pixiv":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
          <path d="M12.002 0C5.375.003 0 5.379 0 12.006c0 6.627 5.375 11.998 12.002 11.998 6.628 0 11.997-5.371 11.997-11.998C24 5.379 18.63 0 12.002 0zM9.618 19.123H8.37V8.37h1.248v10.753zm6.014-8.498c-.495 1.236-1.57 2.433-3.881 4.158l.586 1.085c2.139-1.941 3.292-3.526 3.973-5.243.495 1.236.684 2.237.684 3.128 0 1.707-.65 2.842-1.856 2.842-1.358 0-2.598-1.236-3.01-2.935l-1.22.694c.516 2.048 2.297 3.548 4.332 3.548 2.344 0 3.891-1.783 3.891-4.532 0-1.229-.258-2.37-.77-3.538.517-1.175.77-2.262.77-3.265 0-1.777-.79-2.848-2.084-2.848-1.285 0-2.296.969-2.987 2.518l1.225.702c.424-.935.948-1.698 1.796-1.698.875 0 1.404.641 1.404 1.717 0 .824-.246 1.77-.733 2.794zm-5.247 1.489c0-1.176-.256-2.152-.77-2.916-.513-.764-1.27-1.148-2.158-1.148-.888 0-1.64.384-2.154 1.148-.514.764-.77 1.74-.77 2.916 0 1.175.256 2.151.77 2.915.514.764 1.266 1.147 2.154 1.147.888 0 1.645-.383 2.158-1.147.514-.764.77-1.74.77-2.915zm-1.31 0c0 1.425-.571 2.137-1.628 2.137-1.057 0-1.628-.712-1.628-2.137 0-1.426.571-2.135 1.628-2.135 1.057 0 1.628.709 1.628 2.135z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Contact() {
  return (
    <section id="contact" className="relative w-full py-24 lg:py-32">
      <div className="relative mx-auto max-w-[1700px] px-6 lg:px-10">
        <SectionTitle index="04" title="联系方式" en="CONTACT" />

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.3fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="panel corner-cut relative overflow-hidden p-8"
          >
            <p className="font-mono text-base tracking-[0.3em] text-accent-soft">
              // LET&apos;S CONNECT
            </p>
            <h3
              className="mt-4 font-display text-4xl font-black leading-tight text-foreground sm:text-5xl"
              style={{ textShadow: "0 0 15px rgba(255,0,60,0.5), 0 2px 8px rgba(0,0,0,0.8)" }}
            >
              {profile.name}
              <br />
              <span className="text-accent">期待与你合作</span>
              <span className="blink ml-1 text-accent">_</span>
            </h3>
            <p
              className="mt-5 max-w-md font-sans text-lg leading-relaxed text-foreground/90"
              style={{ textShadow: "0 2px 6px rgba(0,0,0,0.5)" }}
            >
              前端开发、全栈项目、社媒内容、游戏交流，欢迎通过以下任意渠道联系。
            </p>

            <div
              className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full opacity-20 blur-3xl"
              style={{ background: "radial-gradient(circle, #ff003c, transparent 70%)" }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="panel corner-cut p-2"
          >
            <ul className="flex h-full flex-col">
              {contactLinks.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    data-cursor="pointer"
                    className="group grid grid-cols-[120px_1fr_40px] items-center gap-4 border-b border-line-soft px-6 py-5 transition-colors last:border-b-0 hover:bg-accent/5"
                  >
                    <span className="font-mono text-base tracking-[0.2em] text-accent-soft">
                      {c.label}
                    </span>
                    <span className="font-mono text-lg text-foreground transition-colors group-hover:text-accent"
                      style={{ textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}
                    >
                      {c.value}
                    </span>
                    <span className="text-right text-lg text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-accent">
                      →
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* 页脚 */}
        <footer className="mt-16 border-t border-line-soft pt-8">
          {/* 社交链接 */}
          <div className="flex items-center justify-center gap-5">
            {socialLinks.map((s) => (
              <a
                key={s.platform}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="pointer"
                className="group flex h-12 w-12 items-center justify-center rounded-full border border-line-soft bg-bg-soft text-muted-foreground transition-all hover:border-accent hover:bg-accent/10 hover:text-accent hover:shadow-[0_0_15px_rgba(255,0,60,0.4)]"
                aria-label={s.platform}
              >
                <SocialIcon platform={s.platform} />
              </a>
            ))}
          </div>

          <div className="mt-6 flex flex-col items-center justify-between gap-4 font-mono text-xs tracking-[0.2em] text-muted sm:flex-row">
            <span>
              © {new Date().getFullYear()} {profile.name} · BUILT WITH{" "}
              <span className="text-accent">NEXT.JS</span>
            </span>
            <span>// 27届 · SOFTWARE ENGINEERING · CYBERPUNK PORTFOLIO</span>
          </div>
        </footer>
      </div>
    </section>
  );
}