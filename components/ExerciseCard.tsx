import Link from 'next/link'
import type { Exercise } from '@/types'

interface ExerciseCardProps {
  exercise: Exercise
}

export default function ExerciseCard({ exercise }: ExerciseCardProps) {
  const difficulty = exercise.metadata?.difficulty || 'beginner'
  const exerciseType = exercise.metadata?.exercise_type || 'note-recognition'
  const timeLimit = exercise.metadata?.time_limit || 60

  const getExerciseIcon = (type: string) => {
    switch (type) {
      case 'note-recognition':
        return '🎵'
      case 'chord-practice':
        return '🎶'
      case 'scale-practice':
        return '🎼'
      case 'rhythm':
        return '🥁'
      default:
        return '🎹'
    }
  }

  const getExerciseTypeLabel = (type: string) => {
    switch (type) {
      case 'note-recognition':
        return 'Note Recognition'
      case 'chord-practice':
        return 'Chord Practice'
      case 'scale-practice':
        return 'Scale Practice'
      case 'rhythm':
        return 'Rhythm Training'
      default:
        return 'Piano Exercise'
    }
  }

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'text-green-200'
      case 'intermediate':
        return 'text-yellow-200'
      case 'advanced':
        return 'text-red-200'
      default:
        return 'text-white'
    }
  }

  return (
    <div className="exercise-card card-hover">
      {/* Exercise Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{getExerciseIcon(exerciseType)}</span>
          <div>
            <div className="text-sm text-indigo-200">
              {getExerciseTypeLabel(exerciseType)}
            </div>
            <div className={`text-xs font-medium ${getDifficultyColor(difficulty)}`}>
              {difficulty.toUpperCase()}
            </div>
          </div>
        </div>
        <div className="text-right text-indigo-200">
          <div className="text-xs">Time Limit</div>
          <div className="text-sm font-medium">{timeLimit}s</div>
        </div>
      </div>

      {/* Exercise Content */}
      <h3 className="text-xl font-semibold text-white mb-3">
        {exercise.title}
      </h3>
      
      {exercise.metadata?.description && (
        <p className="text-indigo-100 mb-4 text-sm opacity-90">
          {exercise.metadata.description}
        </p>
      )}

      {/* Exercise Details */}
      <div className="flex items-center justify-between text-sm text-indigo-200 mb-6">
        {exercise.metadata?.target_notes && (
          <div className="flex items-center gap-1">
            <span>🎼</span>
            <span>{exercise.metadata.target_notes.length} notes</span>
          </div>
        )}
        {exercise.metadata?.target_chords && (
          <div className="flex items-center gap-1">
            <span>🎶</span>
            <span>{exercise.metadata.target_chords.length} chords</span>
          </div>
        )}
      </div>

      {/* Action Button */}
      <Link
        href={`/exercises/${exercise.slug}`}
        className="bg-white text-indigo-600 hover:bg-indigo-50 font-medium py-2 px-4 rounded-lg transition-colors duration-200 w-full text-center block"
      >
        Start Exercise
      </Link>
    </div>
  )
}