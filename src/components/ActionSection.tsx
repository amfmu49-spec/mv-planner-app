import React from 'react';
import { Send, CheckCircle, Sparkles, Layers } from 'lucide-react';

interface ActionSectionProps {
  onComplete: () => void;
  totalCuts: number;
  clipDuration: number;
  totalDuration: number;
}

export const ActionSection: React.FC<ActionSectionProps> = ({
  onComplete,
  totalCuts,
  clipDuration,
  totalDuration,
}) => {
  return (
    <div
      className="glass-panel"
      style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.4)',
        textAlign: 'center',
        padding: '28px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.95rem', color: '#cbd5e1' }}>
          <Layers size={18} color="#a855f7" />
          全 <strong style={{ color: '#fff', fontSize: '1.1rem' }}>{totalCuts}</strong> カット分割
        </span>
        <span style={{ color: 'var(--border-color)' }}>|</span>
        <span style={{ fontSize: '0.95rem', color: '#cbd5e1' }}>
          1カット <strong style={{ color: '#fff' }}>{clipDuration}</strong> 秒
        </span>
        <span style={{ color: 'var(--border-color)' }}>|</span>
        <span style={{ fontSize: '0.95rem', color: '#cbd5e1' }}>
          総再生時間 <strong style={{ color: '#fff' }}>{totalDuration}</strong> 秒
        </span>
      </div>

      <button
        onClick={onComplete}
        className="btn btn-primary"
        style={{
          width: '100%',
          maxWidth: '560px',
          padding: '18px 32px',
          fontSize: '1.25rem',
          borderRadius: '14px',
          boxShadow: '0 8px 30px rgba(99, 102, 241, 0.5)',
          cursor: 'pointer',
        }}
      >
        <Sparkles size={24} />
        🚀 打ち込み完了 (プロンプトをクリップボードにコピー)
      </button>

      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
        ※ボタンをタップすると即座にタイムラインが計算され、チャッピー送信用プロンプトがクリップボードにコピーされます。
      </p>
    </div>
  );
};
