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

export function cachePortfolio(data: PortfolioData) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export async function loadPortfolioFromServer(): Promise<PortfolioData> {
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

  const portfolio = result as PortfolioData;

  cachePortfolio(portfolio);

  return portfolio;
}

export async function savePortfolio(
  data: PortfolioData
): Promise<PortfolioData> {
  const response = await fetch("/api/portfolio", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.error || "Failed to save portfolio."
    );
  }

  const savedPortfolio = result as PortfolioData;

  cachePortfolio(savedPortfolio);

  return savedPortfolio;
}

export async function updatePortfolio(
  updater: (current: PortfolioData) => PortfolioData
): Promise<PortfolioData> {
  const current = await loadPortfolioFromServer();
  const updated = updater(current);

  return savePortfolio(updated);
}