"use client"
import Layout from '@/components/Layout';
import Container from '@/components/Container';
import { useEffect, useState } from 'react';
import Button from '@/components/Button';
import Image from 'next/image';
import teamJson from '@/data/team.json';

type TeamMember = typeof teamJson.team[number];

const teamData: TeamMember[] = teamJson.team;

export default function TeamPage() {
  // Animation state for each profile (true = visible, false = hidden)
  const [visibleSections, setVisibleSections] = useState(Array(teamData.length).fill(false));
  // Mode state
  const [mode, setMode] = useState<'professional' | 'personal'>('professional');
  // Ratings for each member (personal mode)
  const [ratings, setRatings] = useState<number[]>(Array(teamData.length).fill(5));

  useEffect(() => {
    const handleScroll = () => {
      setVisibleSections(() => {
        return teamData.map((_, idx) => {
          const section = document.getElementById(teamData[idx].id);
          if (section) {
            const rect = section.getBoundingClientRect();
            return rect.top < window.innerHeight * 0.7 && rect.bottom > window.innerHeight * 0.3;
          }
          return false;
        });
      });
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Layout>
      <Container>
        <h1 className="text-6xl font-extrabold mb-12 text-center drop-shadow-lg">Meet the Team</h1>
        <div className="flex justify-center items-center mb-8">
          <span className="mr-4 text-lg font-semibold">Tuff Mode 🥀</span>
          <button
            className={`relative w-16 h-8 rounded-full transition-colors duration-300 ${mode === 'professional' ? 'bg-yellow-500' : 'bg-gray-400'}`}
            onClick={() => setMode(mode === 'professional' ? 'personal' : 'professional')}
            aria-label="Toggle Tough Mode"
          >
            <span
              className="absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow transition-transform duration-300"
              style={{ transform: mode === 'professional' ? 'translateX(32px)' : 'translateX(0)' }}
            />
          </button>
        </div>
        <div className="sticky top-0 z-50 bg-[var(--background)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--background)]/80">
          <nav className="flex flex-wrap justify-center gap-4 py-4">
            {teamData.map((member) => (
              <a
                key={member.id}
                href={`#${member.id}`}
                className="px-6 py-2 rounded-full bg-[var(--background-secondary)] text-[var(--accent-yellow)] font-semibold shadow hover:bg-[var(--accent-yellow)] hover:text-black transition-all duration-200"
              >
                {member.name}
              </a>
            ))}
          </nav>
        </div>
        <div className="flex flex-col">
           {teamData.map((member, idx) => {
             const isPersonal = mode === 'personal';
             return (
               <section
                 key={member.id}
                 id={member.id}
                 className={`flex flex-col md:flex-row items-center justify-center min-h-screen gap-10 py-12 scroll-mt-24 transition-all duration-700 ${visibleSections[idx] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                 style={{ willChange: 'opacity, transform' }}
               >
                 <div className="flex items-center justify-center w-[400px] h-[400px] md:w-[480px] md:h-[480px] bg-transparent">
                   <Image
                     src={member.photo2}
                     alt={member.name}
                     width={380}
                     height={380}
                     className="rounded-2xl object-cover shadow-lg w-full h-full"
                   />
                 </div>
                 <div className="flex-1 flex flex-col justify-center items-center md:items-start gap-2">
                   <h2 className="text-4xl font-bold text-[var(--accent-yellow)] mb-2">{member.name}</h2>
                   <p className="text-xl text-[var(--foreground-secondary)] mb-2">{isPersonal ? member["role-meme"] : member.role}</p>
                   {isPersonal ? (
                     <blockquote className="text-lg italic text-[var(--foreground)] mb-4 px-6 py-4 border-l-4 border-[var(--accent-yellow)] bg-[var(--background-secondary)]/60 rounded-r-xl">
                       “{member["bio-meme"]}”
                     </blockquote>
                   ) : (
                     <p className="text-lg text-[var(--foreground)] mb-4">{member.bio}</p>
                   )}
                   {isPersonal ? (
                     <div className="text-md text-gray-400 mb-2">
                       <span className="font-semibold">Hobbies:</span> {member.hobbies}
                     </div>
                   ) : (
                     <div className="text-md text-gray-400 mb-2">
                       <span className="font-semibold">{member.school}</span> &middot; {member.major} &middot; Class of {member.graduation}
                     </div>
                   )}
                   <div className="flex gap-3 mt-2">
                     {isPersonal ? (
                       <a href={member["socialLinks-meme"]?.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
                         <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.25.75a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/></svg>
                       </a>
                     ) : (
                       <>
                         <a href={member.socialLinks.github} target="_blank" rel="noopener noreferrer" className="hover:text-black">
                           <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.38 7.86 10.89.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.75-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.45.11-3.02 0 0 .98-.31 3.2 1.18a11.1 11.1 0 0 1 2.92 0c2.22-1.49 3.2-1.18 3.2-1.18.63 1.57.23 2.73.11 3.02.74.8 1.19 1.83 1.19 3.09 0 4.43-2.7 5.41-5.27 5.7.42.36.8 1.09.8 2.2 0 1.59-.01 2.87-.01 3.26 0 .31.21.67.8.56C20.71 21.38 24 17.08 24 12c0-6.27-5.23-11.5-12-11.5z"/></svg>
                         </a>
                         <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">
                           <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 11.28h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.88v1.36h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59v5.61z"/></svg>
                         </a>
                       </>
                     )}
                   </div>
                   <div className="mt-2">
                     <span className="font-semibold">Skills:</span> <span className="ml-1">{isPersonal && member["skills-meme"] ? member["skills-meme"].join(', ') : member.skills.join(', ')}</span>
                   </div>
                   {isPersonal ? (
                     <div className="mt-6 w-full flex flex-col items-center">
                       <label htmlFor={`rating-${idx}`} className="font-semibold text-lg mb-2">Rating</label>
                       <input
                         id={`rating-${idx}`}
                         type="range"
                         min={1}
                         max={10}
                         value={ratings[idx]}
                         className="w-64 accent-yellow-500"
                         onChange={e => {
                           const newRatings = [...ratings];
                           newRatings[idx] = Number(e.target.value);
                           setRatings(newRatings);
                         }}
                       />
                       <div className="mt-2 text-xl font-bold text-[var(--accent-yellow)]">{ratings[idx]}</div>
                     </div>
                   ) : (
                     <Button variant="ghost" size="md" className="mt-4">Contact Info</Button>
                   )}
                 </div>
               </section>
             );
           })}
        </div>
      </Container>
    </Layout>
  );
}
