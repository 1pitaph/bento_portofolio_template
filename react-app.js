import React, { useState, useEffect, useRef, useCallback } from 'react';

const customStyles = {
  fontUi: {
    fontFamily: "'Inter', sans-serif",
    letterSpacing: '0.15em',
  },
  gridBg: {
    backgroundSize: '40px 40px',
    backgroundImage:
      'linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px)',
  },
  paperShadow: {
    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)',
  },
  polaroidShadow: {
    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -2px rgba(0,0,0,0.04)',
  },
  draggingShadow: {
    boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
  },
  writingVertical: {
    writingMode: 'vertical-rl',
    textOrientation: 'mixed',
  },
};

const initialItems = [
  {
    id: 'item-1',
    x: 80,
    y: 60,
    r: -2,
    w: 240,
    h: null,
    type: 'note',
    bg: '#FFFBE0',
    padding: 'p-6',
  },
  {
    id: 'item-2',
    x: 340,
    y: 270,
    r: 3,
    w: 260,
    h: null,
    type: 'snippet',
    bg: '#FFFDF2',
    padding: 'p-6',
  },
  {
    id: 'item-3',
    x: 520,
    y: 440,
    r: -1,
    w: 220,
    h: null,
    type: 'ferment',
    bg: '#FFF9E6',
    padding: 'p-5',
  },
  {
    id: 'item-4',
    x: 760,
    y: 80,
    r: 1,
    w: 380,
    h: 320,
    type: 'entry',
    bg: '#ffffff',
    padding: 'p-8',
  },
  {
    id: 'item-5',
    x: 160,
    y: 430,
    r: -3,
    w: 200,
    h: null,
    type: 'photo1',
    bg: '#ffffff',
    padding: 'p-3',
  },
  {
    id: 'item-6',
    x: 580,
    y: 90,
    r: 6,
    w: 180,
    h: null,
    type: 'photo2',
    bg: '#ffffff',
    padding: 'p-2.5',
  },
];

const MIN_SIZE = 120;

