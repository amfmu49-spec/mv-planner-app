import React from 'react';
import { Sliders, Clock, Palette, Music } from 'lucide-react';
import { MVPlannerSettings, MVStylePresetId } from '../utils/types';
import { MV_STYLE_PRESETS } from '../utils/presets';

interface SettingsSectionProps {
  settings: MVPlannerSettings;
  onChange: (updated: Partial<MVPlannerSettings>) => void;
}

export const SettingsSection: React.FC<SettingsSectionProps> = ({ settings, onChange }) => {
  const currentMinutes = Math.floor(settings.totalSongDuration / 60);
  const currentSeconds = settings.totalSongDuration % 60;

  const handleMinutesChange = (m: number) => {
    const validMinutes = Math.max(0, m);
    const newTotal = validMinutes * 60 + currentSeconds;
    onChange({ totalSongDuration: Math.max(5, newTotal), autoSongDuration: false });
  };

  const handleSecondsChange = (s: number) => {
    const validSeconds = Math.max(0, Math.min(59, s));
    const newTotal = currentMinutes * 60 + validSeconds;
    onChange({ totalSongDuration: Math.max(5, newTotal), autoSongDuration: false });
  };

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
        <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
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

      {/* Song Duration Setting (Minutes and Seconds) */}
      <div className="form-group">
        <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Music size={16} color="#ec4899" />
          曲の総再生時間 (全尺)
        </label>

        {/* Minutes and Seconds Input Fields */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <input
              type="number"
              min={0}
              max={60}
              className="input-text"
              value={currentMinutes}
              onChange={(e) => handleMinutesChange(parseInt(e.target.value) || 0)}
              style={{ width: '80px', textAlign: 'center' }}
            />
            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff' }}>分</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <input
              type="number"
              min={0}
              max={59}
              className="input-text"
              value={currentSeconds}
              onChange={(e) => handleSecondsChange(parseInt(e.target.value) || 0)}
              style={{ width: '80px', textAlign: 'center' }}
            />
            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff' }}>秒</span>
          </div>

          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginLeft: '6px' }}>
            (合計 {settings.totalSongDuration}秒)
          </span>
        </div>
      </div>

      {/* Style Preset Selector (Full Width) */}
      <div className="form-group" style={{ margin: 0 }}>
        <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Palette size={16} color="#a855f7" />
          MVのテーマ・世界観 (任意)
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
