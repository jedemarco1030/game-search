'use client'

import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { FaBars, FaMoon, FaSun, FaTimes } from 'react-icons/fa'

import { useTheme } from '@/contexts/ThemeContext'

const Header = () => {
  const { theme, toggleTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleOutsideClick)
    }

    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [isMenuOpen])

  const handleKeyDown = (event: React.KeyboardEvent, href: string) => {
    if (event.key === 'Enter') {
      window.location.href = href
    }
  }

  return (
    <header className="relative flex items-center justify-between bg-blue-500 p-4 text-white">
      <h1 className="text-lg font-semibold">Game Search</h1>
      <div className="hidden items-center md:flex">
        <nav className={`${isMenuOpen ? 'hidden' : 'flex'} space-x-4 md:flex`}>
          <Link
            href="/"
            className="px-3 text-white hover:underline"
            role="button"
            tabIndex={0}
            onKeyDown={e => handleKeyDown(e, '/')}
          >
            Home
          </Link>
          <Link
            href="/favorites"
            className="px-3 text-white hover:underline"
            role="button"
            tabIndex={0}
            onKeyDown={e => handleKeyDown(e, '/favorites')}
          >
            Favorites
          </Link>
          <Link
            href="/about"
            className="px-3 text-white hover:underline"
            role="button"
            tabIndex={0}
            onKeyDown={e => handleKeyDown(e, '/about')}
          >
            About
          </Link>
        </nav>
        <button onClick={toggleTheme} className="mx-3" type="button">
          {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
        </button>
      </div>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="mx-3 md:hidden"
        type="button"
      >
        {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>
      {isMenuOpen && (
        <div
          className="absolute right-0 top-full z-10 w-full bg-blue-500 shadow-lg md:hidden"
          ref={menuRef}
        >
          <nav className="flex flex-col items-start">
            <Link
              href="/"
              className="block px-4 py-2 text-white hover:underline"
              role="button"
              tabIndex={0}
              onKeyDown={e => handleKeyDown(e, '/')}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/favorites"
              className="block px-4 py-2 text-white hover:underline"
              role="button"
              tabIndex={0}
              onKeyDown={e => handleKeyDown(e, '/favorites')}
              onClick={() => setIsMenuOpen(false)}
            >
              Favorites
            </Link>
            <Link
              href="/about"
              className="block px-4 py-2 text-white hover:underline"
              role="button"
              tabIndex={0}
              onKeyDown={e => handleKeyDown(e, '/about')}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
          </nav>
          <button onClick={toggleTheme} className="m-3 p-1" type="button">
            {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} />}
          </button>
        </div>
      )}
    </header>
  )
}

export default Header
