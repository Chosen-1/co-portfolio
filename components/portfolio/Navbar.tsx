"use client";

import { useState } from "react";
import Link from "next/link";

const links = [
  { label: "About", href: "/portfolio#about" },
  { label: "Experience", href: "/portfolio#experience" },
  { label: "Education", href: "/portfolio#education" },
  { label: "Skills", href: "/portfolio#skills" },
  { label: "Certifications", href: "/portfolio#certifications" },
  { label: "Achievements", href: "/portfolio#achievements" },
  { label: "Gallery", href: "/portfolio#gallery" },
  { label: "Documents", href: "/portfolio#documents" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <Link
            href="/portfolio#top"
            onClick={closeMenu}
            className="text-lg font-bold tracking-tight text-slate-900"
          >
            Portfolio
          </Link>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-5 lg:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-600 transition hover:text-blue-700"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setOpen((current) => !current)}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 transition hover:bg-slate-50 lg:hidden"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile navigation */}
        {open && (
          <div className="border-t border-slate-200 py-3 lg:hidden">
            <div className="flex flex-col">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="rounded-lg px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-blue-700"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}