"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import type { PortfolioCategory, MediaItem } from "@/data/portfolio";

type ScatterPos = {
  top: number;    // %
  left: number;   // %
  size: number;   // px width
  rotate: number; // deg
  z: number;
};

/** 两个矩形中心距离（百分比） */
function centerDistance(a: ScatterPos, b: ScatterPos): number {
  const dx = a.left - b.left;
  const dy = a.top - b.top;
  return Math.sqrt(dx * dx + dy * dy);
}

/** 生成一组散落位置 + 防碰撞，每次刷新不同；视频 z-index 更高 */
function generateScatterPositions(
  items: { type: string }[],
  containerW: number,
  containerH: number
): ScatterPos[] {
  const total = items.length;
  const positions: ScatterPos[] = [];
  const baseMin = 150;
  const baseMax = 210;

  // 最少间距（百分比），防止堆叠过密
  const minDist = 18;

  // 视频分配更高的 z-index 区间
  const videoIndices = items
    .map((it, i) => (it.type === "video" ? i : -1))
    .filter((i) => i !== -1);
  const imageIndices = items
    .map((it, i) => (it.type !== "video" ? i : -1))
    .filter((i) => i !== -1);

  const maxAttempts = 80;

  for (let i = 0; i < total; i++) {
    const size = baseMin + Math.random() * (baseMax - baseMin);
    const rotate = (Math.random() - 0.5) * 10;

    // 计算该元素在容器中的尺寸百分比
    const wPct = (size / containerW) * 100;
    const hPct = ((size * 9 / 16) / containerH) * 100;
    // 安全边距：保证元素完整可见
    const marginLeft = wPct / 2 + 2;
    const marginRight = 100 - wPct / 2 - 2;
    const marginTop = hPct / 2 + 2;
    const marginBottom = 100 - hPct / 2 - 2;

    let placed = false;
    let bestTop = 50;
    let bestLeft = 50;
    let bestDist = 0;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const top = marginTop + Math.random() * (marginBottom - marginTop);
      const left = marginLeft + Math.random() * (marginRight - marginLeft);

      // 检查与已有元素的距离
      let minD = Infinity;
      for (const p of positions) {
        const d = centerDistance({ top, left, size: 0, rotate: 0, z: 0 }, p);
        if (d < minD) minD = d;
      }

      if (minD >= minDist || positions.length === 0) {
        positions.push({ top, left, size, rotate, z: 0 });
        placed = true;
        break;
      }

      // 记录最佳候选（离所有已有元素最远）
      if (minD > bestDist) {
        bestDist = minD;
        bestTop = top;
        bestLeft = left;
      }
    }

    // 兜底：如果找不到满足间距的位置，用最佳候选
    if (!placed) {
      positions.push({ top: bestTop, left: bestLeft, size, rotate, z: 0 });
    }
  }

  // 图片 z: 0-19, 视频 z: 30-49
  imageIndices.forEach((idx) => {
    positions[idx].z = Math.floor(Math.random() * 20);
  });
  videoIndices.forEach((idx) => {
    positions[idx].z = 30 + Math.floor(Math.random() * 20);
  });

  return positions;
}

