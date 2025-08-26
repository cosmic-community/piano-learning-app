import Link from 'next/link'
import type { Lesson } from '@/types'

interface LessonCardProps {
  lesson: Lesson
}

export default function LessonCard({ lesson }: LessonCardProps) {
  const difficulty = lesson.metadata?.difficulty || 'beginner'
  const duration = lesson.metadata?.duration || 15
  const lessonNumber = lesson.metadata?.lesson_number || 1
  const featuredImage = lesson.metadata?.featured_image

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-100 text-green-800'
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800'
      case 'advanced':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="lesson-card card-hover">
      {/* Featured Image */}
      {featuredImage && (
        <div className="mb-4 -mt-6 -mx-6">
          <img
            src={`${featuredImage.imgix_url}?w=600&h=200&fit=crop&auto=format,compress`}
            alt={lesson.title}
            className="w-full h-32 object-cover rounded-t-xl"
          />
        </div>
      )}

      {/* Lesson Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎼</span>
          <span className="text-sm font-medium text-gray-500">
            Lesson {lessonNumber}
          </span>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(difficulty)}`}>
          {difficulty}
        </span>
      </div>

      {/* Lesson Content */}
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {lesson.title}
      </h3>
      
      {lesson.metadata?.description && (
        <p className="text-gray-600 mb-4 line-clamp-3">
          {lesson.metadata.description}
        </p>
      )}

      {/* Lesson Meta */}
      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <div className="flex items-center gap-1">
          <span>⏱️</span>
          <span>{duration} min</span>
        </div>
        {lesson.metadata?.concepts && (
          <div className="flex items-center gap-1">
            <span>🎯</span>
            <span>{lesson.metadata.concepts.length} concepts</span>
          </div>
        )}
      </div>

      {/* Action Button */}
      <Link
        href={`/lessons/${lesson.slug}`}
        className="btn-primary w-full text-center block"
      >
        Start Lesson
      </Link>
    </div>
  )
}