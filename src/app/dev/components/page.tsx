import React from 'react';
import Link from 'next/link';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Container from '@/components/Container';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ComponentsDevPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <header className="sticky top-0 z-50 w-full bg-[var(--background-secondary)] border-b border-gray-800">
        <Container>
          <div className="py-4 flex justify-between items-center">
            <h1 className="text-xl font-semibold">VietRocHack Components</h1>
            <Link href="/" className="text-[var(--accent-cyan)] hover:text-[var(--accent-cyan)]/80 transition">
              Back to Home
            </Link>
          </div>
        </Container>
      </header>

      <main>
        <Container className="py-16">
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Reusable Components</h2>
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Navbar Example</h3>
                <div className="border border-gray-800 rounded-lg overflow-hidden">
                  <Navbar />
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Footer Example</h3>
                <div className="border border-gray-800 rounded-lg overflow-hidden">
                  <Footer />
                </div>
              </div>
            </div>
          </section>
          
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Button Component</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Primary</h3>
                <Button variant="primary">Primary Button</Button>
                <Button variant="primary" disabled>Primary Disabled</Button>
                <Button variant="primary" size="sm">Small Button</Button>
                <Button variant="primary" size="lg">Large Button</Button>
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Secondary</h3>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="secondary" disabled>Secondary Disabled</Button>
                <Button variant="secondary" size="sm">Small Button</Button>
                <Button variant="secondary" size="lg">Large Button</Button>
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">Ghost</h3>
                <Button variant="ghost">Ghost Button</Button>
                <Button variant="ghost" disabled>Ghost Disabled</Button>
                <Button variant="ghost" size="sm">Small Button</Button>
                <Button variant="ghost" size="lg">Large Button</Button>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Card Component</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card variant="default">
                <h3 className="text-xl font-semibold mb-3">Default Card</h3>
                <p className="text-[var(--foreground-secondary)] mb-4">Basic card with no hover effects.</p>
              </Card>
              
              <Card variant="project">
                <h3 className="text-xl font-semibold mb-3">Project Card</h3>
                <p className="text-[var(--foreground-secondary)] mb-4">Card with red border hover effect.</p>
                <div className="flex justify-end">
                  <Button variant="secondary" size="sm">View Project</Button>
                </div>
              </Card>
              
              <Card variant="team">
                <h3 className="text-xl font-semibold mb-3">Team Card</h3>
                <div className="w-20 h-20 bg-gray-700 rounded-full mb-4"></div>
                <h4 className="font-medium">Team Member</h4>
                <p className="text-[var(--foreground-secondary)]">Role / Position</p>
              </Card>
              
              <Card variant="zoom">
                <h3 className="text-xl font-semibold mb-3">Zoom Card</h3>
                <p className="text-[var(--foreground-secondary)]">Card with zoom effect on hover.</p>
              </Card>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Typography</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Headings</h3>
                <h1 className="text-4xl font-bold mb-2">Heading 1 (text-4xl)</h1>
                <h2 className="text-3xl font-bold mb-2">Heading 2 (text-3xl)</h2>
                <h3 className="text-2xl font-semibold mb-2">Heading 3 (text-2xl)</h3>
                <h4 className="text-xl font-semibold mb-2">Heading 4 (text-xl)</h4>
                <h5 className="text-lg font-semibold mb-2">Heading 5 (text-lg)</h5>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">Body Text</h3>
                <p className="text-[var(--foreground)] mb-2">Primary text (--foreground)</p>
                <p className="text-[var(--foreground-secondary)] mb-2">Secondary text (--foreground-secondary)</p>
                <p className="text-sm text-[var(--foreground-secondary)] mb-2">Small text (text-sm)</p>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Colors</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-6 bg-[var(--background)] rounded-lg border border-gray-800">
                <p className="font-medium">Background Primary</p>
                <p className="text-[var(--foreground-secondary)] text-sm">--background</p>
              </div>
              <div className="p-6 bg-[var(--background-secondary)] rounded-lg border border-gray-800">
                <p className="font-medium">Background Secondary</p>
                <p className="text-[var(--foreground-secondary)] text-sm">--background-secondary</p>
              </div>
              <div className="p-6 bg-[var(--accent-red)] rounded-lg text-white">
                <p className="font-medium">Accent Red</p>
                <p className="text-white/80 text-sm">--accent-red</p>
              </div>
              <div className="p-6 bg-[var(--accent-yellow)] rounded-lg text-black">
                <p className="font-medium">Accent Yellow</p>
                <p className="text-black/80 text-sm">--accent-yellow</p>
              </div>
              <div className="p-6 bg-[var(--accent-cyan)] rounded-lg text-black">
                <p className="font-medium">Accent Cyan</p>
                <p className="text-black/80 text-sm">--accent-cyan</p>
              </div>
              <div className="p-6 bg-[var(--foreground)] rounded-lg text-[var(--background)]">
                <p className="font-medium">Text Primary</p>
                <p className="text-[var(--background)]/80 text-sm">--foreground</p>
              </div>
              <div className="p-6 bg-[var(--foreground-secondary)] rounded-lg text-[var(--background)]">
                <p className="font-medium">Text Secondary</p>
                <p className="text-[var(--background)]/80 text-sm">--foreground-secondary</p>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Form Elements</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-[var(--foreground)] mb-2 font-medium">Text Input</label>
                  <input 
                    type="text" 
                    id="name" 
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 bg-[var(--background-secondary)] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-cyan)] focus:border-transparent text-[var(--foreground)]" 
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-[var(--foreground)] mb-2 font-medium">Email Input</label>
                  <input 
                    type="email" 
                    id="email" 
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-[var(--background-secondary)] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-cyan)] focus:border-transparent text-[var(--foreground)]" 
                  />
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="message" className="block text-[var(--foreground)] mb-2 font-medium">Textarea</label>
                  <textarea 
                    id="message" 
                    placeholder="Enter your message"
                    rows={4}
                    className="w-full px-4 py-3 bg-[var(--background-secondary)] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent-cyan)] focus:border-transparent text-[var(--foreground)]" 
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-[var(--foreground)] mb-2 font-medium">Checkbox</label>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="subscribe" 
                      className="h-5 w-5 rounded border-gray-700 text-[var(--accent-cyan)] focus:ring-[var(--accent-cyan)]" 
                    />
                    <label htmlFor="subscribe" className="ml-2 text-[var(--foreground-secondary)]">Subscribe to newsletter</label>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Container>
      </main>

      <footer className="bg-[var(--background-secondary)] py-8 border-t border-gray-800">
        <Container>
          <div className="text-center text-[var(--foreground-secondary)]">
            <p>VietRocHack Component Library</p>
          </div>
        </Container>
      </footer>
    </div>
  );
} 