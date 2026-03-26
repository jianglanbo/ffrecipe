import Link from "next/link";
import { CATEGORIES } from "@/lib/types";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-blue-600">FF</span>
            <span className="text-xl font-semibold text-gray-900">Recipe</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {CATEGORIES.slice(0, 5).map((category) => (
              <Link
                key={category.slug}
                href={`/${category.slug}`}
                className="text-gray-600 hover:text-blue-600 text-sm font-medium transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </div>
          
          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/guides"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Get Started
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <button className="md:hidden p-2 text-gray-600">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}
