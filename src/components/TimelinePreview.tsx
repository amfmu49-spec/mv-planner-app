import React from 'react';
import { Film, Music2, Disc } from 'lucide-react';
import { CutSegment } from '../utils/types';

interface TimelinePreviewProps {
  cuts: CutSegment[];
}

export const TimelinePreview: React.FC<TimelinePreviewProps> = ({ cuts }) => {
  if (cuts.length === 0) return null;

  return (
    <div className="glass-panel">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h2 className="section-title" style={{ margin: 0 }}>
          <Film size={22} />
          カット割りタイムライン一覧 (全 {cuts.length} カット)
        </h2>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          ※1カットあたりの歌詞マッピング結果
        </span>
      </div>

      <div className="timeline-grid">
        {cuts.map((cut) => (
          <div key={cut.index} className="cut-card">
            <div className="cut-card-header">
              <span className="cut-number">Cut {cut.index.toString().padStart(2, '0')}</span>
              <span className="cut-timecode">
                {cut.startTimeFormatted} → {cut.endTimeFormatted}
              </span>
            </div>

            {cut.isInstrumental ? (
              <div className="cut-instrumental">
                <Disc size={14} className="spin-slow" />
                [間奏 / イントロ / 演出パート]
              </div>
            ) : (
              <div className="cut-lyric">
                <Music2 size={13} color="#6366f1" style={{ display: 'inline', marginRight: '6px' }} />
                {cut.lyrics.join(' / ')}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
