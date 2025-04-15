import Layout from '@/components/Layout';
import Container from '@/components/Container';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout>
      <section className="py-16 md:py-24">
        <Container>
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">VietRocHack</h1>
            <p className="text-xl text-[var(--foreground-secondary)] max-w-2xl mb-8">
              A Vietnamese hackathon team from the University of Rochester dedicated to creativity, innovation, and building impactful solutions.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="primary" size="lg">
                View Projects
              </Button>
              <Button variant="ghost" size="lg">
                Meet the Team
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 bg-[var(--background-secondary)]">
        <Container>
          <h2 className="text-3xl font-bold mb-8 text-center">Components Preview</h2>
          <div className="flex justify-center mb-8">
            <Link 
              href="/dev/components" 
              className="text-[var(--accent-cyan)] hover:text-[var(--accent-cyan)]/80 transition font-medium"
            >
              View All Components →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card variant="project">
              <h3 className="text-xl font-semibold mb-3">Project Card</h3>
              <p className="text-[var(--foreground-secondary)] mb-4">
                View our project designs and implementations.
              </p>
            </Card>
            
            <Card variant="team">
              <h3 className="text-xl font-semibold mb-3">Team Card</h3>
              <p className="text-[var(--foreground-secondary)] mb-4">
                Meet our talented team members.
              </p>
            </Card>
            
            <Card variant="zoom">
              <h3 className="text-xl font-semibold mb-3">Vision Card</h3>
              <p className="text-[var(--foreground-secondary)] mb-4">
                Learn about our mission and vision.
              </p>
            </Card>
          </div>
        </Container>
      </section>
    </Layout>
  );
}
