import { LyricEntry } from './types';

/**
 * Format seconds to MM:SS or MM:SS.ms
 */
export function formatTimecode(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Parse time string (00:01:23,456 or 01:23.45 or 01:23) into total seconds
 */
export function parseTimeToSeconds(timeStr: string): number | null {
  const clean = timeStr.trim().replace(',', '.');
  
  // Format 00:01:23.456 or 01:23.456
  const parts = clean.split(':');
  if (parts.length === 3) {
    const hours = parseFloat(parts[0]);
    const mins = parseFloat(parts[1]);
    const secs = parseFloat(parts[2]);
    if (!isNaN(hours) && !isNaN(mins) && !isNaN(secs)) {
      return hours * 3600 + mins * 60 + secs;
    }
  } else if (parts.length === 2) {
    const mins = parseFloat(parts[0]);
    const secs = parseFloat(parts[1]);
    if (!isNaN(mins) && !isNaN(secs)) {
      return mins * 60 + secs;
    }
  }
  return null;
}

/**
 * Parses SRT or LRC text string into structured LyricEntry array.
 */
export function parseSrtOrLrc(rawText: string): { entries: LyricEntry[]; maxTimestamp: number } {
  if (!rawText || !rawText.trim()) {
    return { entries: [], maxTimestamp: 0 };
  }

  const entries: LyricEntry[] = [];
  let maxTimestamp = 0;

  const lines = rawText.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');

  // Try SRT parsing first
  // SRT pattern: 00:00:12,345 --> 00:00:15,678
  const srtTimeRegex = /^(\d{1,2}:\d{2}:\d{2}[,.]\d{1,3})\s*-->\s*(\d{1,2}:\d{2}:\d{2}[,.]\d{1,3})/;

  let isSrt = false;
  for (const line of lines) {
    if (srtTimeRegex.test(line.trim())) {
      isSrt = true;
      break;
    }
  }

  if (isSrt) {
    let currentStart = 0;
    let currentEnd = 0;
    let currentTextLines: string[] = [];
    let entryId = 1;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      const match = line.match(srtTimeRegex);

      if (match) {
        // Save previous if exists
        if (currentTextLines.length > 0) {
          const text = currentTextLines.join(' ').trim();
          if (text) {
            entries.push({
              id: entryId++,
              startTime: currentStart,
              endTime: currentEnd,
              text,
            });
            if (currentEnd > maxTimestamp) maxTimestamp = currentEnd;
          }
          currentTextLines = [];
        }

        const startSec = parseTimeToSeconds(match[1]);
        const endSec = parseTimeToSeconds(match[2]);

        currentStart = startSec ?? 0;
        currentEnd = endSec ?? currentStart + 3;
      } else if (/^\d+$/.test(line)) {
        // Line number in SRT, ignore
        continue;
      } else if (line.length > 0) {
        currentTextLines.push(line);
      }
    }

    // Flush last entry
    if (currentTextLines.length > 0) {
      const text = currentTextLines.join(' ').trim();
      if (text) {
        entries.push({
          id: entryId++,
          startTime: currentStart,
          endTime: currentEnd,
          text,
        });
        if (currentEnd > maxTimestamp) maxTimestamp = currentEnd;
      }
    }
  } else {
    // Try LRC or line-by-line parsing
    // LRC pattern: [00:12.34]Lyric text or [00:12:34] Lyric text
    const lrcRegex = /\[(\d{1,2}:\d{2}(?:[.:]\d{1,3})?)\](.*)/;
    let entryId = 1;

    const rawEntries: { time: number; text: string }[] = [];

    for (const line of lines) {
      const trimmed = line.trim();
      const match = trimmed.match(lrcRegex);

      if (match) {
        const sec = parseTimeToSeconds(match[1]);
        const text = match[2].trim();
        if (sec !== null && text) {
          rawEntries.push({ time: sec, text });
        }
      }
    }

    // Sort by timestamp
    rawEntries.sort((a, b) => a.time - b.time);

    for (let i = 0; i < rawEntries.length; i++) {
      const current = rawEntries[i];
      const nextTime = i < rawEntries.length - 1 ? rawEntries[i + 1].time : current.time + 3.5;
      const endTime = Math.max(current.time + 1, nextTime);

      entries.push({
        id: entryId++,
        startTime: current.time,
        endTime: endTime,
        text: current.text,
      });

      if (endTime > maxTimestamp) maxTimestamp = endTime;
    }
  }

  return { entries, maxTimestamp: Math.ceil(maxTimestamp) };
}
