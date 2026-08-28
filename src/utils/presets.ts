import { MVStylePreset, VideoAIPreset } from './types';

export const MV_STYLE_PRESETS: MVStylePreset[] = [
  {
    id: 'cyberpunk-anime',
    name: '近未来サイバーパンク・アニメ',
    emoji: '🌃',
    description: 'ネオンの街並み、サイバー感、スタイリッシュな2D/3Dアニメーション風',
    promptGuidance: 'サイバーパンクなネオン街、未来都市、ホログラム演出、エッジの効いたライティング、アニメーション風質感',
  },
  {
    id: 'cinematic-realism',
    name: '実写シネマティック（映画風）',
    emoji: '🎬',
    description: 'シネマレンズのぼけ感、重厚なドラマ表現、実写質感',
    promptGuidance: '35mmフィルム質感、美しいボケ感（Bokeh）、シネマティックライティング、シリアスで深みのある実写映像',
  },
  {
    id: 'retro-80s-citypop',
    name: 'レトロ80s・シティポップ',
    emoji: '📼',
    description: 'エモいVHSノイズ、夕暮れの街並み、ノスタルジックな80年代グラフィック',
    promptGuidance: '80年代レトロ、セル画アニメ風、VHSテープの微細なノイズ感、夕暮れのノスタルジックな配色、シティポップの世界観',
  },
  {
    id: 'emotional-vocaloid',
    name: 'エモーショナル・ボカロMV風',
    emoji: '✨',
    description: '幻想的な光、疾走感のあるダイナミックなアングル、感情揺さぶる演出',
    promptGuidance: 'ボカロMV特有のドラマチックな構図、舞い散る光の粒子、感情の高まりを表現する疾走感あるカメラワーク',
  },
  {
    id: 'dark-fantasy',
    name: 'ダークファンタジー / ゴシック',
    emoji: '🥀',
    description: '重厚で幻想的な世界観、古城、月光、神秘的な演出',
    promptGuidance: 'ダークファンタジー、ゴシック様式の背景、月光と陰影の対比、神秘的で少し切ない雰囲気',
  },
  {
    id: 'pastel-kawaii',
    name: 'パステル・ポップ・Kawaii',
    emoji: '🎀',
    description: 'カラフルでかわいい世界観、ポップなモーション、キュートなキャラクター',
    promptGuidance: 'パステルカラー、カラフルポップ、夢かわいいイラスト風質感、柔らかい光と弾むようなグラフィック演出',
  },
  {
    id: 'surreal-art',
    name: 'シュール・アート・グラフィック',
    emoji: '🎨',
    description: '抽象的なビジュアル、コラージュ感、独創的な幾何学模様と表現',
    promptGuidance: '抽象アート、グラフィックデザイン風カット割り、鮮やかな対比色、シュールで独創的なイメージ転換',
  },
];

export const VIDEO_AI_PRESETS: VideoAIPreset[] = [
  {
    id: 'kling-ai',
    name: 'Kling AI (可霊)',
    recommendedDuration: 5,
    promptStyle: '詳細な英文プロンプト + カメラワーク指定 (e.g. camera panning left, cinematic lighting)',
  },
  {
    id: 'runway-gen3',
    name: 'Runway Gen-3 Alpha',
    recommendedDuration: 5,
    promptStyle: 'Motion Prompt形式 [Subject] [Movement] [Camera Movement] [Style]',
  },
  {
    id: 'luma-dream-machine',
    name: 'Luma Dream Machine',
    recommendedDuration: 5,
    promptStyle: '自然言語での動き・ライティング・雰囲気を重視した英文テキスト',
  },
  {
    id: 'sora',
    name: 'OpenAI Sora',
    recommendedDuration: 5,
    promptStyle: '物理描写と世界観を緻密に説明する高度なプロンプト',
  },
  {
    id: 'hailuo-minimax',
    name: 'Hailuo AI (MiniMax)',
    recommendedDuration: 6,
    promptStyle: '映画的なシーン説明とカメラアクションのダイナミックな指定',
  },
];
