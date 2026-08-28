import React from 'react';
import { Film, Bookmark, Sparkles } from 'lucide-react';

interface HeaderProps {
  onOpenBookmarklet: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBookmarklet }) => {
  return (
    <header className="glass-panel" style={{ marginBottom: '24px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{
          width: '52px',
          height: '52px',
          borderRadius: '14px',
          background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 6px 20px rgba(99, 102, 241, 0.4)'
        }}>
          <Film size={28} color="#fff" />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, background: 'linear-gradient(to right, #fff, #cbd5e1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0 }}>
              MV Planner
            </h1>
            <span style={{
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(168, 85, 247, 0.25) 100%)',
              color: '#c084fc',
              border: '1px solid rgba(168, 85, 247, 0.4)',
              borderRadius: '20px',
              padding: '2px 10px',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.5px'
            }}>
              ver 1.2.1
            </span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
            Suno SRT歌詞 ➔ AI MV構成＆カット割りプロンプト自動生成システム
          </p>
        </div>
      </div>

      <button
        onClick={onOpenBookmarklet}
        className="btn btn-secondary"
        style={{ fontSize: '0.9rem', padding: '10px 18px' }}
      >
        <Bookmark size={16} color="#a855f7" />
        Suno SRT ブックマークレットを取得
      </button>
    </header>
  );
};
