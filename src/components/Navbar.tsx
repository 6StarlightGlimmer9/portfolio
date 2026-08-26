"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { profile } from "@/data/portfolio";

const LINKS = [
  { href: "#home", label: "首页" },
  { href: "#about", label: "关于" },
  { href: "#portfolio", label: "作品" },
  { href: "#internship", label: "实习" },
  { href: "#contact", label: "联系" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(7,7,11,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,0,60,0.25)" : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex h-16 max-w-[1700px] items-center justify-between px-6 lg:px-10">
        <a href="#home" className="font-display text-xl font-black tracking-widest text-foreground">
          <span className="text-accent" style={{ textShadow: "0 0 10px rgba(255,0,60,0.6)" }}>
            {profile.name}
          </span>
          <span className="ml-2 font-mono text-xs text-muted" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}>
            // 2005-1-21
          </span>
        </a>
        <ul className="flex items-center gap-1 font-mono text-sm uppercase tracking-wider">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative block px-3 py-2 text-muted transition-colors hover:text-foreground"
                style={{ textShadow: "0 1px 3px rgba(0,0,0,0.4)" }}
              >
                <span className="text-accent/60 group-hover:text-accent">/</span> {l.label}
                <span className="absolute inset-x-3 bottom-1 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
}