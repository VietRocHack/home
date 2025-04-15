import Layout from '@/components/Layout';
import Container from '@/components/Container';
import Button from '@/components/Button';
import Card from '@/components/Card';
import RotatingLogo from '@/components/RotatingLogo';
import AnimatedStat from '@/components/AnimatedStat';
import BackgroundCarousel from '@/components/BackgroundCarousel';
import PhotoGallery from '@/components/PhotoGallery';
import HackathonTimeline from '@/components/HackathonTimeline';
import Link from 'next/link';
import Image from 'next/image';

const featuredProjects = [
  {
    title: "ChattR",
    description: "A chat app that runs even when our team doesn't.",
    tags: ["React", "Firebase", "Node.js"],
    github: "https://github.com/vietrochack/chattr",
    demo: "https://chattr.vietrochack.com"
  },
  {
    title: "StudyBuddy",
    description: "Like having a friend who actually does the reading.",
    tags: ["Next.js", "Tailwind", "OpenAI"],
    github: "https://github.com/vietrochack/studybuddy",
    demo: "https://studybuddy.vietrochack.com"
  }
];

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

const stats = [
  {
    title: "Hackathons Entered",
    value: 7,
    subtext: "And survived most of them"
  },
  {
    title: "Bugs Denied",
    value: "All",
    subtext: "They're features"
  },
  {
    title: "Sleep Debt",
    value: "∞",
    subtext: "Hours and counting"
  },
  {
    title: "Coffee Consumed",
    value: 283,
    subtext: "Cups since our last commit"
  }
];

export default function Home() {
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">We're VietRocHack.</h2>
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
            A few things we're not totally embarrassed to show:
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => (
              <Card variant="project" key={index}>
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-[var(--foreground-secondary)] mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-800 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3 mt-auto">
                  <Link href={project.github}>
                    <Button variant="secondary" size="sm">GitHub</Button>
                  </Link>
                  <Link href={project.demo}>
                    <Button variant="ghost" size="sm">Demo</Button>
                  </Link>
                </div>
              </Card>
            ))}
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
            Swipe through our adventures across hackathons nationwide. We've built, broken, fixed, and celebrated from coast to coast.
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
            {stats.map((stat, index) => (
              <AnimatedStat
                key={index}
                title={stat.title}
                value={stat.value}
                subtext={stat.subtext}
              />
            ))}
          </div>
        </Container>
      </section>
    </Layout>
  );
}
