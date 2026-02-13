import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * Card component for displaying content in a contained layout.
 *
 * A flexible container component that provides a card-style layout with
 * border, background, and shadow. Can be composed with CardHeader, CardContent,
 * CardFooter, etc. for structured content.
 *
 * @param {React.HTMLAttributes<HTMLDivElement>} props - Standard div element props.
 * @param {string} [props.className] - Additional CSS classes.
 * @returns {JSX.Element} The card container element.
 *
 * @example
 * ```tsx
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Title</CardTitle>
 *     <CardDescription>Description</CardDescription>
 *   </CardHeader>
 *   <CardContent>Content</CardContent>
 *   <CardFooter>Footer</CardFooter>
 * </Card>
 * ```
 */
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

/**
 * CardHeader component for card header content.
 *
 * Provides spacing and layout for card header elements like titles and descriptions.
 * Typically contains CardTitle and CardDescription components.
 *
 * @param {React.HTMLAttributes<HTMLDivElement>} props - Standard div element props.
 * @param {string} [props.className] - Additional CSS classes.
 * @returns {JSX.Element} The card header container.
 */
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

/**
 * CardTitle component for card titles.
 *
 * Styled heading component for card titles with appropriate typography.
 *
 * @param {React.HTMLAttributes<HTMLDivElement>} props - Standard div element props.
 * @param {string} [props.className] - Additional CSS classes.
 * @returns {JSX.Element} The card title element.
 */
const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

/**
 * CardDescription component for card descriptions.
 *
 * Styled text component for card descriptions with muted foreground color.
 *
 * @param {React.HTMLAttributes<HTMLDivElement>} props - Standard div element props.
 * @param {string} [props.className] - Additional CSS classes.
 * @returns {JSX.Element} The card description element.
 */
const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

/**
 * CardContent component for card main content.
 *
 * Container for the primary content of the card with appropriate padding.
 *
 * @param {React.HTMLAttributes<HTMLDivElement>} props - Standard div element props.
 * @param {string} [props.className] - Additional CSS classes.
 * @returns {JSX.Element} The card content container.
 */
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

/**
 * CardFooter component for card footer content.
 *
 * Container for card footer elements like buttons or actions, with flex layout.
 *
 * @param {React.HTMLAttributes<HTMLDivElement>} props - Standard div element props.
 * @param {string} [props.className] - Additional CSS classes.
 * @returns {JSX.Element} The card footer container.
 */
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
