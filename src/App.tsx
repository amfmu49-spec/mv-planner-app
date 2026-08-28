import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { BookmarkletModal } from './components/BookmarkletModal';
import { SrtInputSection } from './components/SrtInputSection';
import { SettingsSection } from './components/SettingsSection';
import { ActionSection } from './components/ActionSection';
import { TimelinePreview } from './components/TimelinePreview';
import { PromptOutput } from './components/PromptOutput';

import { MVPlannerSettings } from './utils/types';
import { parseSrtOrLrc } from './utils/srtParser';
import { calculateTimeline } from './utils/timelineCalculator';
import { generateChappyPrompt } from './utils/promptGenerator';
import { CheckCircle } from 'lucide-react';
import './App.css';

const DEFAULT_SAMPLE_SRT = `1
00:00:04,500 --> 00:00:08,200
静かな夜の街角で

2
00:00:08,500 --> 00:00:12,100
流れるネオンと通り雨

3
00:00:12,500 --> 00:00:17,000
誰も知らない物語が今ここで始まる

4
00:00:17,500 --> 00:00:22,800
ガラス越しに映る影　静かに揺れて消えてゆく

5
00:00:23,500 --> 00:00:28,000
高く遠く響くあのフレーズ

6
00:00:28,500 --> 00:00:34,000
光の海へ溶け出すグラデーション`;

export function App() {
  const [rawSrtText, setRawSrtText] = useState(DEFAULT_SAMPLE_SRT);
  const [isBookmarkletOpen, setIsBookmarkletOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [settings, setSettings] = useState<MVPlannerSettings>({
    clipDuration: 5,
    totalSongDuration: 180,
    autoSongDuration: true,
    songTitle: '',
    artistName: '',
    mvStyle: 'cyberpunk-anime',
    videoAI: 'kling-ai',
    customConceptNote: '',
  });

  // Parse SRT or LRC
  const parsedData = useMemo(() => {
    return parseSrtOrLrc(rawSrtText);
  }, [rawSrtText]);

  // Sync auto duration if enabled
  useEffect(() => {
    if (settings.autoSongDuration && parsedData.maxTimestamp > 0) {
      setSettings((prev) => ({
        ...prev,
        totalSongDuration: Math.max(30, parsedData.maxTimestamp + 5),
      }));
    }
  }, [parsedData.maxTimestamp, settings.autoSongDuration]);

  // Calculate cut segments
  const cuts = useMemo(() => {
    return calculateTimeline(settings.totalSongDuration, settings.clipDuration, parsedData.entries);
  }, [settings.totalSongDuration, settings.clipDuration, parsedData.entries]);

  // Generate prompt for Chappy
  const generatedPrompt = useMemo(() => {
    return generateChappyPrompt(settings, cuts);
  }, [settings, cuts]);

  // Primary action: Complete Entry & Copy to Clipboard
  const handleCompleteAction = async () => {
    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setToastMessage('📋 クリップボードにコピーしました！チャッピーに貼り付けてください');
    } catch (err) {
      console.error(err);
      setToastMessage('⚠️ クリップボードへの自動コピーに失敗しました。下のプロンプト欄から手動でコピーしてください。');
    }

    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleSettingsChange = (updated: Partial<MVPlannerSettings>) => {
    setSettings((prev) => ({ ...prev, ...updated }));
  };

  return (
    <div className="app-container">
      {/* Header */}
      <Header onOpenBookmarklet={() => setIsBookmarkletOpen(true)} />

      {/* Main Grid: Input & Settings */}
      <div className="grid-2col" style={{ marginBottom: '24px' }}>
        <SrtInputSection
          rawText={rawSrtText}
          onChange={setRawSrtText}
          detectedCount={parsedData.entries.length}
          maxTimestamp={parsedData.maxTimestamp}
        />
        <SettingsSection settings={settings} onChange={handleSettingsChange} />
      </div>

      {/* Primary Action Button Bar */}
      <div style={{ marginBottom: '32px' }}>
        <ActionSection
          onComplete={handleCompleteAction}
          totalCuts={cuts.length}
          clipDuration={settings.clipDuration}
          totalDuration={settings.totalSongDuration}
        />
      </div>

      {/* Output & Timeline Visualizer */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <PromptOutput promptText={generatedPrompt} />
        <TimelinePreview cuts={cuts} />
      </div>

      {/* Toast Popup Notification */}
      {toastMessage && (
        <div className="toast-notification">
          <CheckCircle size={24} />
          {toastMessage}
        </div>
      )}

      {/* Bookmarklet Instruction Modal */}
      <BookmarkletModal
        isOpen={isBookmarkletOpen}
        onClose={() => setIsBookmarkletOpen(false)}
      />
    </div>
  );
}

export default App;