export default function PortfolioGrid({
  category,
  index,
}: {
  category: PortfolioCategory;
  index: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const selectedItem = selected !== null ? category.items[selected] : null;

  // 容器尺寸（用于生成防碰撞位置）
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const positionsReadyRef = useRef(false);

  useEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setDims({ w: entry.contentRect.width, h: entry.contentRect.height });
      }
    });
    ro.observe(inner);
    return () => ro.disconnect();
  }, []);

  // 初始随机位置 —— 等容器尺寸就绪后生成一次
  const initialPositions = useMemo(() => {
    if (dims.w < 100 || dims.h < 100) return null;
    return generateScatterPositions(category.items, dims.w, dims.h);
  }, [dims.w, dims.h, category.items]);

  const [positions, setPositions] = useState<ScatterPos[]>([]);
  const topZ = useRef(50);

  // 当 initialPositions 就绪时，初始化 positions（仅一次）
  useEffect(() => {
    if (initialPositions && !positionsReadyRef.current) {
      positionsReadyRef.current = true;
      setPositions(initialPositions);
    }
  }, [initialPositions]);

  const bringToFront = useCallback((i: number) => {
    topZ.current += 1;
    setPositions((prev) => {
      const next = [...prev];
      next[i] = { ...next[i], z: topZ.current };
      return next;
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="panel corner-cut relative flex flex-col"
    >
      {/* 头部 */}
      <div className="flex items-center justify-between border-b border-line-soft px-5 py-3">
        <div>
          <h3 className="font-display text-lg font-bold uppercase tracking-wider text-foreground"
            style={{ textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}
          >
            {category.title}
          </h3>
          <p className="mt-0.5 font-mono text-xs uppercase tracking-[0.25em] text-accent-soft"
            style={{ textShadow: "0 0 6px rgba(255,0,60,0.4)" }}
          >
            // {category.subtitle}
          </p>
        </div>
        <div className="text-right font-mono text-xs text-muted"
          style={{ textShadow: "0 1px 3px rgba(0,0,0,0.4)" }}
        >
          <div className="text-accent" style={{ textShadow: "0 0 8px rgba(255,0,60,0.4)" }}>
            {category.items.length.toString().padStart(2, "0")} ITEMS
          </div>
          <div className="mt-0.5 opacity-70">DBLCLICK · DRAG</div>
        </div>
      </div>

      {/* 描述 */}
      <p className="px-5 pt-3 font-sans text-base leading-relaxed text-foreground/90"
        style={{ textShadow: "0 2px 6px rgba(0,0,0,0.5)" }}
      >
        {category.desc}
      </p>

      {/* 桌面区域：照片散落效果 + 可拖拽 */}
      <div ref={containerRef} className="relative mt-3 border-t border-line-soft bg-bg/60">
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-20" />

        <div ref={innerRef} className="relative h-[420px] sm:h-[460px] md:h-[500px] w-full overflow-hidden">
          {positions.length > 0 && category.items.map((item, i) => (
            <ScatterPhoto
              key={i}
              item={item}
              pos={positions[i]}
              index={i}
              total={category.items.length}
              containerRef={innerRef}
              onPositionChange={(p) => {
                setPositions((prev) => {
                  const next = [...prev];
                  next[i] = p;
                  return next;
                });
              }}
              onDragStart={() => bringToFront(i)}
              onDoubleClick={() => setSelected(i)}
            />
          ))}
        </div>
      </div>

      {/* 放大层 —— 覆盖整个大框，使用 corner-cut 匹配切角 */}
      <AnimatePresence>
        {selectedItem && (
          <ExpandedOverlay
            item={selectedItem}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/** 散落式照片 —— 可拖拽 + 边界限制 */
function ScatterPhoto({
  item,
  pos,
  index,
  total,
  containerRef,
  onPositionChange,
  onDragStart,
  onDoubleClick,
}: {
  item: MediaItem;
  pos: ScatterPos;
  index: number;
  total: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
  onPositionChange: (p: ScatterPos) => void;
  onDragStart: () => void;
  onDoubleClick: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const elRef = useRef<HTMLDivElement>(null);

  // 拖拽状态
  const draggingRef = useRef(false);
  // 指针相对元素中心的偏移（px）
  const pointerOffsetRef = useRef({ x: 0, y: 0 });
  const movedRef = useRef(false);
  const suppressClickRef = useRef(false);

  useEffect(() => {
    if (item.type === "video" && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [item.type]);

  /** 计算元素在容器中的安全边界（百分比） */
  const getBounds = useCallback(() => {
    const container = containerRef.current;
    const el = elRef.current;
    if (!container || !el) return null;

    const cRect = container.getBoundingClientRect();
    const eRect = el.getBoundingClientRect();

    const wPct = (eRect.width / cRect.width) * 100;
    const hPct = (eRect.height / cRect.height) * 100;

    return {
      minTop: hPct / 2,
      maxTop: 100 - hPct / 2,
      minLeft: wPct / 2,
      maxLeft: 100 - wPct / 2,
    };
  }, [containerRef]);

  /** 将 clientX/Y 转换为容器内百分比坐标，带边界限制 */
  const clientToPercent = useCallback(
    (clientX: number, clientY: number) => {
      const container = containerRef.current;
      if (!container) return { top: pos.top, left: pos.left };

      const cRect = container.getBoundingClientRect();
      const bounds = getBounds();
      if (!bounds) return { top: pos.top, left: pos.left };

      // 元素中心在容器内的像素位置
      const centerX = clientX - pointerOffsetRef.current.x - cRect.left;
      const centerY = clientY - pointerOffsetRef.current.y - cRect.top;

      let leftPct = (centerX / cRect.width) * 100;
      let topPct = (centerY / cRect.height) * 100;

      // 限制在安全区域内
      leftPct = Math.max(bounds.minLeft, Math.min(bounds.maxLeft, leftPct));
      topPct = Math.max(bounds.minTop, Math.min(bounds.maxTop, topPct));

      return { top: topPct, left: leftPct };
    },
    [pos.top, pos.left, containerRef, getBounds]
  );

  /** Pointer 事件处理 */
  const handlePointerDown = (e: React.PointerEvent) => {
    draggingRef.current = true;
    movedRef.current = false;

    // 记录指针相对元素中心的偏移（px）
    const el = elRef.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      pointerOffsetRef.current = {
        x: e.clientX - (rect.left + rect.width / 2),
        y: e.clientY - (rect.top + rect.height / 2),
      };
    }

    onDragStart();
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;

    const { top, left } = clientToPercent(e.clientX, e.clientY);

    // 检查是否有实际移动
    if (!movedRef.current) {
      const dx = left - pos.left;
      const dy = top - pos.top;
      if (Math.sqrt(dx * dx + dy * dy) > 0.3) movedRef.current = true;
    }

    onPositionChange({ ...pos, top, left, rotate: 0 });
  };

  const endDrag = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;

    if (movedRef.current) {
      suppressClickRef.current = true;
      setTimeout(() => (suppressClickRef.current = false), 100);
    }
    (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
  };

  const handleClick = (e: React.MouseEvent) => {
    if (suppressClickRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleDoubleClick = () => {
    if (suppressClickRef.current) return;
    onDoubleClick();
  };

  const isVideo = item.type === "video";

  return (
    <div
      ref={elRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      style={{
        position: "absolute",
        top: `${pos.top}%`,
        left: `${pos.left}%`,
        width: `${pos.size}px`,
        aspectRatio: "16 / 9",
        transform: `translate(-50%, -50%) rotate(${pos.rotate}deg)`,
        zIndex: pos.z,
        touchAction: "none",
      }}
      className="group cursor-grab active:cursor-grabbing overflow-hidden border border-line bg-bg-soft shadow-[0_4px_18px_rgba(0,0,0,0.6)] transition-shadow hover:border-accent hover:shadow-[0_0_24px_rgba(255,0,60,0.45)]"
      data-cursor="pointer"
    >
      {item.type === "image" ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.src}
          alt={item.label}
          className="pointer-events-none h-full w-full object-contain select-none"
          loading="eager"
          draggable={false}
        />
      ) : (
        <video
          ref={videoRef}
          src={item.src}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="pointer-events-none h-full w-full object-contain select-none"
          draggable={false}
        />
      )}

      {/* hover 渐变遮罩 */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/85 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* 序号 */}
      <span className="pointer-events-none absolute left-1.5 top-1.5 bg-bg/75 px-1.5 py-0.5 font-mono text-[9px] text-accent opacity-0 transition-opacity group-hover:opacity-100"
        style={{ textShadow: "0 0 6px rgba(255,0,60,0.5)" }}
      >
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>

      {/* 类型标签 */}
      <span className="pointer-events-none absolute bottom-1.5 right-1.5 bg-bg/75 px-1.5 py-0.5 font-mono text-[9px] uppercase text-muted opacity-0 transition-opacity group-hover:opacity-100">
        {item.type === "video" ? "▶ VIDEO" : "IMG"}
      </span>

      {/* 角装饰线 */}
      <span className="pointer-events-none absolute left-0 top-0 h-2.5 w-2.5 border-l border-t border-transparent transition-colors group-hover:border-accent" />
      <span className="pointer-events-none absolute bottom-0 right-0 h-2.5 w-2.5 border-b border-r border-transparent transition-colors group-hover:border-accent" />

      {/* 视频静音标记 */}
      {isVideo && (
        <span className="pointer-events-none absolute right-1.5 top-1.5 flex items-center gap-1 rounded bg-bg/60 px-1.5 py-0.5 font-mono text-[8px] text-muted">
          <span className="inline-block h-1 w-1 rounded-full bg-accent animate-pulse" />
          MUTED
        </span>
      )}

      {/* 视频置顶指示 */}
      {isVideo && (
        <span className="pointer-events-none absolute bottom-1.5 left-1.5 rounded bg-accent/80 px-1.5 py-0.5 font-mono text-[8px] font-bold uppercase text-white opacity-0 transition-opacity group-hover:opacity-100">
          PINNED
        </span>
      )}
    </div>
  );
}

/** 放大层 —— 在大框内置顶，支持双击关闭 + 滚轮缩放 */
function ExpandedOverlay({
  item,
  onClose,
}: {
  item: MediaItem;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragRef = useRef<{ dragging: boolean; startX: number; startY: number; offX: number; offY: number }>({
    dragging: false, startX: 0, startY: 0, offX: 0, offY: 0,
  });

  useEffect(() => {
    if (item.type === "video" && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
    // 打开时锁定 body 滚动
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [item]);

  // ESC 关闭
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // 滚轮缩放
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setScale((s) => Math.max(0.5, Math.min(4, s + delta)));
  }, []);

  // 拖动平移
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (scale <= 1) return;
    dragRef.current = {
      dragging: true,
      startX: e.clientX,
      startY: e.clientY,
      offX: offset.x,
      offY: offset.y,
    };
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  }, [scale, offset]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragRef.current.dragging) return;
    setOffset({
      x: dragRef.current.offX + (e.clientX - dragRef.current.startX),
      y: dragRef.current.offY + (e.clientY - dragRef.current.startY),
    });
  }, []);

  const endPan = useCallback((e: React.PointerEvent) => {
    dragRef.current.dragging = false;
    (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
  }, []);

  const reset = useCallback((e: React.MouseEvent | React.UIEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setScale(1);
    setOffset({ x: 0, y: 0 });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onDoubleClick={onClose}
      className="absolute inset-0 z-[200] corner-cut flex items-center justify-center bg-bg/95 backdrop-blur-sm"
      data-cursor="pointer"
      onWheel={handleWheel}
      onContextMenu={reset}
    >
      <div className="absolute left-3 top-3 z-[201] font-mono text-xs uppercase tracking-[0.2em] text-accent pointer-events-none"
        style={{ textShadow: "0 0 8px rgba(255,0,60,0.5)" }}
      >
        ▸ dblclose · wheel-zoom · ESC · 右键复位
      </div>

      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="relative h-full w-full overflow-hidden"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endPan}
        onPointerCancel={endPan}
        onWheel={handleWheel}
        style={{ touchAction: "none" }}
      >
        <div
          className="h-full w-full transition-transform duration-100"
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
          }}
        >
          {item.type === "image" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.src}
              alt={item.label}
              className="h-full w-full object-contain p-3 select-none pointer-events-none"
              draggable={false}
            />
          ) : (
            <video
              ref={videoRef}
              src={item.src}
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-contain p-3 select-none pointer-events-none"
            />
          )}
        </div>
      </motion.div>

      {/* 缩放指示器 */}
      {scale !== 1 && (
        <div className="absolute right-3 top-3 z-[201] rounded bg-bg/80 px-3 py-1 font-mono text-xs text-muted-foreground pointer-events-none">
          {scale.toFixed(1)}x · 右键复位
        </div>
      )}

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-[201] bg-bg/80 px-4 py-1.5 font-mono text-sm text-muted-foreground pointer-events-none"
        style={{ textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}
      >
        {item.label}
      </div>
    </motion.div>
  );
}