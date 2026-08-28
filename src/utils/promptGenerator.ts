import { MVPlannerSettings, CutSegment } from './types';
import { MV_STYLE_PRESETS } from './presets';

export function generateChappyPrompt(
  settings: MVPlannerSettings,
  cuts: CutSegment[]
): string {
  const styleObj = MV_STYLE_PRESETS.find((s) => s.id === settings.mvStyle) || MV_STYLE_PRESETS[0];

  const totalCuts = cuts.length;
  const songTitle = settings.songTitle ? `「${settings.songTitle}」` : '（未設定）';
  const artistName = settings.artistName ? ` / ${settings.artistName}` : '';

  // Build the cut timeline string
  const timelineText = cuts
    .map((c) => {
      const lyricText = c.isInstrumental
        ? '[🎵 間奏 / イントロ / 演出パート]'
        : `歌詞: 「${c.lyrics.join(' / ')}」`;
      return `- カット${c.index.toString().padStart(2, '0')} [${c.startTimeFormatted} -> ${c.endTimeFormatted}]: ${lyricText}`;
    })
    .join('\n');

  const customNote = settings.customConceptNote?.trim()
    ? `\n■ ユーザーからの追加要望・コンセプト補足:\n${settings.customConceptNote.trim()}\n`
    : '';

  const isThemeSpecified = settings.mvStyle && settings.mvStyle !== 'none';
  const themeSectionText = isThemeSpecified
    ? `・映像世界観 / テーマ: ${styleObj.name} (${styleObj.emoji})\n・世界観の方向性: ${styleObj.promptGuidance}`
    : `・映像世界観 / テーマ: 指定なし（歌詞のストーリーや楽曲の感情曲線・メロディに合わせてAIが最も映える世界観を演出提案）`;

  return `あなたは世界最高峰のMVディレクターであり、同時に各種動画生成AI（Kling AI, Runway Gen-3, Luma, MiniMax, Sora等）のプロンプトエンジニアです。
以下の楽曲構成・歌詞タイムライン（1カット＝${settings.clipDuration}秒単位）に基づき、クオリティが高く曲の世界観を引き立てるMVの全カット構成案と、動画生成AI用プロンプトを作成してください。

==================================================
🎵 楽曲・MV基本設定
==================================================
・楽曲タイトル: ${songTitle}${artistName}
・曲の総再生時間: ${settings.totalSongDuration}秒 (${Math.floor(settings.totalSongDuration / 60)}分${settings.totalSongDuration % 60}秒)
・1カットの動画生成秒数: ${settings.clipDuration}秒
・総カット数: 全${totalCuts}カット
${themeSectionText}
${customNote}
==================================================
📜 全${totalCuts}カットの歌詞タイムライン（${settings.clipDuration}秒刻み）
==================================================
${timelineText}

==================================================
📋 チャッピー（AI）への出力指示
==================================================
上記の全${totalCuts}カットについて、MV全体のストーリーテリングと盛り上がり（イントロ -> Aメロ -> Bメロ -> サビ -> 間奏 -> ラストサビ -> アウトロ）を意識した映像構成案を作成してください。

以下の5項目を含む【マークダウン表】および【カット毎のAIプロンプト一覧】を出力してください：

1. **カット番号 & タイムコード** (例: Cut 01 [00:00-00:05])
2. **該当歌詞 / 楽曲パート**
3. **映像演出・ストーリー展開** (シーンの具体的な状況、キャラクターの動き、背景、光や色の演出を日本語で詳細に説明)
4. **カメラワーク & アングル** (例: ズームイン、ローアングル固定、左から右への高速パン、ドローン空撮風)
5. **動画生成AI用プロンプト (英語)** (各種AI動画生成ツールにそのまま入力できる高品質な英文プロンプト。被写体、背景、ライティング、カメラ動作を含めて記述)

※MV全体の視覚的一貫性（カラーパレットや登場人物・モチーフの統一感）を考慮してご提案をお願いします！`;
}
