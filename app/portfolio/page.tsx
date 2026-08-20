"use client";

import { useEffect, useState } from "react";

import { getPortfolio } from "@/lib/portfolio";
import type { PortfolioData } from "@/types/portfolio";

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

export default function PortfolioPage() {
  const [data, setData] = useState<PortfolioData | null>(null);

  useEffect(()=> {
    const timer=
    window.setTimeout(()=> {
      setData(getPortfolio());
    },0);
    return()=> 
      window.clearTimeout(timer);
  }, []);

  if (!data) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-600">Loading portfolio...</p>
      </main>
    );
  }

  return (
    <main
      id="top"
      className="min-h-screen overflow-hidden bg-slate-50 text-slate-900 "
    >
      <Navbar />

      <Hero profile={data.profile} />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <section id="about" className="scroll-mt-24">
  <About about={data.about} />
       </section>

<section id="experience" className="scroll-mt-24">
  <Experience items={data.experiences} />
</section>

<section id="education" className="scroll-mt-24">
  <Education items={data.education} />
</section>

<section id="skills" className="scroll-mt-24">
  <Skills items={data.skills} />
</section>

<section id="certifications" className="scroll-mt-24">
  <Certifications items={data.certifications} />
</section>

<section id="achievements" className="scroll-mt-24">
  <Achievements items={data.achievements} />
</section>

<section id="gallery" className="scroll-mt-24">
  <Gallery items={data.gallery} />
</section>

<section id="documents" className="scroll-mt-24">
  <Documents documents={data.documents} />
</section>
      </div>

      <Footer name={data.profile.fullName} />
    </main>
  );
}