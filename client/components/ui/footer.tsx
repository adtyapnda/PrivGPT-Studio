"use client";

import { Github, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/components/theme-provider";
import { RiDiscordLine } from "react-icons/ri";

export default function Footer() {
  const { darkMode } = useTheme();

  return (
    <footer className="border-t border-border bg-background px-4 py-14">
      <div className="container mx-auto">
        {/* Top Section */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          
          {/* Brand */}
          <div className="md:col-span-4 space-y-4">
            <Link href="/" className="inline-flex items-center">
              <Image
                src={darkMode ? "/logos/logo-dark.svg" : "/logos/logo-light.svg"}
                alt="PrivGPT Studio Logo"
                width={260}
                height={48}
                priority
                className="w-[200px] h-auto"
              />
            </Link>

            <p className="text-sm leading-relaxed text-muted-foreground max-w-sm">
              The future of AI conversations, powered by both cloud and local
              models.
            </p>
          </div>

          {/* Community */}
          <div className="md:col-span-2">
            <h3 className="mb-4 text-sm font-semibold tracking-wide text-foreground">
              Community
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link
                  href="https://github.com/Rucha-Ambaliya/PrivGPT-Studio/issues"
                  target="_blank"
                  className="hover:text-foreground transition-colors"
                >
                  Open Issues
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/Rucha-Ambaliya/PrivGPT-Studio?tab=readme-ov-file#-contributing"
                  target="_blank"
                  className="hover:text-foreground transition-colors"
                >
                  Contribute
                </Link>
              </li>
            </ul>
          </div>

          {/* Product */}
          <div className="md:col-span-2">
            <h3 className="mb-4 text-sm font-semibold tracking-wide text-foreground">
              Product
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/chat" className="hover:text-foreground transition-colors">
                  Chat Interface
                </Link>
              </li>
              <li>
                <span className="hover:text-foreground transition-colors">
                  API Access
                </span>
              </li>
              <li>
                <span className="hover:text-foreground transition-colors">
                  Model Library
                </span>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="md:col-span-2">
            <h3 className="mb-4 text-sm font-semibold tracking-wide text-foreground">
              Resources
            </h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <span className="hover:text-foreground transition-colors">
                  Documentation
                </span>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="md:col-span-2">
            <h3 className="mb-4 text-sm font-semibold tracking-wide text-foreground">
              Connect with Us
            </h3>
            <div className="flex items-center gap-5 text-muted-foreground">
              <a
                href="https://github.com/Rucha-Ambaliya/PrivGPT-Studio"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="hover:text-foreground transition-colors"
              >
                <Github className="h-6 w-6" />
              </a>

              <a
                href="https://discord.gg/J9z5T52rkZ"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discord"
                className="hover:text-foreground transition-colors"
              >
                <RiDiscordLine className="h-7 w-7" />
              </a>

              <Link
                href="/"
                aria-label="Email"
                className="hover:text-foreground transition-colors"
              >
                <Mail className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-border pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © 2026 PrivGPT Studio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
