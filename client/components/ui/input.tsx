import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Input component for form inputs.
 *
 * A styled input element that follows the design system with proper focus states,
 * disabled states, and file input styling. Supports all standard HTML input props.
 *
 * @param {React.ComponentProps<"input">} props - Standard HTML input element props.
 * @param {string} [props.className] - Additional CSS classes to apply.
 * @param {string} [props.type] - The input type (text, password, email, etc.).
 * @returns {JSX.Element} The styled input element.
 *
 * @example
 * ```tsx
 * <Input type="email" placeholder="Enter your email" />
 * <Input type="password" placeholder="Enter your password" />
 * ```
 */
const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
