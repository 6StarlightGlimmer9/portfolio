"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  portfolioCategories,
  internshipImages,
  internship2Images,
  heroVideo,
} from "@/data/portfolio";

type Kind = "image" | "video";

type Asset = { src: string; kind: Kind };

type Task = Asset & { total: number; loaded: number; done: boolean };

export type LoadState = {
  percent: number;
  loadedBytes: number;
  totalBytes: number;
  current: string;
  done: number;
  total: number;
};

/** 全站需要预加载的素材（图片 + 视频），按 src 去重 */
const ASSETS: Asset[] = (() => {
  const list: Asset[] = [{ src: heroVideo, kind: "video" }];
  for (const c of portfolioCategories) {
    for (const it of c.items) list.push({ src: it.src, kind: it.type });
  }
  for (const s of internshipImages) list.push({ src: s, kind: "image" });
  for (const s of internship2Images) list.push({ src: s, kind: "image" });

  const seen = new Set<string>();
  return list.filter((a) => {
    if (seen.has(a.src)) return false;
    seen.add(a.src);
    return true;
  });
})();

/** HEAD 取不到体积时的兜底权重 */
const DEFAULT_WEIGHT = 6 * 1024 * 1024;
/** 并发下载数，避免同时开太多连接拖慢整体 */
const CONCURRENCY = 6;

/** 多个组件重复挂载时复用同一个预加载过程 */
let sharedPromise: Promise<void> | null = null;

/** 订阅者集合：保证组件重新挂载后依然能收到进度 */
const subscribers = new Set<(s: LoadState) => void>();
let latestState: LoadState | null = null;

function publish(state: LoadState) {
  latestState = state;
  subscribers.forEach((fn) => fn(state));
}

function createEmitter(tasks: Task[], report: (s: LoadState) => void) {
  let raf = 0;
  const emit = () => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      const totalBytes = tasks.reduce((s, t) => s + t.total, 0) || 1;
      const loadedBytes = tasks.reduce((s, t) => s + Math.min(t.loaded, t.total), 0);
      const pending = tasks.filter((t) => !t.done);
      const current = pending[0] ?? tasks[tasks.length - 1];
      report({
        percent: Math.min(100, (loadedBytes / totalBytes) * 100),
        loadedBytes,
        totalBytes,
        current: decodeURIComponent((current?.src ?? "").split("/").pop() ?? ""),
        done: tasks.length - pending.length,
        total: tasks.length,
      });
    });
  };
  return emit;
}

async function loadOne(t: Task, emit: () => void) {
  try {
    const res = await fetch(t.src);
    if (!res.ok) throw new Error(String(res.status));

    const len = Number(res.headers.get("content-length"));
    if (len > 0) t.total = len;

    if (!res.body) {
      await res.arrayBuffer();
    } else {
      const reader = res.body.getReader();
      let received = 0;
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        received += value.byteLength;
        t.loaded = received;
        emit();
      }
    }
    t.loaded = t.total;

    // 图片额外解码一次，保证真正显示时不用再等解码
    if (t.kind === "image") {
      const img = new Image();
      img.src = t.src;
      try {
        await img.decode();
      } catch {
        /* 解码失败不影响流程 */
      }
    }
  } catch {
    // 单个素材失败也直接放行，避免进度条卡住
    t.loaded = t.total;
  } finally {
    t.done = true;
    emit();
  }
}

async function runPreload(report: (s: LoadState) => void) {
  const tasks: Task[] = ASSETS.map((a) => ({ ...a, total: 0, loaded: 0, done: false }));
  const emit = createEmitter(tasks, report);

  // 第一阶段：HEAD 拿到每个文件的真实体积，保证进度条按字节推进
  await Promise.all(
    tasks.map(async (t) => {
      let size = 0;
      try {
        const res = await fetch(t.src, { method: "HEAD" });
        const len = Number(res.headers.get("content-length"));
        if (res.ok && len > 0) size = len;
      } catch {
        /* 拿不到就用兜底权重 */
      }
      t.total = size > 0 ? size : DEFAULT_WEIGHT;
    })
  );
  emit();

  // 第二阶段：并发拉取所有素材
  let cursor = 0;
  const worker = async () => {
    for (;;) {
      const index = cursor++;
      if (index >= tasks.length) return;
      await loadOne(tasks[index], emit);
    }
  };
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  emit();
}

function formatMB(bytes: number) {
  return (bytes / 1024 / 1024).toFixed(1);
}

