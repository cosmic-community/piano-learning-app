'use client'

import { useState } from 'react'
import { PIANO_KEYS, playNote } from '@/lib/piano'
import type { PianoKey } from '@/types'

export default function PianoKeyboard() {
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set())

  const handleKeyPress = (key: PianoKey) => {
    // Play the note
    playNote(key.frequency, 0.5)
    
    // Visual feedback
    setPressedKeys(prev => new Set([...Array.from(prev), key.keyName]))
    
    // Remove pressed state after animation
    setTimeout(() => {
      setPressedKeys(prev => {
        const newSet = new Set(Array.from(prev))
        newSet.delete(key.keyName)
        return newSet
      })
    }, 150)
  }

  const whiteKeys = PIANO_KEYS.filter(key => key.keyType === 'white')
  const blackKeys = PIANO_KEYS.filter(key => key.keyType === 'black')

  return (
    <div className="piano-keyboard bg-gray-800 rounded-xl p-6 mx-auto max-w-4xl piano-shadow">
      <div className="flex justify-center items-end relative">
        {/* White Keys */}
        <div className="flex">
          {whiteKeys.map((key) => (
            <button
              key={key.keyName}
              className={`white-key piano-key flex flex-col justify-end items-center p-2 ${
                pressedKeys.has(key.keyName) ? 'pressed bg-yellow-200' : ''
              }`}
              onClick={() => handleKeyPress(key)}
              aria-label={`Play ${key.keyName}`}
            >
              <span className="text-sm font-semibold text-gray-700 mb-2">
                {key.note}
              </span>
              <span className="text-xs text-gray-500">
                {key.octave}
              </span>
            </button>
          ))}
        </div>

        {/* Black Keys */}
        <div className="absolute flex">
          {blackKeys.map((key, index) => {
            // Position black keys between appropriate white keys
            const leftOffset = getBlackKeyPosition(key.keyName) * 40 + 27.5
            
            return (
              <button
                key={key.keyName}
                className={`black-key piano-key absolute flex flex-col justify-end items-center p-1 text-white ${
                  pressedKeys.has(key.keyName) ? 'pressed bg-yellow-600' : ''
                }`}
                style={{ left: `${leftOffset}px` }}
                onClick={() => handleKeyPress(key)}
                aria-label={`Play ${key.keyName}`}
              >
                <span className="text-xs font-medium">
                  {key.note}
                </span>
              </button>
            )
          })}
        </div>
      </div>
      
      {/* Instructions */}
      <div className="mt-6 text-center text-white">
        <p className="text-lg font-medium mb-2">🎹 Click on the keys to play notes!</p>
        <p className="text-sm text-gray-300">
          This virtual piano includes one full octave from C4 to C5
        </p>
      </div>
    </div>
  )
}

// Helper function to position black keys correctly
function getBlackKeyPosition(keyName: string): number {
  const positions: { [key: string]: number } = {
    'C#4': 0,
    'D#4': 1,
    'F#4': 3,
    'G#4': 4,
    'A#4': 5,
    'C#5': 7,
    'D#5': 8,
  }
  return positions[keyName] || 0
}