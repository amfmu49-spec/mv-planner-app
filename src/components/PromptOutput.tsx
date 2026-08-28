import React, { useState } from 'react';
import { Bot, Copy, Check, ExternalLink } from 'lucide-react';

interface PromptOutputProps {
  promptText: string;
}

export const PromptOutput: React.FC<PromptOutputProps> = ({ promptText }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(promptText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenChatGPT = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = 'chatgpt://';
    const timer = setTimeout(() => {
      window.open('https://chatgpt.com/', '_blank');
    }, 1200);

    const onBlur = () => {
      clearTimeout(timer);
      window.removeEventListener('blur', onBlur);
    };
    window.addEventListener('blur', onBlur);
  };

  return (
    <div className="glass-panel">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
        <h2 className="section-title" style={{ margin: 0 }}>
          <Bot size={22} color="#a855f7" />
          チャッピー (ChatGPT) 送信用プロンプト
        </h2>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button className="btn btn-secondary" onClick={handleCopy} style={{ padding: '8px 16px', fontSize: '0.88rem' }}>
            {copied ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
            {copied ? 'コピーしました！' : '再コピー'}
          </button>

          <a
            href="chatgpt://"
            onClick={handleOpenChatGPT}
            className="btn btn-primary"
            style={{ padding: '8px 16px', fontSize: '0.88rem', textDecoration: 'none' }}
          >
            📱 ChatGPTアプリを開く <ExternalLink size={14} />
          </a>
        </div>
      </div>

      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
        下のテキストボックスの内容がクリップボードに設定されます。ChatGPT / Claude 等のチャット欄にそのままペースト（Ctrl+V）して送信してください。
      </p>

      <textarea
        readOnly
        className="textarea-text"
        value={promptText}
        style={{ minHeight: '320px', fontSize: '0.82rem', background: '#0b1329' }}
      />

      <div style={{ marginTop: '10px', textAlign: 'right', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
        文字数: {promptText.length} 文字
      </div>
    </div>
  );
};
