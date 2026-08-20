"use client";

import { useEffect, useState } from "react";
import BuilderSidebar from "@/components/shared/BuilderSidebar";
import Dashboard from "@/components/builder/Dashboard";
import type { PortfolioData } from "@/types/portfolio";
import { defaultPortfolio } from "@/lib/portfolio";

export default function BuilderPage() {
  const [data, setData] = useState<PortfolioData>(defaultPortfolio);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadPortfolio() {
      try {
        const response = await fetch("/api/portfolio", {
          method: "GET",
          cache: "no-store",
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.error || "Failed to load portfolio."
          );
        }

        if (mounted) {
          setData(result);
        }
      } catch (err) {
        if (mounted) {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to load portfolio."
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadPortfolio();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="rounded-2xl bg-white px-8 py-6 shadow-sm">
          <p className="text-slate-600">
            Loading portfolio...
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
        <div className="max-w-md rounded-2xl border border-red-200 bg-white p-8 shadow-sm">
          <h1 className="text-xl font-bold text-red-600">
            Unable to load portfolio
          </h1>

          <p className="mt-3 text-slate-600">
            {error}
          </p>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <BuilderSidebar />

      <main className="min-h-screen lg:ml-64">
        <div className="mx-auto max-w-5xl px-6 py-10 lg:px-10">
          <Dashboard data={data} />
        </div>
      </main>
    </div>
  );
}