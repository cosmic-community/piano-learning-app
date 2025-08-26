import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-3xl">🎹</span>
            <span className="text-xl font-bold text-gray-800">Piano Learning</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Home
            </Link>
            <Link 
              href="/lessons" 
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Lessons
            </Link>
            <Link 
              href="/exercises" 
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Exercises
            </Link>
            <Link 
              href="/progress" 
              className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
            >
              Progress
            </Link>
            <Link 
              href="/piano" 
              className="btn-primary"
            >
              Virtual Piano
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}