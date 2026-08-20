"use client";

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
  return (
    <aside className="fixed inset-y-0 left-0 z-50 flex h-screen w-56 flex-col border-r border-slate-200 bg-white">
      {/* Header */}
      <div className="shrink-0 border-b border-slate-200 px-4 py-4">
        <Link href="/builder" className="block">
          <h1 className="text-base font-bold text-slate-950">
            CO Portfolio
          </h1>

          <p className="mt-1 text-xs text-slate-500">
            Portfolio Builder
          </p>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-3">
        <div className="space-y-0.5">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
              >
                <Icon size={17} strokeWidth={1.8} />

                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Logout */}
      <div className="shrink-0 border-t border-slate-200 bg-white p-3">
        <LogoutButton />
      </div>
    </aside>
  );
}