const BoardItem = ({
  item,
  isSelected,
  isDragging,
  onPointerDown,
  zIndex,
}) => {
  const selectedOutline = isSelected
    ? { outline: '1.5px solid rgba(74,158,142,0.5)', outlineOffset: '3px' }
    : {};

  const shadow = isDragging
    ? customStyles.draggingShadow
    : item.type === 'photo1' || item.type === 'photo2'
    ? customStyles.polaroidShadow
    : customStyles.paperShadow;

  const baseStyle = {
    position: 'absolute',
    left: item.x,
    top: item.y,
    width: item.w,
    height: item.h || undefined,
    transform: `rotate(${item.r}deg)`,
    backgroundColor: item.bg,
    cursor: isDragging ? 'grabbing' : 'grab',
    zIndex,
    touchAction: 'none',
    ...shadow,
    ...selectedOutline,
    transition: isDragging ? 'none' : 'box-shadow 0.2s ease',
    boxSizing: 'border-box',
    overflow: item.type === 'entry' ? 'hidden' : undefined,
  };

  const renderContent = () => {
    if (item.type === 'note') {
      return (
        <div style={{ padding: '24px' }}>
          <div style={{ height: '2px', background: 'rgba(0,0,0,0.08)', marginBottom: '12px' }} />
          <p style={{ fontSize: '14px', lineHeight: '1.8', color: '#374151', fontWeight: 400, fontFamily: "'Noto Serif JP', serif" }}>
            朝の光の中でコーヒーを淹れる時間、通り過ぎる風の冷たさを感じる瞬間——そこに、静かな豊かさがある。
          </p>
        </div>
      );
    }
    if (item.type === 'snippet') {
      return (
        <div style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#E5D5A0' }} />
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '4px',
              fontSize: '9px', color: '#4a9e8e',
              fontFamily: "'Inter', sans-serif", letterSpacing: '0.1em',
              border: '1px solid rgba(74,158,142,0.3)', padding: '2px 6px',
              borderRadius: '4px', background: 'rgba(255,255,255,0.5)', textTransform: 'uppercase'
            }}>
              <span style={{ fontSize: '10px' }}>✦</span> スニペット化
            </span>
          </div>
          <p style={{ fontSize: '14px', lineHeight: '1.8', color: '#1f2937', fontWeight: 400, fontFamily: "'Noto Serif JP', serif" }}>
            問いとは、答えを求めるためではなく、自分の内側を照らすための光かもしれない。
          </p>
        </div>
      );
    }
    if (item.type === 'ferment') {
      return (
        <div style={{ padding: '20px', position: 'relative' }}>
          <div style={{
            position: 'absolute', top: '-8px', left: '50%', transform: 'translateX(-50%)',
            width: '16px', height: '16px', borderRadius: '50%',
            background: 'rgba(192,176,144,0.4)', border: '1px solid rgba(255,255,255,0.6)',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }} />
          <p style={{ fontSize: '12px', lineHeight: '2', color: '#374151', marginTop: '8px', fontWeight: 400, fontFamily: "'Noto Serif JP', serif" }}>
            発酵は待つことを教えてくれる。焦らず、ただそこにいることの意味。
          </p>
        </div>
      );
    }
    if (item.type === 'entry') {
      return (
        <div style={{ padding: '32px', height: '100%', position: 'relative', overflow: 'hidden' }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginBottom: '24px', borderBottom: '1px solid #f3f4f6', paddingBottom: '8px'
          }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '9px', color: '#9ca3af', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Entry 2025.01.14</span>
            <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#4a9e8e' }} />
          </div>
          <p style={{ color: '#1f2937', lineHeight: '2', fontSize: '13px', fontFamily: "'Noto Serif JP', serif" }}>
            吾輩は猫である。名前はまだ無い。<br /><br />
            どこで生れたかとんと見当がつかぬ。何でも薄暗いじめじめした所でニャーニャー泣いていた事だけは記憶している。吾輩はここで始めて人間というものを見た。しかもあとで聞くとそれは書生という人間中で一番獰悪な種族であったそうだ。
          </p>
          <p style={{ color: '#1f2937', lineHeight: '2', fontSize: '13px', marginTop: '16px', opacity: 0.8, fontFamily: "'Noto Serif JP', serif" }}>
            この書生というのは時々我々を捕えて煮て食うという話である。しかしその当時は何という考もなかったから別段恐しいとも思わなかった。ただ彼の掌に載せられてスーと持ち上げられた時何だかフワフワした感じがあったばかりである。
          </p>
          <div style={{
            position: 'absolute', bottom: 0, left: 0, width: '100%', height: '96px',
            background: 'linear-gradient(to top, #ffffff, transparent)'
          }} />
        </div>
      );
    }
    if (item.type === 'photo1') {
      return (
        <div style={{ padding: '12px 12px 32px 12px' }}>
          <div style={{ width: '100%', aspectRatio: '1/1', background: '#f3f4f6', overflow: 'hidden', marginBottom: '8px', position: 'relative' }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to bottom right, #d4a883, #e8d5c4, #c7bca5)',
              opacity: 0.5
            }} />
            <div style={{
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
              width: '96px', height: '96px', borderRadius: '50%',
              background: '#ffecd1', filter: 'blur(24px)', opacity: 0.6
            }} />
          </div>
          <p style={{ textAlign: 'center', fontSize: '12px', color: '#9ca3af', fontFamily: "'Noto Serif JP', serif", fontStyle: 'italic', marginTop: '8px', transform: 'rotate(1deg)' }}>
            Morning light
          </p>
        </div>
      );
    }
    if (item.type === 'photo2') {
      return (
        <div style={{ padding: '10px 10px 24px 10px' }}>
          <div style={{ width: '100%', aspectRatio: '4/5', background: '#f3f4f6', overflow: 'hidden', marginBottom: '8px', position: 'relative' }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top left, #7c9a92, #a3b8b2, #cbdad7)',
              opacity: 0.4
            }} />
            <div style={{
              position: 'absolute', bottom: 0, right: 0, width: '100%', height: '50%',
              background: 'linear-gradient(to top, rgba(74,158,142,0.2), transparent)'
            }} />
          </div>
          <p style={{ textAlign: 'center', fontSize: '12px', color: '#9ca3af', fontFamily: "'Noto Serif JP', serif", fontStyle: 'italic', marginTop: '4px' }}>
            Rainy afternoon
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      style={baseStyle}
      onPointerDown={(e) => onPointerDown(e, item.id)}
      data-item-id={item.id}
    >
      {renderContent()}

      {/* Rotate handle */}
      <div
        data-rotate-handle="true"
        style={{
          position: 'absolute',
          bottom: '-28px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '24px',
          height: '24px',
          background: 'white',
          border: '1.5px solid rgba(74,158,142,0.6)',
          borderRadius: '50%',
          cursor: 'crosshair',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: isSelected ? 1 : 0,
          transition: 'opacity 0.15s ease',
          zIndex: 10,
        }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4a9e8e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ pointerEvents: 'none' }}>
          <polyline points="1 4 1 10 7 10" />
          <path d="M3.51 15a9 9 0 1 0 .49-3.51" />
        </svg>
      </div>

      {/* Resize handles */}
      {['se', 'sw', 'ne', 'nw'].map((dir) => {
        const pos = {};
        if (dir.includes('s')) pos.bottom = '-5px';
        if (dir.includes('n')) pos.top = '-5px';
        if (dir.includes('e')) pos.right = '-5px';
        if (dir.includes('w')) pos.left = '-5px';
        const cursors = { se: 'se-resize', sw: 'sw-resize', ne: 'ne-resize', nw: 'nw-resize' };
        return (
          <div
            key={dir}
            data-resize-handle={dir}
            style={{
              position: 'absolute',
              width: '10px',
              height: '10px',
              background: 'white',
              border: '1.5px solid rgba(74,158,142,0.6)',
              borderRadius: '2px',
              opacity: isSelected ? 1 : 0,
              transition: 'opacity 0.15s ease',
              zIndex: 10,
              cursor: cursors[dir],
              ...pos,
            }}
          />
        );
      })}

      {/* Context hint */}
      <div
        style={{
          position: 'absolute',
          bottom: '-44px',
          left: '50%',
          transform: 'translateX(-50%)',
          whiteSpace: 'nowrap',
          fontFamily: "'Inter', sans-serif",
          fontSize: '9px',
          letterSpacing: '0.12em',
          color: 'rgba(74,158,142,0.8)',
          pointerEvents: 'none',
          opacity: isSelected ? 1 : 0,
          transition: 'opacity 0.15s ease',
        }}
      >
        MOVE · ↻ ROTATE · ⌟ RESIZE
      </div>
    </div>
  );
};

