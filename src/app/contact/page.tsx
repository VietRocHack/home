"use client";
import Layout from "@/components/Layout";
import Container from "@/components/Container";
import Card from "@/components/Card";
import Button from "@/components/Button";
import Link from "next/link";
import React from "react";
import LinkedInQuickConnect from "./LinkedInQuickConnect";

export default function Page() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const message = String(formData.get("message") || "");

    const toAddress = "vietrochack@gmail.com";
    const subject = encodeURIComponent(
      `Contact from ${name || "VietRocHack website"}`
    );
    const body = encodeURIComponent(
      `From: ${name}${email ? ` <${email}>` : ""}\n\n${message}`
    );
    window.location.href = `mailto:${toAddress}?subject=${subject}&body=${body}`;
  }

  return (
    <Layout>
      <section className="py-16">
        <Container>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              Let&apos;s Connect
            </h1>
            <p className="text-lg text-[var(--foreground-secondary)] max-w-2xl mx-auto">
             No matter who you are—recruiter, organizer, hacker, friend—drop us a line!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <Card variant="zoom">
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-[var(--foreground-secondary)] mb-4">
                Reach us directly via email.
              </p>
              <a href="mailto:vietrochack@gmail.com" className="block w-full">
                <Button variant="primary" size="md" className="w-full mt-6">
                  Email Us
                </Button>
              </a>
            </Card>

            <Card variant="zoom">
              <h3 className="text-xl font-semibold mb-2">GitHub</h3>
              <p className="text-[var(--foreground-secondary)] mb-4">
                Browse our organization and projects.
              </p>
              <Link
                href="https://github.com/vietrochack"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button variant="ghost" size="md" className="w-full">
                  Visit GitHub
                </Button>
              </Link>
            </Card>

            <Card variant="zoom">
              <h3 className="text-xl font-semibold mb-2">Devpost</h3>
              <p className="text-[var(--foreground-secondary)] mb-4">
                See our hackathon submissions.
              </p>
              <Link
                href="https://devpost.com/goodudetheboy"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button variant="ghost" size="md" className="w-full">
                  View Devpost
                </Button>
              </Link>
            </Card>

            <Card variant="zoom">
                <h3 className="text-xl font-semibold mb-2">LinkedIn</h3>
                <p className="text-[var(--foreground-secondary)] mb-4">
                  Connect with a team member on LinkedIn.
                </p>
                <LinkedInQuickConnect />
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <Card>
                <h2 className="text-2xl font-semibold mb-4">Send a Message</h2>
                <p className="text-[var(--foreground-secondary)] mb-6">
                  Prefer email? Use this quick form to draft a message.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm text-[var(--foreground-secondary)]"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your name"
                      className="w-full rounded-lg bg-[var(--background-secondary)] border border-gray-700 focus:border-[var(--accent-yellow)] focus:ring-2 focus:ring-[var(--accent-yellow)]/30 outline-none px-4 py-3"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm text-[var(--foreground-secondary)]"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="w-full rounded-lg bg-[var(--background-secondary)] border border-gray-700 focus:border-[var(--accent-yellow)] focus:ring-2 focus:ring-[var(--accent-yellow)]/30 outline-none px-4 py-3"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block mb-2 text-sm text-[var(--foreground-secondary)]"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder="How can we help?"
                      className="w-full rounded-lg bg-[var(--background-secondary)] border border-gray-700 focus:border-[var(--accent-red)] focus:ring-2 focus:ring-[var(--accent-red)]/30 outline-none px-4 py-3 resize-y"
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button type="submit" variant="primary">
                      Send Message
                    </Button>
                    <Button type="reset" variant="ghost">
                      Clear
                    </Button>
                  </div>
                </form>
              </Card>
            </div>

            <div>
              <Card>
                <h2 className="text-2xl font-semibold mb-4">
                  Other Ways to Reach Us
                </h2>
                <ul className="space-y-3 text-[var(--foreground-secondary)]">
                  <li>
                    <span className="text-[var(--foreground)]">Email:</span>{" "}
                    <a
                      className="text-[var(--accent-yellow)] hover:underline"
                      href="mailto:vietrochack@gmail.com"
                    >
                      vietrochack@gmail.com
                    </a>
                  </li>
                  <li>
                    <span className="text-[var(--foreground)]">GitHub:</span>{" "}
                    <a
                      className="text-[var(--accent-yellow)] hover:underline"
                      href="https://github.com/vietrochack"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      github.com/vietrochack
                    </a>
                  </li>
                  <li>
                    <span className="text-[var(--foreground)]">Devpost:</span>{" "}
                    <a
                      className="text-[var(--accent-yellow)] hover:underline"
                      href="https://devpost.com/vietrochack"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      devpost.com/vietrochack
                    </a>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </Container>
      </section>
    </Layout>
  );
}
