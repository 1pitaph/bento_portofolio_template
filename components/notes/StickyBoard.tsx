'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import type { StickyNoteData } from '@/re/types';
import { notes as initialNotes } from '@/data/notes';
import StickyNote from './StickyNote';

/** Runtime state extends the static data with always-defined height. */
interface LiveNote extends StickyNoteData {
  height: number | undefined;
}

const SNAP_MARGIN = 40; // 便利贴至少保留 40px 在可见区域内

/** Initial z-index base so notes sit above any board decorations. */
const Z_BASE = 10;

const ShuffleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 3 21 3 21 8" />
    <line x1="4" y1="20" x2="21" y2="3" />
    <polyline points="21 16 21 21 16 21" />
    <line x1="15" y1="15" x2="21" y2="21" />
    <line x1="4" y1="4" x2="9" y2="9" />
  </svg>
);

export default function StickyBoard() {
  const [items, setItems] = useState<LiveNote[]>(() =>
    initialNotes.map((n) => ({ ...n, height: n.height }))
  );

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [snappingIds, setSnappingIds] = useState<Set<string>>(new Set());

  const [zMap, setZMap] = useState<Record<string, number>>(() => {
    const m: Record<string, number> = {};
    initialNotes.forEach((n, i) => {
      m[n.id] = Z_BASE + i;
    });
    return m;
  });

  const zCounterRef = useRef(Z_BASE + initialNotes.length);
  const boardRef = useRef<HTMLDivElement>(null);

  // Interaction state tracked in refs to avoid stale closures in pointermove
  const dragStateRef = useRef<{
    itemId: string;
    startX: number;
    startY: number;
    pointerStartX: number;
    pointerStartY: number;
  } | null>(null);

  const rotateStateRef = useRef<{
    itemId: string;
    cx: number;
    cy: number;
    startAngle: number;
    startPointerAngle: number;
  } | null>(null);

  const bringToFront = useCallback((id: string) => {
    const z = ++zCounterRef.current;
    setZMap((prev) => ({ ...prev, [id]: z }));
  }, []);

  // ── 回弹机制 ────────────────────────────────────────────────────────────────
  const checkAndSnap = useCallback((itemId: string) => {
    const board = boardRef.current;
    if (!board) return;
    const boardW = board.offsetWidth;
    const boardH = board.offsetHeight;

    const noteEl = board.querySelector(
      `[data-item-id="${itemId}"]`
    ) as HTMLElement | null;

    setItems((prev) => {
      const item = prev.find((it) => it.id === itemId);
      if (!item) return prev;

      const noteW = item.width;
      const noteH = noteEl?.offsetHeight ?? item.height ?? 150;

      const tooFarLeft  = item.x + SNAP_MARGIN > boardW;
      const tooFarRight = item.x + noteW - SNAP_MARGIN < 0;
      const tooFarUp    = item.y + SNAP_MARGIN > boardH;
      const tooFarDown  = item.y + noteH - SNAP_MARGIN < 0;

      if (!tooFarLeft && !tooFarRight && !tooFarUp && !tooFarDown) return prev;

      const snapX = Math.max(
        -(noteW - SNAP_MARGIN),
        Math.min(boardW - SNAP_MARGIN, item.x)
      );
      const snapY = Math.max(
        -(noteH - SNAP_MARGIN),
        Math.min(boardH - SNAP_MARGIN, item.y)
      );

      return prev.map((it) =>
        it.id === itemId ? { ...it, x: snapX, y: snapY } : it
      );
    });

    setSnappingIds((prev) => new Set([...prev, itemId]));
    setTimeout(() => {
      setSnappingIds((prev) => {
        const next = new Set(prev);
        next.delete(itemId);
        return next;
      });
    }, 500);
  }, []);

  // Stable ref so the useEffect closure always calls the latest checkAndSnap
  const checkAndSnapRef = useRef(checkAndSnap);
  checkAndSnapRef.current = checkAndSnap;

  // ── 随机打乱位置 ─────────────────────────────────────────────────────────────
  const handleShuffle = useCallback(() => {
    const board = boardRef.current;
    if (!board) return;
    const boardW = board.offsetWidth;
    const boardH = board.offsetHeight;
    const padding = 10;

    setItems((prev) =>
      prev.map((item) => {
        const noteH = item.height ?? 150;
        const maxX = Math.max(0, boardW - item.width - padding * 2);
        const maxY = Math.max(0, boardH - noteH - padding * 2);
        return {
          ...item,
          x: padding + Math.random() * maxX,
          y: padding + Math.random() * maxY,
        };
      })
    );

    const ids = items.map((it) => it.id);
    setSnappingIds((prev) => new Set([...prev, ...ids]));
    setTimeout(() => {
      setSnappingIds((prev) => {
        const next = new Set(prev);
        ids.forEach((id) => next.delete(id));
        return next;
      });
    }, 500);
  }, [items]);

  // ── 展开/收起回调 ───────────────────────────────────────────────────────────
  const handleExpandedChange = useCallback(
    (expanded: boolean, itemId: string) => {
      if (expanded) {
        // 展开：清除固定高度，让便利贴 auto-size
        setItems((prev) =>
          prev.map((it) =>
            it.id === itemId ? { ...it, height: undefined } : it
          )
        );
      } else {
        // 收起：等 DOM 重绘后检查是否需要回弹
        setTimeout(() => checkAndSnapRef.current(itemId), 50);
      }
    },
    []
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>, itemId: string) => {
      e.preventDefault();
      e.stopPropagation();

      const target = e.target as HTMLElement;
      const isRotate = !!target.closest('[data-rotate-handle]');

      setSelectedId(itemId);
      bringToFront(itemId);

      const board = boardRef.current;
      if (!board) return;
      const boardRect = board.getBoundingClientRect();

      const item = items.find((it) => it.id === itemId);
      if (!item) return;

      if (isRotate) {
        const cx = item.x + item.width / 2;
        const cy = item.y + (item.height ?? 150) / 2;
        rotateStateRef.current = {
          itemId,
          cx,
          cy,
          startAngle: item.rotation,
          startPointerAngle:
            (Math.atan2(
              e.clientY - boardRect.top - cy,
              e.clientX - boardRect.left - cx
            ) *
              180) /
            Math.PI,
        };
        target.setPointerCapture(e.pointerId);
      } else {
        dragStateRef.current = {
          itemId,
          startX: item.x,
          startY: item.y,
          pointerStartX: e.clientX - boardRect.left,
          pointerStartY: e.clientY - boardRect.top,
        };
        setDraggingId(itemId);
        e.currentTarget.setPointerCapture(e.pointerId);
      }
    },
    [items, bringToFront]
  );

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      const board = boardRef.current;
      if (!board) return;
      const boardRect = board.getBoundingClientRect();

      if (dragStateRef.current) {
        const { itemId, startX, startY, pointerStartX, pointerStartY } =
          dragStateRef.current;
        const dx = e.clientX - boardRect.left - pointerStartX;
        const dy = e.clientY - boardRect.top - pointerStartY;
        setItems((prev) =>
          prev.map((it) =>
            it.id === itemId ? { ...it, x: startX + dx, y: startY + dy } : it
          )
        );
      }

      if (rotateStateRef.current) {
        const { itemId, cx, cy, startAngle, startPointerAngle } =
          rotateStateRef.current;
        const mx = e.clientX - boardRect.left - cx;
        const my = e.clientY - boardRect.top - cy;
        const angle = (Math.atan2(my, mx) * 180) / Math.PI;
        const delta = angle - startPointerAngle;
        const newR = Math.round((startAngle + delta) * 10) / 10;
        setItems((prev) =>
          prev.map((it) => (it.id === itemId ? { ...it, rotation: newR } : it))
        );
      }

    };

    const handleUp = () => {
      if (dragStateRef.current) {
        const { itemId } = dragStateRef.current;
        setDraggingId(null);
        dragStateRef.current = null;
        checkAndSnapRef.current(itemId);
      }
      rotateStateRef.current = null;
    };

    window.addEventListener('pointermove', handleMove);
    window.addEventListener('pointerup', handleUp);
    window.addEventListener('pointercancel', handleUp);
    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerup', handleUp);
      window.removeEventListener('pointercancel', handleUp);
    };
  }, []);

  return (
    <div
      ref={boardRef}
      className="relative h-full w-full overflow-hidden isolate"
      style={{ userSelect: 'none' }}
      onPointerDown={(e) => {
        if (e.target === boardRef.current) {
          setSelectedId(null);
        }
      }}
    >
      {items.map((item) => (
        <StickyNote
          key={item.id}
          item={item}
          isSelected={selectedId === item.id}
          isDragging={draggingId === item.id}
          isSnapping={snappingIds.has(item.id)}
          onPointerDown={handlePointerDown}
          onExpandedChange={handleExpandedChange}
          zIndex={zMap[item.id] ?? Z_BASE}
        />
      ))}

      <button
        onClick={handleShuffle}
        className="group absolute bottom-4 right-4 z-[100] cursor-pointer overflow-hidden p-1 transition-all duration-300 ease-out hover:scale-110"
      >
        <span className="absolute inset-0 origin-left scale-x-0 bg-foreground transition-transform duration-300 ease-out group-hover:scale-x-100" />
        <span className="relative z-10 flex items-center transition-colors duration-300 group-hover:text-background">
          <ShuffleIcon />
        </span>
      </button>
    </div>
  );
}
