"use client";

import { useState } from "react";

const links = [
  { label: "About", id: "about" },
  { label: "Experience", id: "experience" },
  { label: "Education", id: "education" },
  { label: "Skills", id: "skills" },
  { label: "Certifications", id: "certifications" },
  { label: "Achievements", id: "achievements" },
  { label: "Gallery", id: "gallery" },
  { label: "Documents", id: "documents" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  function scrollToSection(id: string) {
    const element = document.getElementById(id);

    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    window.history.pushState(null, "", `#${id}`);
    setOpen(false);
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    window.history.pushState(null, "", "/portfolio");
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <button
            type="button"
            onClick={scrollToTop}
            className="text-lg font-bold tracking-tight text-slate-900"
          >
            Portfolio
          </button>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-5 lg:flex">
            {links.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollToSection(link.id)}
                className="text-sm font-medium text-slate-600 transition hover:text-blue-700"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setOpen((current) => !current)}
            aria-label={
              open ? "Close navigation menu" : "Open navigation menu"
            }
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
                <button
                  key={link.id}
                  type="button"
                  onClick={() => scrollToSection(link.id)}
                  className="rounded-lg px-3 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-blue-700"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}