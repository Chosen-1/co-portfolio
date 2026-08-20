import type { PortfolioData } from "@/types/portfolio";

const STORAGE_KEY = "co-portfolio-data";

export const defaultPortfolio: PortfolioData = {
  username: "clinical-officer",

  profile: {
    fullName: "",
    professionalTitle: "Clinical Officer",
    location: "",
    email: "",
    phone: "",
    profilePhoto: "",
  },

  about: "",

  experiences: [],

  education: [],

  skills: [],

  certifications: [],

  achievements: [],

  gallery: [],

  documents: {
    other: [],
  },
};

/**
 * Reads the locally cached portfolio.
 * The local copy is only a client-side cache.
 * Supabase remains the real source of truth.
 */
export function getPortfolio(): PortfolioData {
  if (typeof window === "undefined") {
    return defaultPortfolio;
  }

  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return defaultPortfolio;
  }

  try {
    return JSON.parse(stored) as PortfolioData;
  } catch {
    return defaultPortfolio;
  }
}

/**
 * Stores a portfolio locally without contacting Supabase.
 * Used when we receive fresh data from the server.
 */
export function cachePortfolio(data: PortfolioData) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/**
 * Saves the portfolio to both:
 *
 * 1. Supabase through /api/portfolio
 * 2. localStorage as a client-side cache
 *
 * Supabase is the source of truth.
 */
export function savePortfolio(data: PortfolioData) {
  if (typeof window === "undefined") {
    return;
  }

  cachePortfolio(data);

  void fetch("/api/portfolio", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (!response.ok) {
      const result = await response.json().catch(() => null);

      console.error(
        "Failed to save portfolio to Supabase:",
        result?.error || "Unknown error"
      );

      return;
    }

    const savedPortfolio = await response.json();

    cachePortfolio(savedPortfolio);
  }).catch((error) => {
    console.error("Portfolio save failed:", error);
  });
}

/**
 * Updates the portfolio using the existing
 * builder form pattern.
 */
export function updatePortfolio(
  updater: (current: PortfolioData) => PortfolioData
) {
  const current = getPortfolio();
  const updated = updater(current);

  savePortfolio(updated);

  return updated;
}