export default function SiteLoader({ children }: { children: React.ReactNode }) {
  const [percent, setPercent] = useState(0);
  const [state, setState] = useState<LoadState>({
    percent: 0,
    loadedBytes: 0,
    totalBytes: 0,
    current: "",
    done: 0,
    total: ASSETS.length,
  });
  const [contentReady, setContentReady] = useState(false);
  const [overlayVisible, setOverlayVisible] = useState(true);
  const [exited, setExited] = useState(false);

  useEffect(() => {
    let alive = true;
    const report = (s: LoadState) => {
      if (!alive) return;
      setState(s);
      setPercent(s.percent);
    };

    // 重新挂载时先同步一次已知的最新进度
    subscribers.add(report);
    if (latestState) report(latestState);

    // 复用同一个预加载过程（React 严格模式下 effect 会执行两次）
    const startedAt = performance.now();
    if (!sharedPromise) sharedPromise = runPreload(publish);

    const done = async () => {
      if (!alive) return;
      // 本地加载很快时也保证进度条能被看清，避免一闪而过
      const elapsed = performance.now() - startedAt;
      await new Promise((r) => window.setTimeout(r, Math.max(0, 900 - elapsed)));
      if (!alive) return;
      setPercent(100);
      setContentReady(true);
      // 进度条跑满后停留片刻，再淡出加载层
      window.setTimeout(() => alive && setOverlayVisible(false), 620);
    };

    sharedPromise.then(done).catch(done);

    return () => {
      alive = false;
      subscribers.delete(report);
    };
  }, []);

  // 加载期间锁定页面滚动，直到加载层完全淡出
  useEffect(() => {
    if (exited) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [exited]);

  const displayPercent = Math.floor(percent);

  return (
    <>
      {contentReady && children}

      <AnimatePresence onExitComplete={() => setExited(true)}>
        {overlayVisible && (
          <motion.div
            key="site-loader"
            data-loader="site-loader"
            className="noise fixed inset-0 z-[9000] flex flex-col items-center justify-center overflow-hidden bg-bg"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
          >
            <div className="grid-bg pointer-events-none absolute inset-0 opacity-15" />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 50%, rgba(255,0,60,0.10) 0%, rgba(7,7,11,0) 55%, rgba(7,7,11,0.9) 100%)",
              }}
            />
            <div
              className="scan-line pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent opacity-70"
              style={{ boxShadow: "0 0 12px rgba(255,0,60,0.8)" }}
            />

            {/* 顶部标识 */}
            <div className="absolute left-6 top-6 hidden font-mono text-[10px] uppercase tracking-[0.3em] text-accent-soft md:block">
              <span className="text-accent">{"//"}</span> SYSTEM BOOT
            </div>
            <div className="absolute right-6 top-6 hidden font-mono text-[10px] uppercase tracking-[0.3em] text-muted md:block">
              <span className="text-accent">●</span> PRELOADING ASSETS
            </div>

            <div className="relative w-[min(680px,86vw)]">
              {/* 阶段标题 */}
              <div className="flex items-center justify-between font-mono text-xs tracking-[0.3em] text-accent-soft">
                <span>
                  <span className="text-accent">▸</span>{" "}
                  {displayPercent >= 100 ? "READY" : "LOADING"}
                </span>
                <span className="text-muted">
                  [{String(state.done).padStart(2, "0")} / {String(state.total).padStart(2, "0")}]
                </span>
              </div>

              {/* 百分比 */}
              <div className="mt-6 flex items-end gap-3">
                <span
                  data-loader-pct
                  className="font-display text-[5.5rem] font-black leading-none text-foreground tabular-nums sm:text-[7rem]"
                  style={{
                    textShadow:
                      "0 0 20px rgba(255,0,60,0.55), 0 4px 30px rgba(255,0,60,0.35), 0 2px 10px rgba(0,0,0,0.9)",
                  }}
                >
                  {String(displayPercent).padStart(3, "0")}
                </span>
                <span
                  className="mb-4 font-mono text-2xl text-accent"
                  style={{ textShadow: "0 0 12px rgba(255,0,60,0.7)" }}
                >
                  %
                </span>
              </div>

              {/* 进度条 */}
              <div className="relative mt-7 h-[3px] w-full bg-line-soft">
                <div
                  className="h-full bg-accent transition-[width] duration-200 ease-out"
                  style={{
                    width: `${percent}%`,
                    boxShadow: "0 0 12px rgba(255,0,60,0.9), 0 0 24px rgba(255,0,60,0.5)",
                  }}
                />
                {/* 刻度 */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-40"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(90deg, rgba(7,7,11,0.9) 0 1px, transparent 1px 24px)",
                  }}
                />
              </div>

              {/* 状态行 */}
              <div className="mt-4 flex items-center justify-between gap-6 font-mono text-[11px] text-muted-foreground">
                <span className="truncate">
                  <span className="text-accent">›</span>{" "}
                  {displayPercent >= 100 ? "ALL ASSETS CACHED" : state.current || "初始化资源清单…"}
                </span>
                <span className="shrink-0 tabular-nums text-muted">
                  {formatMB(state.loadedBytes)} / {formatMB(state.totalBytes)} MB
                </span>
              </div>

              {/* 底部装饰 */}
              <div className="mt-10 flex items-center gap-3">
                <span className="h-px flex-1 bg-line-soft" />
                <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted">
                  HAN SHIFENG · PORTFOLIO
                </span>
                <span className="h-px flex-1 bg-line-soft" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
