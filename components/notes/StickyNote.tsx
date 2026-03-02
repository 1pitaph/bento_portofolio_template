'use client';

import { useState } from 'react';
import type { StickyNoteData } from '@/re/types';

interface LiveNote extends StickyNoteData {
  height: number | undefined;
}

interface StickyNoteProps {
  item: LiveNote;
  isSelected: boolean;
  isDragging: boolean;
  isSnapping: boolean;
  onPointerDown: (e: React.PointerEvent<HTMLDivElement>, id: string) => void;
  onExpandedChange: (expanded: boolean, itemId: string) => void;
  zIndex: number;
}

const FONT = 'var(--font-oppo-sans), sans-serif';
const TEAL = '#4a9e8e';
const paperShadow =
  '0 4px 6px -1px rgba(0,0,0,0.06), 0 2px 4px -1px rgba(0,0,0,0.04)';
const draggingShadow = '0 20px 40px rgba(0,0,0,0.14)';

const COLLAPSE_THRESHOLD = 120; // 字符数超过此值才显示展开按钮

interface NoteContentProps {
  item: LiveNote;
  isExpanded: boolean;
  onToggle: () => void;
}

function NoteContent({ item, isExpanded, onToggle }: NoteContentProps) {
  const { content } = item;

  if (content.type === 'text') {
    const paragraphs = content.text.split('\n\n');
    const needsToggle = content.text.length > COLLAPSE_THRESHOLD || paragraphs.length > 3;
    const visibleParagraphs = needsToggle && !isExpanded ? paragraphs.slice(0, 3) : paragraphs;

    const paraStyle: React.CSSProperties = {
      fontSize: '12px',
      lineHeight: 1.85,
      color: '#374151',
      fontFamily: FONT,
      fontWeight: 400,
      wordBreak: 'break-word',
    };

    return (
      <div style={{ padding: '18px 16px 16px' }}>
        <div
          style={{
            height: '1.5px',
            background: 'rgba(0,0,0,0.07)',
            marginBottom: '10px',
            borderRadius: '1px',
          }}
        />

        {/* 文字区域：收起时限制高度并叠加渐变遮罩 */}
        <div style={{ position: 'relative' }}>
          <div
            style={
              needsToggle && !isExpanded
                ? { overflow: 'hidden', maxHeight: '112px' }
                : {}
            }
          >
            {visibleParagraphs.map((para, i) => (
              <p
                key={i}
                style={{ ...paraStyle, margin: i === 0 ? 0 : '0.75em 0 0' }}
              >
                {para}
              </p>
            ))}
          </div>

          {/* 渐变遮罩（仅收起态） */}
          {needsToggle && !isExpanded && (
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '36px',
                background: `linear-gradient(transparent, ${item.bg})`,
                pointerEvents: 'none',
              }}
            />
          )}
        </div>

        {/* 展开 / 收起按钮 */}
        {needsToggle && (
          <button
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => { e.stopPropagation(); onToggle(); }}
            style={{
              display: 'block',
              width: '100%',
              textAlign: 'center',
              fontSize: '10px',
              color: '#9ca3af',
              padding: '6px 0 0',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: FONT,
              letterSpacing: '0.08em',
            }}
          >
            {isExpanded ? '收起 ↑' : '展开 ↓'}
          </button>
        )}
      </div>
    );
  }

  if (content.type === 'snippet') {
    return (
      <div style={{ padding: '14px 16px 16px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '10px',
          }}
        >
          <div
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: 'rgba(74,158,142,0.35)',
            }}
          />
          <span
            style={{
              fontSize: '9px',
              color: TEAL,
              fontFamily: FONT,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              border: `1px solid rgba(74,158,142,0.3)`,
              padding: '2px 6px',
              borderRadius: '4px',
              background: 'rgba(255,255,255,0.5)',
            }}
          >
            {content.label ?? 'NOTE'}
          </span>
        </div>
        <p
          style={{
            fontSize: '12px',
            lineHeight: 1.8,
            color: '#1f2937',
            fontFamily: FONT,
            fontWeight: 400,
            margin: 0,
            whiteSpace: 'pre-line',
          }}
        >
          {content.text}
        </p>
      </div>
    );
  }

  if (content.type === 'quote') {
    return (
      <div style={{ padding: '18px 16px 16px' }}>
        <div
          style={{
            width: '2px',
            height: '20px',
            background: TEAL,
            opacity: 0.4,
            borderRadius: '1px',
            marginBottom: '10px',
          }}
        />
        <p
          style={{
            fontSize: '12px',
            lineHeight: 1.85,
            color: '#374151',
            fontFamily: FONT,
            fontStyle: 'italic',
            fontWeight: 400,
            margin: 0,
          }}
        >
          {content.text}
        </p>
        {content.caption && (
          <p
            style={{
              fontSize: '10px',
              color: '#9ca3af',
              fontFamily: FONT,
              textAlign: 'right',
              margin: '8px 0 0',
            }}
          >
            {content.caption}
          </p>
        )}
      </div>
    );
  }

  if (content.type === 'link') {
    return (
      <div style={{ padding: '16px' }}>
        <a
          href={content.url}
          target="_blank"
          rel="noreferrer"
          style={{
            fontSize: '11px',
            color: TEAL,
            fontFamily: FONT,
            textDecoration: 'underline',
            textUnderlineOffset: '2px',
            lineHeight: 1.7,
            wordBreak: 'break-all',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {content.text}
        </a>
      </div>
    );
  }

  return null;
}

export default function StickyNote({
  item,
  isSelected,
  isDragging,
  isSnapping,
  onPointerDown,
  onExpandedChange,
  zIndex,
}: StickyNoteProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const selectionRing = isSelected
    ? { outline: `1.5px solid rgba(74,158,142,0.45)`, outlineOffset: '3px' }
    : {};

  const shadow = isDragging ? draggingShadow : paperShadow;

  const baseStyle: React.CSSProperties = {
    position: 'absolute',
    left: item.x,
    top: item.y,
    width: item.width,
    height: item.height ?? undefined,
    transform: `rotate(${item.rotation}deg)`,
    backgroundColor: item.bg,
    cursor: isDragging ? 'grabbing' : 'grab',
    zIndex,
    touchAction: 'none',
    boxShadow: shadow,
    ...selectionRing,
    transition: isDragging
      ? 'none'
      : isSnapping
        ? 'left 0.45s cubic-bezier(0.34,1.56,0.64,1), top 0.45s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s ease'
        : 'box-shadow 0.2s ease',
    boxSizing: 'border-box',
    borderRadius: '2px',
  };

  const handleOpacity = isSelected ? 1 : 0;
  const handleTransition = 'opacity 0.15s ease';

  return (
    <div
      style={baseStyle}
      onPointerDown={(e) => onPointerDown(e, item.id)}
      data-item-id={item.id}
    >
      <NoteContent
        item={item}
        isExpanded={isExpanded}
        onToggle={() => {
          const next = !isExpanded;
          setIsExpanded(next);
          onExpandedChange(next, item.id);
        }}
      />

      {/* Rotate handle */}
      <div
        data-rotate-handle="true"
        style={{
          position: 'absolute',
          bottom: '-40px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '24px',
          height: '24px',
          background: 'white',
          border: `1.5px solid rgba(74,158,142,0.6)`,
          borderRadius: '50%',
          cursor: 'crosshair',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: handleOpacity,
          transition: handleTransition,
          zIndex: 10,
        }}
      >
        {/* Lucide rotate-cw — visually centered in 24×24 viewBox */}
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke={TEAL}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ pointerEvents: 'none', display: 'block' }}
        >
          <path d="M21 2v6h-6" />
          <path d="M21 13a9 9 0 1 1-3-7.7L21 8" />
        </svg>
      </div>

      {/* Context hint */}
      <div
        style={{
          position: 'absolute',
          bottom: '-62px',
          left: '50%',
          transform: 'translateX(-50%)',
          whiteSpace: 'nowrap',
          fontFamily: FONT,
          fontSize: '8px',
          letterSpacing: '0.12em',
          color: `rgba(74,158,142,0.75)`,
          pointerEvents: 'none',
          opacity: handleOpacity,
          transition: handleTransition,
        }}
      >
        DRAG · ↻ ROTATE
      </div>
    </div>
  );
}
