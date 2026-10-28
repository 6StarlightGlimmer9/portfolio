"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import Internship from "@/components/Internship";
import Contact from "@/components/Contact";
import SiteLoader from "@/components/SiteLoader";

// 鼠标粒子特效依赖 window / canvas，关闭 SSR
const CursorParticles = dynamic(() => import("@/components/CursorParticles"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      {/* 光标放在加载层外层，加载过程中也能看到 */}
      <CursorParticles />
      <SiteLoader>
        <Navbar />
        <main className="flex flex-col">
          <Hero />
          <About />
          <Portfolio />
          <Internship />
          <Contact />
        </main>
      </SiteLoader>
    </>
  );
}
