"use client";

import React from "react";
import Layout from "@/components/Layout";
import Container from "@/components/Container";

export default function RSVPPage() {
  return (
    <Layout>
      <Container>
        <div className="pt-12 pb-8">
          <div className="mb-10 text-center">
            <h1 className="text-7xl font-extrabold mb-3 text-center drop-shadow-lg text-yellow-400">Mentorship Interest</h1>
            <h2 className="text-3xl text-red-500 mb-2 font-semibold">We may open a small cohort soon</h2>
            <p className="max-w-2xl mx-auto text-base text-justify">We’re considering opening our mentorship to a small cohort and would love to see if you’d be a good fit. Our focus is helping motivated beginners go from zero to hero: your first hackathon, real portfolio projects, a sharp resume, and interview prep to land internships and, ultimately, a full‑time tech role. If you’re interested, please RSVP to express interest and we’ll follow up.</p>
          </div>
          <h1 className="text-3xl font-extrabold mb-6 text-center drop-shadow-lg">Ready to start?</h1>
          <div className="flex justify-center mb-12">
            <a
              href="https://forms.gle/qgLpkLjtsRv9a4dv8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[var(--accent-red)] text-white px-6 py-3 rounded-lg hover:bg-opacity-90"
            >
              RSVP on Google Form
            </a>
          </div>
        </div>
      </Container>
    </Layout>
  );
}


