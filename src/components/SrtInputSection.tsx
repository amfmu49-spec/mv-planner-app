import React from 'react';
import { FileText, Sparkles, Trash2, CheckCircle2 } from 'lucide-react';

interface SrtInputSectionProps {
  rawText: string;
  onChange: (val: string) => void;
  detectedCount: number;
  maxTimestamp: number;
}

const SAMPLE_SRT = `1
00:00:04,500 --> 00:00:08,200
静かな夜の街角で

2
00:00:08,500 --> 00:00:12,100
流れるネオンと通り雨

3
00:00:12,500 --> 00:00:17,000
誰も知らない物語が今ここで始まる

4
00:00:17,500 --> 00:00:22,800
ガラス越しに映る影　静かに揺れて消えてゆく

5
00:00:23,500 --> 00:00:28,000
高く遠く響くあのフレーズ

6
00:00:28,500 --> 00:00:34,000
光の海へ溶け出すグラデーション`;

export const SrtInputSection: React.FC<SrtInputSectionProps> = ({
  rawText,
  onChange,
  detectedCount,
  maxTimestamp,
}) => {
  const handleLoadSample = () => {
    onChange(SAMPLE_SRT);
  };

  const handleClear = () => {
    onChange('');
  };

  return (
    <div className="glass-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <h2 className="section-title" style={{ margin: 0 }}>
          <FileText size={22} />
          SRT / LRC 歌詞データ入力
        </h2>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn-chip" onClick={handleLoadSample}>
            <Sparkles size={14} color="#ec4899" />
            サンプルを入れる
          </button>
          {rawText && (
            <button className="btn-chip" onClick={handleClear} style={{ color: '#ff6b6b' }}>
              <Trash2 size={14} />
              消去
            </button>
          )}
        </div>
      </div>

      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
        Sunoのブックマークレット等で抽出したSRTデータ（または.lrc形式）をそのまま下にペーストしてください。
      </p>

      <textarea
        className="textarea-text"
        placeholder={`1\n00:00:05,000 --> 00:00:08,000\n歌詞テキスト\n\nまたは [00:05.00] 歌詞テキスト をここにペースト...`}
        value={rawText}
        onChange={(e) => onChange(e.target.value)}
        style={{ flex: 1, minHeight: '260px' }}
      />

      <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
        {detectedCount > 0 ? (
          <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
            <CheckCircle2 size={16} />
            歌詞 {detectedCount} 件を検出 (最終タイム: {maxTimestamp}秒 / {Math.floor(maxTimestamp / 60)}分{maxTimestamp % 60}秒)
          </span>
        ) : (
          <span style={{ color: 'var(--text-dim)' }}>※未入力の場合は間奏中心のタイムラインが計算されます</span>
        )}
      </div>
    </div>
  );
};
