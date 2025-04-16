import Layout from '@/components/Layout';
import Container from '@/components/Container';
import Button from '@/components/Button';
import RotatingLogo from '@/components/RotatingLogo';
import AnimatedStat from '@/components/AnimatedStat';
import BackgroundCarousel from '@/components/BackgroundCarousel';
import PhotoGallery from '@/components/PhotoGallery';
import HackathonTimeline from '@/components/HackathonTimeline';
import ProjectGallery from '@/components/ProjectGallery';
import Link from 'next/link';
import Image from 'next/image';
import { getSummaryStatistics } from '@/utils/dataUtils';

const teamMembers = [
  {
    name: "Vuong",
    caption: "Vuong debugging via prayer",
    image: "/Flag_of_Vietnam.svg"
  },
  {
    name: "Minh",
    caption: "One hour before the demo crash",
    image: "/Flag_of_Vietnam.svg"
  },
  {
    name: "Linh",
    caption: "Trying to center a div at 3 AM",
    image: "/Flag_of_Vietnam.svg"
  },
  {
    name: "Trung",
    caption: "When the code works but you don't know why",
    image: "/Flag_of_Vietnam.svg"
  }
];

export default function Home() {
  // Get statistics
  const stats = getSummaryStatistics();

  return (
    <Layout>
      {/* 1. Splash / Rotating Logo Section */}
      <BackgroundCarousel>
        <div className="flex flex-col items-center justify-center text-center w-full max-w-4xl px-4">
          <RotatingLogo />
          <p className="text-xl text-[var(--foreground-secondary)] max-w-2xl mb-8">
            Vietnamese hackers from the University of Rochester. Some of this site is real.
          </p>
          <div className="flex gap-4 mt-4">
            <Link href="/projects">
              <Button variant="primary" size="lg">Explore Projects</Button>
            </Link>
            <Link href="/team">
              <Button variant="ghost" size="lg">Meet the Team</Button>
            </Link>
          </div>
        </div>
      </BackgroundCarousel>

      {/* 2. Hero Section */}
      <section className="py-16 bg-[var(--background-secondary)]">
        <Container>
          <div className="flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">We&apos;re VietRocHack.</h2>
            <p className="text-xl text-[var(--foreground-secondary)] max-w-2xl mb-10">
              We build apps. Win hackathons. And sometimes get sleep.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
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
        </Container>
      </section>

      {/* 3. Featured Projects Section */}
      <section className="py-16">
        <Container>
          <h2 className="text-3xl font-bold mb-10 text-center">
            A few things we&apos;re not totally embarrassed to show:
          </h2>
          
          <ProjectGallery />
          
          <div className="flex justify-center mt-8">
            <Link href="/projects">
              <Button variant="primary" size="lg">See All Projects</Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Hackathon Timeline Section */}
      <section className="py-16 bg-[var(--background-secondary)]">
        <Container>
          <h2 className="text-3xl font-bold mb-4 text-center">Our Hacking Timeline</h2>
          <p className="text-[var(--foreground-secondary)] text-center max-w-2xl mx-auto mb-10">
            Follow our journey from first-time participants to award-winning hackathon veterans.
          </p>
          <HackathonTimeline />
        </Container>
      </section>

      {/* Photo Gallery Section */}
      <section className="py-16">
        <Container>
          <h2 className="text-3xl font-bold mb-4 text-center">Our Hackathon Journey</h2>
          <p className="text-[var(--foreground-secondary)] text-center max-w-2xl mx-auto mb-10">
            Swipe through our adventures across hackathons nationwide. We&apos;ve built, broken, fixed, and celebrated from coast to coast.
          </p>
          <PhotoGallery />
        </Container>
      </section>

      {/* 4. Team Strip Section */}
      <section className="py-16 bg-[var(--background-secondary)]">
        <Container>
          <h2 className="text-3xl font-bold mb-10 text-center">
            Four devs. Two time zones. One shared Google Doc.
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="group relative w-64 h-64 overflow-hidden rounded-lg">
                {/* Placeholder image if actual images not available */}
                <div className="absolute inset-0 bg-gray-700 filter grayscale group-hover:grayscale-0 transition-all duration-300"></div>
                {member.image && (
                  <Image 
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-lg font-medium">{member.name}</p>
                  <p className="text-sm text-[var(--foreground-secondary)]">{member.caption}</p>
                </div>
              </div>
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
              title="Sleep Debt"
              value={stats.sleepLost}
              subtext="Hours and counting"
            />
            <AnimatedStat
              key="coffee"
              title="Coffee Consumed"
              value={stats.coffeeConsumed}
              subtext="Cups since our last commit"
            />
          </div>
        </Container>
      </section>
    </Layout>
  );
}
