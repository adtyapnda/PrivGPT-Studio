'use client';

import { useTheme } from './theme-provider';
import { RiMoonClearFill, RiSunFill } from 'react-icons/ri';

/**
 * ThemeToggle component that provides a button to switch between dark and light themes.
 * Uses icons from react-icons to visually represent the current theme state.
 * Must be used within a component wrapped by ThemeProvider.
 *
 * @returns {JSX.Element} A button element that toggles the theme when clicked
 *
 * @example
 * ```tsx
 * import { ThemeToggle } from './components/theme-toggle';
 *
 * function Header() {
 *   return (
 *     <header>
 *       <h1>My App</h1>
 *       <ThemeToggle />
 *     </header>
 *   );
 * }
 * ```
 */
export function ThemeToggle() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors"
      aria-label="Toggle theme"
    >
      {darkMode ? (
        <RiSunFill className="w-5 h-5 text-yellow-400" />
      ) : (
        <RiMoonClearFill className="w-5 h-5 text-gray-800 dark:text-gray-100" />
      )}
    </button>
  );
}