const App = () => {
  const [items, setItems] = useState(initialItems);
  const [selectedId, setSelectedId] = useState(null);
  const [draggingId, setDraggingId] = useState(null);
  const [zMap, setZMap] = useState(() => {
    const m = {};
    initialItems.forEach((it, i) => { m[it.id] = 100 + i; });
    return m;
  });
  const [activeNav, setActiveNav] = useState('今週');
  const [hintVisible, setHintVisible] = useState(false);

  const zCounterRef = useRef(106);
  const canvasRef = useRef(null);

  const dragStateRef = useRef(null);
  const rotateStateRef = useRef(null);
  const resizeStateRef = useRef(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      * { box-sizing: border-box; }
      body { margin: 0; }
      ::-webkit-scrollbar { width: 0px; background: transparent; }
      @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400;500;600&family=Inter:wght@300;400;500&display=swap');
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const bringToFront = useCallback((id) => {
    const z = ++zCounterRef.current;
    setZMap((prev) => ({ ...prev, [id]: z }));
    return z;
  }, []);

  const handlePointerDown = useCallback((e, itemId) => {
    e.preventDefault();
    e.stopPropagation();

    const target = e.target;
    const isRotate = target.closest('[data-rotate-handle]');
    const isResize = target.closest('[data-resize-handle]');

    setSelectedId(itemId);
    bringToFront(itemId);

    const canvasRect = canvasRef.current.getBoundingClientRect();
    const item = items.find((it) => it.id === itemId);
    if (!item) return;

    if (isRotate) {
      const cx = item.x + item.w / 2;
      const cy = item.y + (item.h || 150) / 2;
      rotateStateRef.current = {
        itemId,
        cx, cy,
        startAngle: item.r,
        startPointerAngle: Math.atan2(
          e.clientY - canvasRect.top - cy,
          e.clientX - canvasRect.left - cx
        ) * 180 / Math.PI,
      };
      target.setPointerCapture(e.pointerId);
    } else if (isResize) {
      const dir = target.getAttribute('data-resize-handle');
      resizeStateRef.current = {
        itemId, dir,
        startW: item.w,
        startH: item.h || target.closest('[data-item-id]')?.offsetHeight || 150,
        startX: item.x,
        startY: item.y,
        pointerStartX: e.clientX - canvasRect.left,
        pointerStartY: e.clientY - canvasRect.top,
      };
      target.setPointerCapture(e.pointerId);
    } else {
      dragStateRef.current = {
        itemId,
        startX: item.x,
        startY: item.y,
        pointerStartX: e.clientX - canvasRect.left,
        pointerStartY: e.clientY - canvasRect.top,
      };
      setDraggingId(itemId);
      e.currentTarget.setPointerCapture(e.pointerId);
    }
  }, [items, bringToFront]);

  useEffect(() => {
    const handleMove = (e) => {
      if (!canvasRef.current) return;
      const canvasRect = canvasRef.current.getBoundingClientRect();

      if (dragStateRef.current) {
        const { itemId, startX, startY, pointerStartX, pointerStartY } = dragStateRef.current;
        const dx = (e.clientX - canvasRect.left) - pointerStartX;
        const dy = (e.clientY - canvasRect.top) - pointerStartY;
        setItems((prev) =>
          prev.map((it) => it.id === itemId ? { ...it, x: startX + dx, y: startY + dy } : it)
        );
      }

      if (rotateStateRef.current) {
        const { itemId, cx, cy, startAngle, startPointerAngle } = rotateStateRef.current;
        const mx = (e.clientX - canvasRect.left) - cx;
        const my = (e.clientY - canvasRect.top) - cy;
        const angle = Math.atan2(my, mx) * 180 / Math.PI;
        const delta = angle - startPointerAngle;
        const newR = Math.round((startAngle + delta) * 10) / 10;
        setItems((prev) =>
          prev.map((it) => it.id === itemId ? { ...it, r: newR } : it)
        );
      }

      if (resizeStateRef.current) {
        const { itemId, dir, startW, startH, startX, startY, pointerStartX, pointerStartY } = resizeStateRef.current;
        const rdx = (e.clientX - canvasRect.left) - pointerStartX;
        const rdy = (e.clientY - canvasRect.top) - pointerStartY;
        let newW = startW, newH = startH, newX = startX, newY = startY;

        if (dir === 'se') {
          newW = Math.max(MIN_SIZE, startW + rdx);
          newH = Math.max(MIN_SIZE, startH + rdy);
        } else if (dir === 'sw') {
          newW = Math.max(MIN_SIZE, startW - rdx);
          newH = Math.max(MIN_SIZE, startH + rdy);
          if (newW > MIN_SIZE) newX = startX + rdx;
        } else if (dir === 'ne') {
          newW = Math.max(MIN_SIZE, startW + rdx);
          newH = Math.max(MIN_SIZE, startH - rdy);
          if (newH > MIN_SIZE) newY = startY + rdy;
        } else if (dir === 'nw') {
          newW = Math.max(MIN_SIZE, startW - rdx);
          newH = Math.max(MIN_SIZE, startH - rdy);
          if (newW > MIN_SIZE) newX = startX + rdx;
          if (newH > MIN_SIZE) newY = startY + rdy;
        }

        setItems((prev) =>
          prev.map((it) => it.id === itemId ? { ...it, w: newW, h: newH, x: newX, y: newY } : it)
        );
      }
    };

    const handleUp = () => {
      if (dragStateRef.current) {
        setDraggingId(null);
        dragStateRef.current = null;
      }
      rotateStateRef.current = null;
      resizeStateRef.current = null;
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

  const navItems = ['今日', '今週', '今月', '半年', '今年'];

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        fontFamily: "'Noto Serif JP', serif",
        backgroundColor: '#F9F8F4',
        color: '#2D2D2D',
        userSelect: 'none',
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: '48px',
          height: '100%',
          borderRight: '1px solid rgba(0,0,0,0.05)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '24px 0',
          backgroundColor: '#F9F8F4',
          zIndex: 20,
        }}
      >
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '48px' }}>
            {['REF.04', '01', '02'].map((label) => (
              <span
                key={label}
                style={{
                  ...customStyles.writingVertical,
                  letterSpacing: '0.3em',
                  fontSize: '10px',
                  color: '#9ca3af',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.target.style.color = '#4b5563')}
                onMouseLeave={(e) => (e.target.style.color = '#9ca3af')}
              >
                {label}
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}>
            <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#d1d5db' }} />
            <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#d1d5db' }} />
          </div>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
        {/* Grid background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            ...customStyles.gridBg,
            opacity: 0.6,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {/* Header */}
        <header
          style={{
            height: '64px',
            borderBottom: '1px solid rgba(0,0,0,0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 32px',
            backgroundColor: 'rgba(249,248,244,0.8)',
            backdropFilter: 'blur(4px)',
            zIndex: 10,
            position: 'sticky',
            top: 0,
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '10px',
                textTransform: 'uppercase',
                color: '#6b7280',
                letterSpacing: '0.2em',
                margin: 0,
                fontWeight: 400,
              }}
            >
              Oryzae / Board
            </h1>
          </div>

          <nav style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            {navItems.map((label) => (
              <button
                key={label}
                onClick={() => setActiveNav(label)}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '10px',
                  color: activeNav === label ? '#1f2937' : '#9ca3af',
                  fontWeight: activeNav === label ? 700 : 400,
                  borderBottom: activeNav === label ? '1px solid #4a9e8e' : 'none',
                  paddingBottom: activeNav === label ? '2px' : '0',
                  textTransform: 'uppercase',
                  background: 'none',
                  border: 'none',
                  borderBottom: activeNav === label ? '1px solid #4a9e8e' : 'none',
                  cursor: 'pointer',
                  letterSpacing: '0.05em',
                  transition: 'color 0.2s',
                }}
              >
                {label}
              </button>
            ))}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '6px 12px', borderRadius: '999px',
                background: 'none', border: 'none', cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.05)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 256 256" fill="currentColor" style={{ color: '#9ca3af' }}>
                <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z" />
              </svg>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: '10px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>写真</span>
            </button>
            <button
              style={{
                width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: '50%', background: 'none', border: 'none', cursor: 'pointer',
                color: '#9ca3af', transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.05)'; e.currentTarget.style.color = '#4a9e8e'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#9ca3af'; }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 256 256" fill="currentColor">
                <path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C219.88,147.2,192.68,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z" />
              </svg>
            </button>
          </div>
        </header>

        {/* Canvas */}
        <div
          ref={canvasRef}
          style={{ flex: 1, position: 'relative', overflow: 'hidden', padding: '32px', zIndex: 0 }}
          onPointerDown={(e) => {
            if (e.target === canvasRef.current) {
              setSelectedId(null);
            }
          }}
        >
          {items.map((item) => (
            <BoardItem
              key={item.id}
              item={item}
              isSelected={selectedId === item.id}
              isDragging={draggingId === item.id}
              onPointerDown={handlePointerDown}
              zIndex={zMap[item.id] || 100}
            />
          ))}

          {/* Hidden items hint */}
          <div
            style={{
              position: 'absolute', bottom: '48px', right: '32px',
              opacity: hintVisible ? 1 : 0.4,
              transition: 'opacity 0.2s',
              cursor: 'pointer',
              zIndex: 50,
            }}
            onMouseEnter={() => setHintVisible(true)}
            onMouseLeave={() => setHintVisible(false)}
          >
            <div style={{
              border: '1px dashed #9ca3af', borderRadius: '4px',
              padding: '8px', display: 'flex', alignItems: 'center', gap: '8px',
              background: 'rgba(255,255,255,0.3)', backdropFilter: 'blur(4px)',
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 256 256" fill="currentColor" style={{ color: '#6b7280' }}>
                <path d="M228.44,53.34l-96-32a8,8,0,0,0-5,0l-96,32A8,8,0,0,0,24,60.94V132c0,45.52,31.78,84.69,76.6,102.6a8,8,0,0,0,6.08,0C152.22,216.69,184,177.52,184,132V93.59L88,143.23V156a8,8,0,0,0,16,0V152l126.83-65.6A8,8,0,0,0,228.44,53.34Z" />
              </svg>
              <span style={{ fontSize: '10px', fontFamily: "'Inter', sans-serif", color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                1件 非表示
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer
          style={{
            height: '40px',
            borderTop: '1px solid rgba(0,0,0,0.05)',
            backgroundColor: '#F9F8F4',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            zIndex: 20,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            {['Save', 'Board'].map((label) => (
              <div
                key={label}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  fontSize: '9px', color: '#9ca3af',
                  fontFamily: "'Inter', sans-serif",
                  textTransform: 'uppercase', letterSpacing: '0.1em',
                  cursor: 'pointer', transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#4b5563')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#9ca3af')}
              >
                {label === 'Save' && (
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#d1d5db' }} />
                )}
                {label}
              </div>
            ))}
          </div>

          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <div style={{ height: '2px', width: '64px', background: '#e5e7eb', borderRadius: '999px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '33%', background: '#4a9e8e' }} />
            </div>
          </div>

          <div>
            <span style={{ fontSize: '9px', color: '#9ca3af', fontFamily: "'Inter', sans-serif", textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              スニペット 3
              <span style={{ color: '#d1d5db', margin: '0 4px' }}>/</span>
              エントリ 1
              <span style={{ color: '#d1d5db', margin: '0 4px' }}>/</span>
              写真 2
            </span>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;