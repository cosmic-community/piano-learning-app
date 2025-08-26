import { createBucketClient } from '@cosmicjs/sdk';
import type { Lesson, Exercise, UserProgress, Concept, CosmicResponse } from '@/types';

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
});

// Get all lessons
export async function getLessons(): Promise<Lesson[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'lessons' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return (response.objects as Lesson[]).sort((a, b) => {
      const numberA = a.metadata?.lesson_number || 0;
      const numberB = b.metadata?.lesson_number || 0;
      return numberA - numberB;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch lessons');
  }
}

// Get lesson by slug
export async function getLessonBySlug(slug: string): Promise<Lesson | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'lessons', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    const lesson = response.object as Lesson;
    
    if (!lesson || !lesson.metadata || !lesson.metadata.content) {
      return null;
    }
    
    return lesson;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw error;
  }
}

// Get exercises by difficulty
export async function getExercisesByDifficulty(difficulty: string): Promise<Exercise[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'exercises',
        'metadata.difficulty': difficulty
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Exercise[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch exercises');
  }
}

// Get all exercises
export async function getExercises(): Promise<Exercise[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'exercises' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Exercise[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch exercises');
  }
}

// Get user progress
export async function getUserProgress(): Promise<UserProgress[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'user-progress' })
      .props(['id', 'title', 'metadata'])
      .depth(1);
    
    return (response.objects as UserProgress[]).sort((a, b) => {
      const dateA = new Date(a.metadata?.completion_date || '').getTime();
      const dateB = new Date(b.metadata?.completion_date || '').getTime();
      return dateB - dateA;
    });
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch user progress');
  }
}

// Create progress entry
export async function createProgress(progressData: {
  lesson_id?: string;
  exercise_id?: string;
  completed: boolean;
  score: number;
  time_spent: number;
}): Promise<UserProgress> {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'user-progress',
      title: `Progress ${new Date().toISOString()}`,
      metadata: {
        ...progressData,
        completion_date: new Date().toISOString(),
        attempts: 1
      }
    });
    
    return response.object as UserProgress;
  } catch (error) {
    console.error('Error creating progress:', error);
    throw new Error('Failed to create progress entry');
  }
}

// Update progress
export async function updateProgress(progressId: string, updates: {
  completed?: boolean;
  score?: number;
  attempts?: number;
  time_spent?: number;
}): Promise<UserProgress> {
  try {
    const response = await cosmic.objects.updateOne(progressId, {
      metadata: {
        ...updates,
        completion_date: new Date().toISOString()
      }
    });
    
    return response.object as UserProgress;
  } catch (error) {
    console.error('Error updating progress:', error);
    throw new Error('Failed to update progress');
  }
}

// Get concepts by category
export async function getConceptsByCategory(category: string): Promise<Concept[]> {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'concepts',
        'metadata.category': category
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Concept[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch concepts');
  }
}

// Get all concepts
export async function getConcepts(): Promise<Concept[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'concepts' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1);
    
    return response.objects as Concept[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch concepts');
  }
}