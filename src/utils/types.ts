export interface LyricEntry {
  id: number;
  startTime: number; // in seconds
  endTime: number;   // in seconds
  text: string;
}

export interface CutSegment {
  index: number;         // 1-based index (Cut 01, Cut 02...)
  startTime: number;     // in seconds
  endTime: number;       // in seconds
  startTimeFormatted: string; // e.g. "00:05"
  endTimeFormatted: string;   // e.g. "00:10"
  lyrics: string[];      // Array of matched lyric strings for this cut
  isInstrumental: boolean; // True if no lyrics present in this cut
}

export type MVStylePresetId = 
  | 'cyberpunk-anime' 
  | 'cinematic-realism' 
  | 'retro-80s-citypop' 
  | 'emotional-vocaloid' 
  | 'dark-fantasy' 
  | 'gothic-dark' 
  | 'pastel-kawaii' 
  | 'surreal-art';

export interface MVStylePreset {
  id: MVStylePresetId;
  name: string;
  emoji: string;
  description: string;
  promptGuidance: string;
}

export type VideoAIPresetId = 
  | 'kling-ai' 
  | 'runway-gen3' 
  | 'luma-dream-machine' 
  | 'sora' 
  | 'hailuo-minimax' 
  | 'pika-labs';

export interface VideoAIPreset {
  id: VideoAIPresetId;
  name: string;
  recommendedDuration: number;
  promptStyle: string;
}

export interface MVPlannerSettings {
  clipDuration: number;     // Seconds per generated video clip (default: 5)
  totalSongDuration: number;// Total song duration in seconds (default: 180 or auto-calculated)
  autoSongDuration: boolean;// Whether duration was auto-calculated from SRT
  songTitle: string;        // Optional song title
  artistName: string;       // Optional artist name
  mvStyle: MVStylePresetId;  // Visual theme / concept
  videoAI: VideoAIPresetId;  // Target AI video model
  customConceptNote: string;// Extra instructions for Chappy
}
