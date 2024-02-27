import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';

function Header() {
  const { toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside of the menu to close it
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    // Only add the event listener if the menu is open
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    // Clean up by removing the event listener
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isMenuOpen]);

  // Function to close the menu, can be called when a menu item is clicked
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-blue-500 text-white p-4">
      <div className="mx-auto w-full max-w-screen-md">
        <div className="flex justify-between items-center flex-wrap">
          <h1 className="text-lg flex-grow">Game Search</h1>
          <div className="flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="bg-gray-200 text-gray-800 px-3 py-1 rounded mr-4 md:hidden"
            >
              Menu
            </button>
            <button onClick={toggleTheme} className="bg-gray-200 text-gray-800 px-3 py-1 rounded">
              Toggle Theme
            </button>
          </div>
        </div>
        <div className={`mt-4 ${isMenuOpen ? 'block' : 'hidden'} md:block`} ref={menuRef}>
          <nav>
            <ul className="flex flex-col md:flex-row md:space-x-4">
              <li onClick={closeMenu}>
                <Link href="/">Home</Link>
              </li>
              <li onClick={closeMenu}>
                <Link href="/favorites" className="hover:underline text-white">Favorites</Link>
              </li>
              <li onClick={closeMenu}>
                <Link href="/about" className="hover:underline text-white">About</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
