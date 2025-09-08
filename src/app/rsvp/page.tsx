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
            <h1 className="text-7xl font-extrabold mb-3 text-center drop-shadow-lg text-yellow-400">Our Story</h1>
            <h2 className="text-3xl text-red-500 mb-2 font-semibold">From zero to tech job</h2>
            <p className="max-w-2xl mx-auto text-base text-justify">All four of us started from zero—just as lost and unsure as any CS student trying to figure out where to begin. What changed everything for us was discovering the hidden power of hackathons. They aren’t just about coding under pressure; they’re the easiest gateway to building real networks, gaining confidence, and finding opportunities that most students never realize exist. Through hackathons, we reshaped how we approached career-building and uncovered a unique path to break into tech. Now, we’re bringing that experience full circle to help you—step by step, from absolute beginner to hackathon winner, and eventually to landing your dream job in tech. Join us at VietRoHack, and let us guide you on the same journey that transformed our own careers.</p>
          </div>
          <h1 className="text-3xl font-extrabold mb-6 text-center drop-shadow-lg">Join us to unlock the secret sauce</h1>
          <div className="flex justify-center mb-12">
            <a
              href="https://forms.gle/YOUR_FORM_ID"
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


