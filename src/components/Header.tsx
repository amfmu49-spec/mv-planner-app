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
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, background: 'linear-gradient(to right, #fff, #cbd5e1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            MV Director Assistant
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
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
