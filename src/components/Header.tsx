import React from 'react';
import { Film, Bookmark, Sparkles } from 'lucide-react';

interface HeaderProps {
  onOpenBookmarklet: () => void;
}

const baseUrl = (import.meta as any).env?.BASE_URL || '/';
const logoUrl = `${baseUrl}logo.jpg`;

export const Header: React.FC<HeaderProps> = ({ onOpenBookmarklet }) => {
  return (
    <header
      className="glass-panel"
      style={{
        marginBottom: '24px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
        position: 'relative',
      }}
    >
      {/* Top Badge */}
      <div style={{ position: 'absolute', top: '16px', right: '20px' }}>
        <span
          style={{
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(168, 85, 247, 0.25) 100%)',
            color: '#c084fc',
            border: '1px solid rgba(168, 85, 247, 0.4)',
            borderRadius: '20px',
            padding: '4px 12px',
            fontSize: '0.78rem',
            fontWeight: 700,
            letterSpacing: '0.5px',
          }}
        >
          ver 1.2.4
        </span>
      </div>

      {/* Hero Full-Width Logo Banner */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '6px 0' }}>
        <img
          src={logoUrl}
          alt="MV-Planner"
          style={{
            width: '100%',
            maxWidth: '780px',
            maxHeight: '180px',
            height: 'auto',
            objectFit: 'contain',
            borderRadius: '12px',
            display: 'block',
            filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.5))',
          }}
        />
      </div>

      {/* Bookmarklet Button BELOW Logo */}
      <button
        onClick={onOpenBookmarklet}
        className="btn btn-secondary"
        style={{ fontSize: '0.92rem', padding: '10px 22px', borderRadius: '12px', cursor: 'pointer' }}
      >
        <Bookmark size={18} color="#a855f7" />
        Suno SRT ブックマークレットを取得
      </button>
    </header>
  );
};
