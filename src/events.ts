import type {I18N} from './i18n';

type EEvent = (typeof events)[number];
export const events = [
  'Sheikah Slate Get',
  'Out Of SoR',
  'Head For The Point On Your SS',
  'First Divine Beast Introduction',
  'All Divine Beasts Completion',
  'Impa',
  'All 13 Memories',
  'Lomei Labyrinth Island Introduction',
  'South Lomei Labyrinth Introduction',
  'North Lomei Labyrinth Introduction',
  'Thyphlo Ruins Introduction',
  'Eventide Island Introduction',
  'Eventide Island Completion',
  'All Shrines Completion',
  '(EX) Trial Of The Sword Invitation',
  '(EX) Naboris Re-Entry Introduction',
  '(EX) Medoh Re-Entry Introduction',
  '(EX) Ruta Re-Entry Introduction',
  '(EX) Rudania Re-Entry Introduction',
  "Ta'loh Naeg",
  'Thundra Plateau Completion',
  '(EX) Introduction',
  '(EX) Obtaining The One Hit Obliterator',
  '(EX) One Hit Obliterator Completion',
  '(EX) Trial Of The Sword Completion',
  '(EX) Single Shrine Completion',
  '(EX) Vah Naboris Kass Song',
  '(EX) Vah Medoh Kass Song',
  '(EX) Vah Ruta Kass Song',
  '(EX) Vah Rudania Kass Song',
  '(EX) All Champion Songs',
  '(EX) SoR Revisit Instructions',
  '(EX) Final Trial Introduction',
  '(EX) Final Trial Completion',
  '(EX) Maz Koshia Battle Completion',
  "(EX) The Champion's Ballad",
] as const;

type TEventNameMap = {[event in EEvent]: string};
const eventNameDefault =
  Object.fromEntries(events.map(e => [e, e])) as TEventNameMap;
export const i18nEventNames: I18N<TEventNameMap> = {
  'en-US': {
    ...eventNameDefault,
    // 0:10
    'Sheikah Slate Get': 'Sheikah Slate Get: "That is a Sheikah Slate."',
    // 0:27
    'Out Of SoR': 'Out of SoR (without clipping): "Hold the Sheikah Slate up to the pedstal.""',
    // 12:05
    'Head For The Point On Your SS': '"Head for the point marked on the map in your Sheikah Slate."',
    // 1:06
    'First Divine Beast Introduction': 'First Divine Beast Introduction (without meeting Impa): "That Divine Beast was taken over by Ganon 100 years ago"',
    // 1:46
    'All Divine Beasts Completion': 'All Divine Beasts Completion: "Thanks to you, all of the Divine Beasts have returned to us and the spirits of the Champions are free."',
    // 12:17
    'Impa': 'Impa: "...So you\'re finally awake."',
    // 12:57
    'All 13 Memories': 'All 13 Memories: "You have recovered all of your memories of us from 100 years ago..."',
  },
  'ja-JP': {
    ...eventNameDefault,
    'Sheikah Slate Get': 'シーカーストーン入手「それはシーカーストーン…」',
    'Out Of SoR': '壁抜けせずに回生の祠を出る時「シーカーストーンをかざすのです…」',
    'Head For The Point On Your SS': '「シーカーストーンのマップに示された場所へ向かうのです…」',
    'First Divine Beast Introduction': 'インパに会わずにルッタ以外の神獣エリアに行った時「あれが今から100年前ガノンに奪われてしまった神獣です…」',
    'All Divine Beasts Completion': '四神獣クリア直後「ありがとう…貴方のおかげで全ての神獣と英傑達の魂が解放されました」',
    'Impa': 'インパ「…やっと目覚めおったか」',
    'All 13 Memories': '全ての記憶(13個)を取り戻した時「今 貴方は100年前の私との想い出を…そのすべてを取り戻してくれました…」',
  },
};

type Preset = {[event in (typeof events)[number]]?: boolean};
// type Preset = (typeof events)[number][];
export const presets: {[name: string]: Preset} = Object.fromEntries([
  ['Any%', [
    'Sheikah Slate Get',
    'Head For The Point On Your SS',
  ]],
  ['All Dungeons', [
    'Sheikah Slate Get',
    'Head For The Point On Your SS',
    'First Divine Beast Introduction',
    'All Divine Beasts Completion',
  ]],
  ['All Main Quest', [
    'Sheikah Slate Get',
    'Head For The Point On Your SS',
    'All Divine Beasts Completion',
    'Impa',
    'All 13 Memories',
  ]],
  ['Dog%', [
    'Sheikah Slate Get',
    'Head For The Point On Your SS',
    'First Divine Beast Introduction',
  ]],
].map(([k, sels]) => [k, Object.fromEntries(events.map(event => [
  event, sels.includes(event),
]))]));
