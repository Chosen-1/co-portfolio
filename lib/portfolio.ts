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

export function savePortfolio(data: PortfolioData) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function updatePortfolio(
  updater: (current: PortfolioData) => PortfolioData
) {
  const current = getPortfolio();
  const updated = updater(current);

  savePortfolio(updated);

  return updated;
}