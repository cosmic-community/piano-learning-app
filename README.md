# Piano Learning App 🎹

![Piano Learning App](https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=1200&h=300&fit=crop&auto=format)

A comprehensive piano learning application built with Next.js and Cosmic CMS. This interactive educational tool helps beginners learn piano fundamentals through visual lessons, interactive exercises, and a virtual piano keyboard.

## ✨ Features

- 🎹 **Interactive Virtual Piano** - Full keyboard with audio feedback
- 📚 **Structured Lessons** - Progressive curriculum from basics to advanced
- 🎵 **Note Recognition** - Practice identifying notes and keys
- 📈 **Progress Tracking** - Monitor learning milestones
- 🎼 **Music Theory** - Learn scales, chords, and musical concepts
- 📱 **Responsive Design** - Works on all devices
- 🔊 **High-Quality Audio** - Realistic piano sounds
- 🎯 **Interactive Exercises** - Hands-on practice activities

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68ad0a2d04ea77b1e31e573b&clone_repository=68ad0b9704ea77b1e31e573e)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> No content model prompt provided - app built from existing content structure

### Code Generation Prompt

> Create a very basic application to help teach people how to play the piano.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Cosmic CMS** - Headless content management
- **Web Audio API** - Piano sound generation
- **React Hooks** - State management and effects

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account and bucket

### Installation

1. Clone this repository
2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Add your Cosmic credentials to `.env.local`

4. Run the development server:
   ```bash
   bun run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the app

## 📚 Cosmic SDK Examples

### Fetching Lessons

```typescript
import { cosmic } from '@/lib/cosmic'

// Get all piano lessons
const lessons = await cosmic.objects
  .find({ type: 'lessons' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Get specific lesson by slug
const lesson = await cosmic.objects
  .findOne({ type: 'lessons', slug: 'basic-notes' })
  .depth(1)
```

### Managing User Progress

```typescript
// Create progress entry
const progress = await cosmic.objects.insertOne({
  type: 'user-progress',
  title: 'Lesson Progress',
  metadata: {
    lesson_id: 'basic-notes',
    completed: true,
    score: 85,
    completion_date: new Date().toISOString()
  }
})

// Update progress
await cosmic.objects.updateOne(progressId, {
  metadata: {
    score: 92,
    completed: true
  }
})
```

## 🎵 Cosmic CMS Integration

This app uses the following Cosmic object types:

- **Lessons** (`lessons`) - Piano learning modules
- **Exercises** (`exercises`) - Practice activities  
- **User Progress** (`user-progress`) - Learning tracking
- **Musical Concepts** (`concepts`) - Music theory content

Each object type includes comprehensive metadata for educational content, difficulty levels, and interactive elements.

## 🚀 Deployment Options

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main

### Netlify
1. Connect your repository to Netlify
2. Add environment variables in Netlify dashboard
3. Set build command: `bun run build`
4. Set publish directory: `.next`

### Environment Variables
Set these in your deployment platform:
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY`
- `COSMIC_WRITE_KEY`

<!-- README_END -->