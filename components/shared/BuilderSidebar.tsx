"use client";

import { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  User,
  UserRound,
  Briefcase,
  GraduationCap,
  Lightbulb,
  Award,
  Trophy,
  Images,
  FileText,
  Menu,
  X,
} from "lucide-react";
import LogoutButton from "@/components/auth/LogoutButton";

const navigation = [
  {
    label: "Dashboard",
    href: "/builder",
    icon: LayoutDashboard,
  },
  {
    label: "Profile",
    href: "/builder/profile",
    icon: User,
  },
  {
    label: "About",
    href: "/builder/about",
    icon: UserRound,
  },
  {
    label: "Experience",
    href: "/builder/experience",
    icon: Briefcase,
  },
  {
    label: "Education",
    href: "/builder/education",
    icon: GraduationCap,
  },
  {
    label: "Skills",
    href: "/builder/skills",
    icon: Lightbulb,
  },
  {
    label: "Certifications",
    href: "/builder/certifications",
    icon: Award,
  },
  {
    label: "Achievements",
    href: "/builder/achievements",
    icon: Trophy,
  },
  {
    label: "Gallery",
    href: "/builder/gallery",
    icon: Images,
  },
  {
    label: "Documents",
    href: "/builder/documents",
    icon: FileText,
  },
];

export default function BuilderSidebar() {
  const [open, setOpen] = useState(false);

  function closeSidebar() {
    setOpen(false);
  }

  return (
    <>
      {/* Mobile header */}
      <div className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 lg:hidden">
        <Link href="/builder" className="block">
          <h1 className="text-base font-bold text-slate-950">
            CO Portfolio
          </h1>

          <p className="text-xs text-slate-500">
            Portfolio Builder
          </p>
        </Link>

        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50"
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      {/* Mobile overlay */}
      {open && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-slate-950/30 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-200 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="shrink-0 border-b border-slate-200 px-5 py-5">
          <div className="flex items-center justify-between">
            <Link
              href="/builder"
              onClick={closeSidebar}
              className="block"
            >
              <h1 className="text-lg font-bold text-slate-950">
                CO Portfolio
              </h1>

              <p className="mt-1 text-xs text-slate-500">
                Portfolio Builder
              </p>
            </Link>

            <button
              type="button"
              onClick={closeSidebar}
              aria-label="Close menu"
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeSidebar}
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
                >
                  <Icon size={18} strokeWidth={1.8} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Logout */}
        <div className="shrink-0 border-t border-slate-200 bg-white p-4">
          <LogoutButton />
        </div>
      </aside>
    </>
  );
}