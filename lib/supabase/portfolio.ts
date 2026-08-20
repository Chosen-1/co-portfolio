import { createClient } from "@/lib/supabase/server";
import { defaultPortfolio } from "@/lib/portfolio";
import type { PortfolioData } from "@/types/portfolio";

function createUsername(email: string, userId: string) {
  const emailName = email.split("@")[0];

  const cleanName = emailName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 30);

  const shortId = userId.replace(/-/g, "").slice(0, 8);

  return `${cleanName || "clinical-officer"}-${shortId}`;
}

function mapPortfolio(data: Record<string, unknown>): PortfolioData {
  return {
    ...defaultPortfolio,

    username:
      typeof data.username === "string"
        ? data.username
        : defaultPortfolio.username,

    profile:
      data.profile && typeof data.profile === "object"
        ? (data.profile as PortfolioData["profile"])
        : defaultPortfolio.profile,

    about:
      typeof data.about === "string"
        ? data.about
        : defaultPortfolio.about,

    experiences: Array.isArray(data.experiences)
      ? (data.experiences as PortfolioData["experiences"])
      : defaultPortfolio.experiences,

    education: Array.isArray(data.education)
      ? (data.education as PortfolioData["education"])
      : defaultPortfolio.education,

    skills: Array.isArray(data.skills)
      ? (data.skills as PortfolioData["skills"])
      : defaultPortfolio.skills,

    certifications: Array.isArray(data.certifications)
      ? (data.certifications as PortfolioData["certifications"])
      : defaultPortfolio.certifications,

    achievements: Array.isArray(data.achievements)
      ? (data.achievements as PortfolioData["achievements"])
      : defaultPortfolio.achievements,

    gallery: Array.isArray(data.gallery)
      ? (data.gallery as PortfolioData["gallery"])
      : defaultPortfolio.gallery,

    documents:
      data.documents && typeof data.documents === "object"
        ? (data.documents as PortfolioData["documents"])
        : defaultPortfolio.documents,
  };
}

export async function getUserPortfolio(): Promise<PortfolioData> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("You must be logged in.");
  }

  const { data, error } = await supabase
    .from("portfolios")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    const username = createUsername(
      user.email ?? "",
      user.id
    );

    const initialData = {
      user_id: user.id,
      username,
      profile: {
        ...defaultPortfolio.profile,
        email: user.email ?? "",
      },
      about: defaultPortfolio.about,
      experiences: defaultPortfolio.experiences,
      education: defaultPortfolio.education,
      skills: defaultPortfolio.skills,
      certifications: defaultPortfolio.certifications,
      achievements: defaultPortfolio.achievements,
      gallery: defaultPortfolio.gallery,
      documents: defaultPortfolio.documents,
    };

    const { data: created, error: createError } = await supabase
      .from("portfolios")
      .insert(initialData)
      .select("*")
      .single();

    if (createError) {
      throw new Error(createError.message);
    }

    return mapPortfolio(created);
  }

  return mapPortfolio(data);
}

export async function saveUserPortfolio(
  portfolio: PortfolioData
): Promise<PortfolioData> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("You must be logged in.");
  }

  const { data, error } = await supabase
    .from("portfolios")
    .upsert(
      {
        user_id: user.id,
        username: portfolio.username,
        profile: portfolio.profile,
        about: portfolio.about,
        experiences: portfolio.experiences,
        education: portfolio.education,
        skills: portfolio.skills,
        certifications: portfolio.certifications,
        achievements: portfolio.achievements,
        gallery: portfolio.gallery,
        documents: portfolio.documents,
      },
      { onConflict: "user_id" }
    )
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return mapPortfolio(data);
}