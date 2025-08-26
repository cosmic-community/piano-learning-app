import type { PianoKey } from '@/types';

// Piano key configuration
export const PIANO_KEYS: PianoKey[] = [
  // C4 Octave (Middle C)
  { note: 'C', octave: 4, keyType: 'white', frequency: 261.63, keyName: 'C4' },
  { note: 'C#', octave: 4, keyType: 'black', frequency: 277.18, keyName: 'C#4' },
  { note: 'D', octave: 4, keyType: 'white', frequency: 293.66, keyName: 'D4' },
  { note: 'D#', octave: 4, keyType: 'black', frequency: 311.13, keyName: 'D#4' },
  { note: 'E', octave: 4, keyType: 'white', frequency: 329.63, keyName: 'E4' },
  { note: 'F', octave: 4, keyType: 'white', frequency: 349.23, keyName: 'F4' },
  { note: 'F#', octave: 4, keyType: 'black', frequency: 369.99, keyName: 'F#4' },
  { note: 'G', octave: 4, keyType: 'white', frequency: 392.00, keyName: 'G4' },
  { note: 'G#', octave: 4, keyType: 'black', frequency: 415.30, keyName: 'G#4' },
  { note: 'A', octave: 4, keyType: 'white', frequency: 440.00, keyName: 'A4' },
  { note: 'A#', octave: 4, keyType: 'black', frequency: 466.16, keyName: 'A#4' },
  { note: 'B', octave: 4, keyType: 'white', frequency: 493.88, keyName: 'B4' },
  
  // C5 Octave
  { note: 'C', octave: 5, keyType: 'white', frequency: 523.25, keyName: 'C5' },
  { note: 'C#', octave: 5, keyType: 'black', frequency: 554.37, keyName: 'C#5' },
  { note: 'D', octave: 5, keyType: 'white', frequency: 587.33, keyName: 'D5' },
  { note: 'D#', octave: 5, keyType: 'black', frequency: 622.25, keyName: 'D#5' },
  { note: 'E', octave: 5, keyType: 'white', frequency: 659.25, keyName: 'E5' },
];

// Audio context for playing notes
let audioContext: AudioContext | null = null;

// Initialize audio context
export function initializeAudio(): AudioContext {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
}

// Play a piano note
export function playNote(frequency: number, duration: number = 0.5): void {
  const context = initializeAudio();
  
  if (!context) {
    console.warn('Audio context not available');
    return;
  }

  // Resume audio context if suspended (required for user interaction)
  if (context.state === 'suspended') {
    context.resume();
  }

  const oscillator = context.createOscillator();
  const gainNode = context.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(context.destination);
  
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(frequency, context.currentTime);
  
  // Envelope for more realistic sound
  gainNode.gain.setValueAtTime(0, context.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.3, context.currentTime + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.001, context.currentTime + duration);
  
  oscillator.start(context.currentTime);
  oscillator.stop(context.currentTime + duration);
}

// Get random piano key for exercises
export function getRandomKey(): PianoKey {
  const randomIndex = Math.floor(Math.random() * PIANO_KEYS.length);
  const key = PIANO_KEYS[randomIndex];
  
  // Safety check to ensure we always return a valid key
  if (!key) {
    // Fallback to the first key if something goes wrong
    return PIANO_KEYS[0];
  }
  
  return key;
}

// Get key by name
export function getKeyByName(keyName: string): PianoKey | null {
  const foundKey = PIANO_KEYS.find(key => key.keyName === keyName);
  return foundKey || null;
}

// Get white keys only
export function getWhiteKeys(): PianoKey[] {
  return PIANO_KEYS.filter(key => key.keyType === 'white');
}

// Get black keys only
export function getBlackKeys(): PianoKey[] {
  return PIANO_KEYS.filter(key => key.keyType === 'black');
}

// Basic chord definitions
export const BASIC_CHORDS = {
  'C Major': ['C4', 'E4', 'G4'],
  'D Major': ['D4', 'F#4', 'A4'],
  'E Major': ['E4', 'G#4', 'B4'],
  'F Major': ['F4', 'A4', 'C5'],
  'G Major': ['G4', 'B4', 'D5'],
  'A Major': ['A4', 'C#5', 'E5'],
  'B Major': ['B4', 'D#5', 'F#5'],
};

// Play a chord
export function playChord(chordNotes: string[], duration: number = 1.0): void {
  chordNotes.forEach(noteName => {
    const key = getKeyByName(noteName);
    if (key) {
      playNote(key.frequency, duration);
    }
  });
}

// Note name utilities
export function getNoteColor(keyType: 'white' | 'black'): string {
  return keyType === 'white' ? '#ffffff' : '#1a1a1a';
}

export function isSharpOrFlat(noteName: string): boolean {
  return noteName.includes('#') || noteName.includes('b');
}