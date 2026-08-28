import { LyricEntry, CutSegment } from './types';
import { formatTimecode } from './srtParser';

/**
 * Calculates cut timeline by dividing total duration into fixed clip lengths (e.g. 5 seconds)
 * and mapping timestamped lyrics to each cut.
 */
export function calculateTimeline(
  totalDuration: number,
  clipDuration: number,
  lyrics: LyricEntry[]
): CutSegment[] {
  if (clipDuration <= 0) clipDuration = 5;
  if (totalDuration <= 0) totalDuration = 180;

  const numCuts = Math.ceil(totalDuration / clipDuration);
  const segments: CutSegment[] = [];

  for (let i = 0; i < numCuts; i++) {
    const startTime = i * clipDuration;
    const endTime = Math.min((i + 1) * clipDuration, totalDuration);

    // Find lyrics that overlap with this cut window [startTime, endTime]
    // Overlap condition: lyric.startTime < endTime AND lyric.endTime > startTime
    const matchedLyrics = lyrics.filter((lyric) => {
      // If lyrics have zero duration (e.g. point timestamp in LRC), check if lyric.startTime falls within [startTime, endTime)
      if (lyric.endTime <= lyric.startTime) {
        return lyric.startTime >= startTime && lyric.startTime < endTime;
      }
      return lyric.startTime < endTime && lyric.endTime > startTime;
    });

    const lyricTexts = matchedLyrics.map((l) => l.text);
    const isInstrumental = lyricTexts.length === 0;

    segments.push({
      index: i + 1,
      startTime,
      endTime,
      startTimeFormatted: formatTimecode(startTime),
      endTimeFormatted: formatTimecode(endTime),
      lyrics: lyricTexts,
      isInstrumental,
    });
  }

  return segments;
}
