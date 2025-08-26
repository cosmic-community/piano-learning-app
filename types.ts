// Base Cosmic object interface
interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Piano lesson interface
interface Lesson extends CosmicObject {
  type: 'lessons';
  metadata: {
    description?: string;
    difficulty?: 'beginner' | 'intermediate' | 'advanced';
    duration?: number; // in minutes
    content: string;
    concepts?: string[];
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    lesson_number?: number;
    prerequisites?: Lesson[];
    key_signature?: string;
    tempo?: number;
  };
}

// Practice exercise interface
interface Exercise extends CosmicObject {
  type: 'exercises';
  metadata: {
    description?: string;
    exercise_type?: 'note-recognition' | 'chord-practice' | 'scale-practice' | 'rhythm';
    difficulty?: 'beginner' | 'intermediate' | 'advanced';
    instructions?: string;
    target_notes?: string[];
    target_chords?: string[];
    time_limit?: number;
    lesson?: Lesson;
  };
}

// User progress tracking interface
interface UserProgress extends CosmicObject {
  type: 'user-progress';
  metadata: {
    lesson_id?: string;
    exercise_id?: string;
    completed?: boolean;
    score?: number;
    attempts?: number;
    completion_date?: string;
    time_spent?: number; // in minutes
    notes?: string;
  };
}

// Musical concept interface
interface Concept extends CosmicObject {
  type: 'concepts';
  metadata: {
    description?: string;
    category?: 'notes' | 'scales' | 'chords' | 'rhythm' | 'theory';
    explanation?: string;
    examples?: string[];
    related_concepts?: Concept[];
    audio_example?: {
      url: string;
    };
  };
}

// Piano key interface
interface PianoKey {
  note: string;
  octave: number;
  keyType: 'white' | 'black';
  frequency: number;
  keyName: string;
}

// Lesson progress tracking
interface LessonProgress {
  lessonId: string;
  completed: boolean;
  score: number;
  timeSpent: number;
  lastAccessed: string;
}

// Exercise result interface
interface ExerciseResult {
  exerciseId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  completedAt: string;
}

// API response types
interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}

// Type guards
function isLesson(obj: CosmicObject): obj is Lesson {
  return obj.type === 'lessons';
}

function isExercise(obj: CosmicObject): obj is Exercise {
  return obj.type === 'exercises';
}

function isUserProgress(obj: CosmicObject): obj is UserProgress {
  return obj.type === 'user-progress';
}

function isConcept(obj: CosmicObject): obj is Concept {
  return obj.type === 'concepts';
}

// Utility types
type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';
type ExerciseType = 'note-recognition' | 'chord-practice' | 'scale-practice' | 'rhythm';
type ConceptCategory = 'notes' | 'scales' | 'chords' | 'rhythm' | 'theory';

export type {
  CosmicObject,
  Lesson,
  Exercise,
  UserProgress,
  Concept,
  PianoKey,
  LessonProgress,
  ExerciseResult,
  CosmicResponse,
  DifficultyLevel,
  ExerciseType,
  ConceptCategory,
};

export {
  isLesson,
  isExercise,
  isUserProgress,
  isConcept,
};