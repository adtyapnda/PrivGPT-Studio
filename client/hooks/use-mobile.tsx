import * as React from "react"

const MOBILE_BREAKPOINT = 768

/**
 * Custom hook to detect if the current viewport is mobile-sized.
 *
 * This hook uses a media query to check if the window width is less than 768px
 * (the mobile breakpoint). It returns a boolean indicating whether the device
 * should be considered mobile. The hook automatically updates when the window
 * is resized.
 *
 * @returns {boolean} True if the viewport width is less than 768px, false otherwise.
 *
 * @example
 * ```tsx
 * const isMobile = useIsMobile();
 * if (isMobile) {
 *   // Render mobile-specific UI
 * }
 * ```
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
