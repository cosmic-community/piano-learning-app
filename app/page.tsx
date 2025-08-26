import Link from 'next/link'
import { getLessons, getExercises } from '@/lib/cosmic'
import PianoKeyboard from '@/components/PianoKeyboard'
import LessonCard from '@/components/LessonCard'
import ExerciseCard from '@/components/ExerciseCard'
import type { Lesson, Exercise } from '@/types'

export default async function HomePage() {
  let lessons: Lesson[] = [];
  let exercises: Exercise[] = [];
  
  try {
    lessons = await getLessons();
    exercises = await getExercises();
  } catch (error) {
    console.error('Error fetching data:', error);
    lessons = [];
    exercises = [];
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-800 mb-6">
          Learn Piano 🎹
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Master the piano with interactive lessons, practice exercises, and our virtual keyboard. 
          Perfect for beginners starting their musical journey.
        </p>
        
        {/* Virtual Piano */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Try Our Virtual Piano</h2>
          <PianoKeyboard />
        </div>
      </section>

      {/* Quick Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-xl p-6 text-center shadow-lg">
          <div className="text-3xl font-bold text-blue-600 mb-2">{lessons.length}</div>
          <div className="text-gray-600">Piano Lessons</div>
        </div>
        <div className="bg-white rounded-xl p-6 text-center shadow-lg">
          <div className="text-3xl font-bold text-indigo-600 mb-2">{exercises.length}</div>
          <div className="text-gray-600">Practice Exercises</div>
        </div>
        <div className="bg-white rounded-xl p-6 text-center shadow-lg">
          <div className="text-3xl font-bold text-purple-600 mb-2">15</div>
          <div className="text-gray-600">Virtual Keys</div>
        </div>
      </section>

      {/* Featured Lessons */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Featured Lessons</h2>
          <Link 
            href="/lessons" 
            className="btn-primary"
          >
            View All Lessons
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.slice(0, 6).map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>
        
        {lessons.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No lessons available yet. Check back soon!</p>
          </div>
        )}
      </section>

      {/* Practice Exercises */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Practice Exercises</h2>
          <Link 
            href="/exercises" 
            className="btn-primary"
          >
            View All Exercises
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {exercises.slice(0, 4).map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))}
        </div>
        
        {exercises.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No exercises available yet. Check back soon!</p>
          </div>
        )}
      </section>

      {/* Learning Path */}
      <section className="bg-white rounded-xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Your Learning Path</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎼</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Learn Notes</h3>
            <p className="text-sm text-gray-600">Master the basic notes and key positions</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎵</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Practice Scales</h3>
            <p className="text-sm text-gray-600">Build finger strength and coordination</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎶</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Learn Chords</h3>
            <p className="text-sm text-gray-600">Play multiple notes together harmoniously</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎹</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Play Songs</h3>
            <p className="text-sm text-gray-600">Put it all together with complete pieces</p>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <Link href="/lessons" className="btn-primary text-lg px-8 py-3">
            Start Learning Now
          </Link>
        </div>
      </section>
    </div>
  )
}