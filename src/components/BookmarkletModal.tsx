import React, { useState } from 'react';
import { X, Copy, Check, Bookmark, HelpCircle } from 'lucide-react';
import { getBookmarkletCode } from '../utils/bookmarklet';

interface BookmarkletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookmarkletModal: React.FC<BookmarkletModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const bookmarkletCode = getBookmarkletCode();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(bookmarkletCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.75)',
      backdropFilter: 'blur(8px)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '640px', background: '#0f172a', border: '1px solid rgba(99,102,241,0.3)', padding: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Bookmark color="#a855f7" size={24} />
            Suno SRT抽出ブックマークレット
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={24} />
          </button>
        </div>

        <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '16px', borderRadius: '12px', marginBottom: '20px', fontSize: '0.9rem', border: '1px solid rgba(255,255,255,0.06)' }}>
          <h4 style={{ color: '#fff', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <HelpCircle size={16} color="#6366f1" /> 使い方ステップ
          </h4>
          <ol style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px', color: 'var(--text-muted)' }}>
            <li>下の「ブックマークレットコードをコピー」ボタンを押します。</li>
            <li>ブラウザのブックマークバーに新規登録し、URL欄にコピーしたコードを貼り付けます。</li>
            <li>Sunoの曲詳細ページ（<code style={{ color: '#ec4899' }}>suno.com/song/...</code>）でブックマークを実行すると、即座にSRTがクリップボードにコピーされます！</li>
          </ol>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label className="form-label">ブックマークレットJavaScriptコード</label>
          <textarea
            readOnly
            className="textarea-text"
            style={{ height: '100px', fontSize: '0.8rem', opacity: 0.8 }}
            value={bookmarkletCode}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button className="btn btn-secondary" onClick={onClose}>
            閉じる
          </button>
          <button className="btn btn-primary" onClick={handleCopy}>
            {copied ? <Check size={18} /> : <Copy size={18} />}
            {copied ? 'コピーしました！' : 'ブックマークレットコードをコピー'}
          </button>
        </div>
      </div>
    </div>
  );
};
