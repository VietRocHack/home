import Layout from "@/components/Layout";
import Container from "@/components/Container";
import Button from "@/components/Button";
import RotatingLogo from "@/components/RotatingLogo";
import AnimatedStat from "@/components/AnimatedStat";
import BackgroundCarousel from "@/components/BackgroundCarousel";
import HackathonTimeline from "@/components/HackathonTimeline";
import ProjectGallery from "@/components/ProjectGallery";
import Link from "next/link";
import Image from "next/image";
import { getSummaryStatistics, getAllTeamMembers } from "@/utils/dataUtils";

// Get team members from data
const teamData = getAllTeamMembers();

// Team members for homepage display with custom captions
const teamMembers = teamData.map((member) => ({
  id: member.id,
  name: member.name.split(" ")[0], // Just use first name
  caption:
    member.id === "vuong"
      ? "Vuong debugging via prayer"
      : member.id === "duc"
      ? "One hour before the demo crash"
      : member.id === "hoang"
      ? "Trying to center a div at 3 AM"
      : "When the code works but you don't know why",
  image: member.photo, // Use photo path from team.json
}));

export default function Home() {
  // Get statistics
  const stats = getSummaryStatistics();

  return (
    <Layout>
      {/* 1. Splash / Rotating Logo Section */}
      <BackgroundCarousel>
        <div className="flex flex-col items-center justify-center text-center w-full max-w-4xl px-4">
          {/* Opaque background container */}
          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-8 md:p-12 shadow-xl max-w-3xl mx-auto">
            <RotatingLogo />
            <div className="flex gap-4 mt-8 justify-center">
              <Link href="/projects">
                <Button variant="primary" size="lg">
                  Explore Projects
                </Button>
              </Link>
              <Link href="/team">
                <Button variant="ghost" size="lg">
                  Meet the Team
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </BackgroundCarousel>
      {/* 2. Hero Section */}
      <section className="py-16 bg-[var(--background-secondary)]">
        <Container>
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              We&apos;re VietRocHack.
            </h2>
            <p className="text-xl text-[var(--foreground-secondary)] max-w-2xl mb-10">
              Proud Vietnamese students at the University of Rochester, breaking into tech through hackathons
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/team">
                <Button variant="primary" size="lg">
                  Join team
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
      {/* 3. Featured Projects Section */}
      <section className="py-16">
        <Container>
          <h2 className="text-3xl font-bold mb-10 text-center">
          Award-Winning Hackathon Projects
          </h2>

          <ProjectGallery />

          <div className="flex justify-center mt-8">
            <Link href="/projects">
              <Button variant="primary" size="lg">
                See All Projects
              </Button>
            </Link>
          </div>
        </Container>
      </section>
      {/* Hackathon Timeline Section */}
      <section className="py-16 bg-[var(--background-secondary)]">
        <Container>
          <h2 className="text-3xl font-bold mb-4 text-center">
            Been Everywhere, Done Everything
          </h2>
          <p className="text-[var(--foreground-secondary)] text-center max-w-2xl mx-auto mb-10">
            Follow our journey from first-time participants to award-winning
            hackathon veterans.
          </p>
          <HackathonTimeline />

          <div className="flex justify-center mt-12">
            <Link href="/journey">
              <Button variant="secondary" size="lg">
                Explore Full Journey
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 ml-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </Button>
            </Link>
          </div>
        </Container>
      </section>
      {/* 4. Team Strip Section */}
      <section className="py-16 bg-[var(--background-secondary)]">
        <Container>
          <h2 className="text-3xl font-bold mb-10 text-center">
            And Always The Best Version Of Ourselves
          </h2>

          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {teamMembers.map((member, index) => (
              <Link
                key={member.id + index}
                href={`/team#${member.id}`}
                className="group relative w-64 h-64 overflow-hidden rounded-lg cursor-pointer"
                passHref
              >
                <Image
                  src={
                    member.image.startsWith("http")
                      ? member.image
                      : "/" + member.image.replace(/^\/+/, "")
                  }
                  alt={member.name}
                  fill
                  className="object-cover filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  unoptimized={member.image.startsWith("http")}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-lg font-medium">{member.name}</p>
                  <p className="text-sm text-[var(--foreground-secondary)]">
                    {member.caption}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
      {/* 5. Stats Section */}
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedStat
              key="hackathons"
              title="Hackathons Entered"
              value={stats.hackathonsEntered}
              subtext="And survived most of them"
            />
            <AnimatedStat
              key="prizes"
              title="Prizes Won"
              value={stats.prizesWon}
              subtext="But who's counting?"
            />
            <AnimatedStat
              key="sleep"
              title="Phở Eaten"
              value={stats.sleepLost}
              subtext="tái nạm gầu gân"
            />
            <AnimatedStat
              key="coffee"
              title="Places Travelled"
              value={8}
              subtext="Across the US for hackathons"
            />
          </div>
        </Container>
      </section>
    </Layout>
  );
}
