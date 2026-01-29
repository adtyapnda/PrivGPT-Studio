"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

/**
 * AuthButton component that renders a sign-in button linking to the sign-in page.
 *
 * This component provides a simple button for users to navigate to the authentication page.
 * It uses the Button UI component and wraps it with a Next.js Link for navigation.
 *
 * @returns {JSX.Element} A button element that links to the sign-in page.
 *
 * @example
 * ```tsx
 * <AuthButton />
 * ```
 */
export function AuthButton() {
  return (
    <Button asChild>
      <Link href="/sign-in">Sign In</Link>
    </Button>
  );
}