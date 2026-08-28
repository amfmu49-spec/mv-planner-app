import React from 'react';
import { Film, Bookmark, Sparkles } from 'lucide-react';

interface HeaderProps {
  onOpenBookmarklet: () => void;
}

const logoUrl = `${import.meta.env.BASE_URL}logo.jpg`;

export const Header: React.FC<HeaderProps> = ({ onOpenBookmarklet }) => {
  return (
    <header className="glass-panel" style={{ marginBottom: '24px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <img
          src={logoUrl}
          alt="MV-Planner"
          style={{
            height: '46px',
            borderRadius: '8px',
            objectFit: 'contain',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        />
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
              ver 1.2.2
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
