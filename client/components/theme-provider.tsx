'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type ThemeContextType = {
  darkMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * ThemeProvider component that manages the application's theme state.
 * Provides dark/light mode functionality with persistence to localStorage.
 * Wraps the application to enable theme context throughout the component tree.
 *
 * @param {Object} props - The component props
 * @param {ReactNode} props.children - The child components to be wrapped with theme context
 * @returns {JSX.Element} The provider component wrapping the children
 *
 * @example
 * ```tsx
 * import { ThemeProvider } from './components/theme-provider';
 *
 * function App() {
 *   return (
 *     <ThemeProvider>
 *       <MyApp />
 *     </ThemeProvider>
 *   );
 * }
 * ```
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);

    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
};

/**
 * Custom hook to access the theme context.
 * Must be used within a component wrapped by ThemeProvider.
 *
 * @returns {ThemeContextType} Object containing darkMode boolean and toggleTheme function
 * @throws {Error} Throws an error if used outside of ThemeProvider
 *
 * @example
 * ```tsx
 * import { useTheme } from './components/theme-provider';
 *
 * function MyComponent() {
 *   const { darkMode, toggleTheme } = useTheme();
 *
 *   return (
 *     <button onClick={toggleTheme}>
 *       Current theme: {darkMode ? 'Dark' : 'Light'}
 *     </button>
 *   );
 * }
 * ```
 */