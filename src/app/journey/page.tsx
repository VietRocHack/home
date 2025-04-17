import HackathonJourneyGallery from '@/components/HackathonJourneyGallery';
import Layout from '@/components/Layout';
import Container from '@/components/Container';
import { Suspense } from 'react';

export const metadata = {
  title: 'Hackathon Journey | VietRocHack',
  description: 'Follow VietRocHack\'s journey through hackathons, victories, and growth as a team.',
};

export default function JourneyPage() {
  return (
    <Layout>
      <Container>
        <div className="py-12">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[var(--foreground)]">
              Our Hackathon Journey
            </h1>
            <p className="text-lg text-[var(--foreground-secondary)] max-w-3xl mx-auto">
              From our first hackathon to our latest victories, follow the VietRocHack journey through
              memorable moments, team growth, and the evolution of our projects.
            </p>
          </div>
          
          <Suspense fallback={<div className="text-center py-8">Loading gallery...</div>}>
            <HackathonJourneyGallery />
          </Suspense>
        </div>
      </Container>
    </Layout>
  );
} 