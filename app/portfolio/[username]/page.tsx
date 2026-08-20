import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Experience from "@/components/portfolio/Experience";
import Education from "@/components/portfolio/Education";
import Skills from "@/components/portfolio/Skills";
import Certifications from "@/components/portfolio/Certifications";
import Achievements from "@/components/portfolio/Achievements";
import Gallery from "@/components/portfolio/Gallery";
import Documents from "@/components/portfolio/Documents";
import Footer from "@/components/portfolio/Footer";

import type { PortfolioData } from "@/types/portfolio";

type Props = {
  params: Promise<{
    username: string;
  }>;
};

export default async function PublicPortfolioPage({
  params,
}: Props) {
  const { username } = await params;

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("portfolios")
    .select("*")
    .eq("username", username)
    .maybeSingle();

  if (error || !data) {
    notFound();
  }

  const portfolio: PortfolioData = {
    username: data.username ?? username,

    profile:
      data.profile &&
      typeof data.profile === "object"
        ? data.profile
        : {
            fullName: "",
            professionalTitle: "",
            location: "",
            email: "",
            phone: "",
            profilePhoto: "",
          },

    about:
      typeof data.about === "string"
        ? data.about
        : "",

    experiences: Array.isArray(data.experiences)
      ? data.experiences
      : [],

    education: Array.isArray(data.education)
      ? data.education
      : [],

    skills: Array.isArray(data.skills)
      ? data.skills
      : [],

    certifications: Array.isArray(data.certifications)
      ? data.certifications
      : [],

    achievements: Array.isArray(data.achievements)
      ? data.achievements
      : [],

    gallery: Array.isArray(data.gallery)
      ? data.gallery
      : [],

    documents:
      data.documents &&
      typeof data.documents === "object"
        ? data.documents
        : {
            cv: "",
            other: [],
          },
  };

  return (
    <main
      id="top"
      className="min-h-screen overflow-hidden bg-slate-50 text-slate-900"
    >
      <Navbar />

      <Hero profile={portfolio.profile} />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <section id="about" className="scroll-mt-24">
          <About about={portfolio.about} />
        </section>

        <section id="experience" className="scroll-mt-24">
          <Experience items={portfolio.experiences} />
        </section>

        <section id="education" className="scroll-mt-24">
          <Education items={portfolio.education} />
        </section>

        <section id="skills" className="scroll-mt-24">
          <Skills items={portfolio.skills} />
        </section>

        <section id="certifications" className="scroll-mt-24">
          <Certifications items={portfolio.certifications} />
        </section>

        <section id="achievements" className="scroll-mt-24">
          <Achievements items={portfolio.achievements} />
        </section>

        <section id="gallery" className="scroll-mt-24">
          <Gallery items={portfolio.gallery} />
        </section>

        <section id="documents" className="scroll-mt-24">
          <Documents documents={portfolio.documents} />
        </section>
      </div>

      <Footer name={portfolio.profile.fullName} />
    </main>
  );
}