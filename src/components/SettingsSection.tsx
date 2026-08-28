import React from 'react';
import { Sliders, Clock, Video, Palette, Music } from 'lucide-react';
import { MVPlannerSettings, MVStylePresetId, VideoAIPresetId } from '../utils/types';
import { MV_STYLE_PRESETS, VIDEO_AI_PRESETS } from '../utils/presets';

interface SettingsSectionProps {
  settings: MVPlannerSettings;
  onChange: (updated: Partial<MVPlannerSettings>) => void;
}

export const SettingsSection: React.FC<SettingsSectionProps> = ({ settings, onChange }) => {
  return (
    <div className="glass-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '18px' }}>
      <h2 className="section-title" style={{ margin: 0 }}>
        <Sliders size={22} />
        動画生成パラメーター設定
      </h2>

      {/* Clip duration setting */}
      <div className="form-group">
        <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Clock size={16} color="#6366f1" />
          1回の動画生成時間 (1カットの長さ)
        </label>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
          {[4, 5, 6, 10].map((dur) => (
            <button
              key={dur}
              type="button"
              className={`btn-chip ${settings.clipDuration === dur ? 'active' : ''}`}
              onClick={() => onChange({ clipDuration: dur })}
            >
              {dur}秒 {dur === 5 && '(標準)'}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input
            type="number"
            min={1}
            max={30}
            className="input-text"
            value={settings.clipDuration}
            onChange={(e) => onChange({ clipDuration: Math.max(1, parseInt(e.target.value) || 5) })}
            style={{ width: '110px' }}
          />
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>秒/カット</span>
        </div>
      </div>

      {/* Song Duration Setting */}
      <div className="form-group">
        <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Music size={16} color="#ec4899" />
          曲の総再生時間 (全尺)
        </label>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
          {[60, 120, 180, 240].map((dur) => (
            <button
              key={dur}
              type="button"
              className={`btn-chip ${settings.totalSongDuration === dur ? 'active' : ''}`}
              onClick={() => onChange({ totalSongDuration: dur, autoSongDuration: false })}
            >
              {dur}秒 ({dur / 60}分)
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input
            type="number"
            min={10}
            max={900}
            className="input-text"
            value={settings.totalSongDuration}
            onChange={(e) =>
              onChange({
                totalSongDuration: Math.max(10, parseInt(e.target.value) || 180),
                autoSongDuration: false,
              })
            }
            style={{ width: '120px' }}
          />
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            秒 ({Math.floor(settings.totalSongDuration / 60)}分{settings.totalSongDuration % 60}秒)
          </span>
        </div>
      </div>

      {/* Style & Video AI grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
        <div className="form-group" style={{ margin: 0 }}>
          <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Palette size={16} color="#a855f7" />
            MVのテーマ・世界観
          </label>
          <select
            className="select-input"
            value={settings.mvStyle}
            onChange={(e) => onChange({ mvStyle: e.target.value as MVStylePresetId })}
          >
            {MV_STYLE_PRESETS.map((preset) => (
              <option key={preset.id} value={preset.id}>
                {preset.emoji} {preset.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group" style={{ margin: 0 }}>
          <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Video size={16} color="#10b981" />
            対象の動画生成AI
          </label>
          <select
            className="select-input"
            value={settings.videoAI}
            onChange={(e) => onChange({ videoAI: e.target.value as VideoAIPresetId })}
          >
            {VIDEO_AI_PRESETS.map((ai) => (
              <option key={ai.id} value={ai.id}>
                {ai.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Optional Concept Note */}
      <div className="form-group" style={{ margin: 0 }}>
        <label className="form-label">世界観の補足・チャッピーへの特記事項 (任意)</label>
        <input
          type="text"
          className="input-text"
          placeholder="例: 雨の降るサイバーパンク都市で、少女が一人で歩いている切ないストーリーにしてほしい"
          value={settings.customConceptNote}
          onChange={(e) => onChange({ customConceptNote: e.target.value })}
        />
      </div>
    </div>
  );
};
