"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Circle,
  Printer,
} from "lucide-react";
import { PortfolioData } from "@/types/portfolio";

type DashboardProps = {
  data: PortfolioData;
};

export default function Dashboard({ data }: DashboardProps) {
  const checks = [
    {
      label: "Personal Information",
      complete: Boolean(data.profile.fullName),
      href: "/builder/profile",
    },
    {
      label: "Profile Photo",
      complete: Boolean(data.profile.profilePhoto),
      href: "/builder/profile",
    },
    {
      label: "About Me",
      complete: Boolean(data.about),
      href: "/builder/about",
    },
    {
      label: "Professional Experience",
      complete: data.experiences.length > 0,
      href: "/builder/experience",
    },
    {
      label: "Education",
      complete: data.education.length > 0,
      href: "/builder/education",
    },
    {
      label: "Competencies",
      complete: data.skills.length > 0,
      href: "/builder/skills",
    },
    {
      label: "Certifications",
      complete: data.certifications.length > 0,
      href: "/builder/certifications",
    },
    {
      label: "Achievements",
      complete: data.achievements.length > 0,
      href: "/builder/achievements",
    },
    {
      label: "Gallery",
      complete: data.gallery.length > 0,
      href: "/builder/gallery",
    },
    {
      label: "CV",
      complete: Boolean(data.documents.cv),
      href: "/builder/documents",
    },
  ];

  const completed = checks.filter(
    (item) => item.complete
  ).length;

  const percentage = Math.round(
    (completed / checks.length) * 100
  );

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-teal-600">
            Welcome to your workspace
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-950">
            Build your professional portfolio
          </h1>

          <p className="mt-2 text-slate-500">
            Complete each section to create your professional online presence.
          </p>
        </div>

        {/* Preview and Print */}
        <div className="flex flex-wrap gap-3">
          <Link
            href={`/portfolio/${data.username}`}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            Preview Portfolio
            <ArrowRight size={17} />
          </Link>

          <Link
            href={`/portfolio/${data.username}/print`}
            target="_blank"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <Printer size={17} />
            Preview & Print
          </Link>
        </div>
      </div>

      {/* Progress */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Portfolio completion
            </p>

            <p className="mt-1 text-4xl font-bold text-slate-950">
              {percentage}%
            </p>
          </div>

          <p className="text-sm text-slate-500">
            {completed}/{checks.length} completed
          </p>
        </div>

        <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-teal-600 transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Checklist */}
      <div className="mt-8 rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-6">
          <h2 className="font-bold text-slate-900">
            Portfolio checklist
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Complete these sections to make your portfolio stronger.
          </p>
        </div>

        <div>
          {checks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center justify-between border-b border-slate-100 px-6 py-4 transition last:border-b-0 hover:bg-slate-50"
            >
              <div className="flex items-center gap-3">
                {item.complete ? (
                  <CheckCircle2
                    size={20}
                    className="text-teal-600"
                  />
                ) : (
                  <Circle
                    size={20}
                    className="text-slate-300"
                  />
                )}

                <span
                  className={
                    item.complete
                      ? "text-sm font-medium text-slate-500 line-through"
                      : "text-sm font-medium text-slate-700"
                  }
                >
                  {item.label}
                </span>
              </div>

              <ArrowRight
                size={17}
                className="text-slate-300"
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}