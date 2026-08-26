"use client";

import { portfolioCategories } from "@/data/portfolio";
import PortfolioGrid from "./PortfolioGrid";
import { SectionTitle } from "./About";

export default function Portfolio() {
  return (
    <section id="portfolio" className="relative w-full py-24 lg:py-32">
      <div className="relative mx-auto max-w-[1700px] px-6 lg:px-10">
        <SectionTitle index="02" title="作品集" en="PORTFOLIO" />

        {/* 4 个大格子：2x2 网格 */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {portfolioCategories.map((cat, i) => (
            <PortfolioGrid key={cat.id} category={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}