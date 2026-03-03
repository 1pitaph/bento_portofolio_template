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

  // ── snippet ───────────────────────────────────────────────────────────
  {
    id: 'note-6',
    x: 360,
    y: 24,
    rotation: -1,
    width: 200,
    bg: '#EFF6FF',
    content: {
      type: 'snippet',
      label: 'TODO',
      text: '城市建筑wiki app\n1.按照类型、城市、设计师等多个角度分类，并在地图上显示位置\n2.建筑详情可以由用户共创，为了确保ugc内容的一致性，会有一套标准化的流程与组件',
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
      text: 'l\'impossibilité d\'aimer dans notre temps.',
      caption: '— My Little Airport',
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
    id: 'note-7',
    x: 580,
    y: 16,
    rotation: -1,
    width: 280,
    bg: '#FFFBE0',
    content: {
      type: 'text',
      text: '表达欲越强烈，主体性越磅礴\n\n未经叙述的经历是混沌和混乱的。是叙事对它们进行了筛选、排序和诠释，将"发生了什么"变成"这对我意味着什么"，我们因此获得了内在的连续性和完整感。\n\n这就是为什么深度交谈常常给我们带来高潮般的快感，因为我们在他者确认的目光中看到自我最辽阔的边界。那个惯常的、狭小的我，在对话中被更复杂、更丰富、更互联的我们所取代，我们体验到从自身局限中解放出来的、无与伦比的自由与狂喜。\n\n表达越频繁，主体性的边界越清晰。在词语落下的瞬间，我们第一次真正看到自己想法的模样。\n\n那些用词精准又高级的人，也是主体性无坚不摧的人。\n\n所以我们要大量的、频繁的表达自己，日记也好、deeptalk也好、写作也好甚至发呆也好，只要这样才能感受到我之所以为我的连续感...',
    },
  },

  // ── snippet ───────────────────────────────────────────────────────────
  {
    id: 'note-8',
    x: 580,
    y: 200,
    rotation: 2,
    width: 220,
    bg: '#EFF6FF',
    content: {
      type: 'snippet',
      label: 'TODO',
      text: 'langligo\n浏览器插件，采用渐进式学习的方式，插件会先将英文网页翻译成中文，然后根据用户情况将部分中文替换为英文，在使用过程中，通过算法以及单词难度等维度渐进式的增加英文的比重。',
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
