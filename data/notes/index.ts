/**
 * Sticky note content definitions.
 *
 * Add, remove, or edit entries here to control what appears on the board.
 * Each note has an initial position (x, y), rotation, width, background
 * color, and typed content. The board will preserve layout changes the
 * user makes at runtime, but always resets to these values on page load.
 *
 * ─── Note types ───────────────────────────────────────────────────────────
 *  'text'    — plain paragraph
 *  'snippet' — labeled badge + body text  (use `label` for the badge)
 *  'quote'   — italic quote               (use `caption` for attribution)
 *  'link'    — clickable URL              (use `url` for href, `text` for label)
 * ──────────────────────────────────────────────────────────────────────────
 */
import type { StickyNoteData } from '@/re/types';

export const notes: StickyNoteData[] = [
  // ── text ──────────────────────────────────────────────────────────────
  {
    id: 'note-1',
    x: 16,
    y: 16,
    rotation: -2,
    width: 280,
    bg: '#FFFBE0',
    content: {
      type: 'text',
      text: '过年期间和朋友聊天，有时会觉得自己是计划错了陷入一种停顿与空洞的人。\n\n当然，人是无法给自己定性的，我所说的自己，不具备对上述好友的客观视角。\n\n总之，当时那个时刻，我是个迷茫的人。\n\n比起我以为的，朋友会有安慰与理解，更多的是他什么安慰的话也没说，他只是说：\n\n"你可以休息，但你不能停。"\n\n"人，不能逃避苦难。"\n\n听到这两句话的一瞬间，我停顿了。我想，并非他不懂得我的痛苦。相反，我们彼此都清楚地知道大家的每一个选择与不易。\n\n是啊，我不能躲。\n\n某些时候的消沉，好像让我陷入了一种自我感动感慨的漩涡，但事实上，这没有用。\n\n这就像是精神麻药，短暂将人困在过去时光并非没有意义的假想里，以不停沉沦和自我缅怀，来减轻当下所该承受的力。\n\n可是，不能这样。这没有用。\n\n听了他的话，我竟然真的顿了一下。\n\n然后也缓缓地说；\n\n"是啊，人，不能逃避苦难。"\n\n"只能去选择一个，自己愿意承受的痛苦。"',
    },
  },

  // ── snippet ───────────────────────────────────────────────────────────
  {
    id: 'note-2',
    x: 196,
    y: 24,
    rotation: 3,
    width: 154,
    bg: '#EFF6FF',
    content: {
      type: 'snippet',
      label: 'TODO',
      text: '适合adhd的待办事项\n1. OKR、GTD\n2. 按时间记录服药感受\n3. ai筛选最优先的todo',
    },
  },

  // ── quote ─────────────────────────────────────────────────────────────
  {
    id: 'note-3',
    x: 80,
    y: 190,
    rotation: -1,
    width: 172,
    bg: '#F0FDF4',
    content: {
      type: 'quote',
      text: '设计不是让它看起来漂亮，而是让它用起来顺手。',
      caption: '— Dieter Rams',
    },
  },

  // ── text ──────────────────────────────────────────────────────────────
  {
    id: 'note-4',
    x: 20,
    y: 300,
    rotation: 2,
    width: 150,
    bg: '#FFF1F2',
    content: {
      type: 'text',
      text: 'If it\'s hard to learn, it\'s a valuable knowledge.',
    },
  },

  // ── text ──────────────────────────────────────────────────────────────
  {
    id: 'note-5',
    x: 360,
    y: 160,
    rotation: 1,
    width: 260,
    bg: '#F5F3FF',
    content: {
      type: 'text',
      text: '前段时间看了一部老电影，《Call Me By Your Name》，当我们谈论影视拍得「很有文学性」时，我们在谈论什么？\n\n我觉得这种气质在于营造了一种「基于现实又超于现实的疏离感」。比如现实里也会有大把同性恋谈恋爱，但影片塑造了一对青春美丽的少年，一个无所事事的夏天，湖水、弹琴、小镇，情感的细腻捕捉，慵懒的氛围衬托，加上恰到好处的音乐，就有一种虽然故事很稀疏平常，但有一种超于现实的虚幻和美感。',
    },
  },
];
