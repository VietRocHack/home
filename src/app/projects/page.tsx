"use client";

import { useEffect, useRef, useState } from "react";
import { getAllProjects, getHackathonByProjectId } from "@/utils/dataUtils";
import styles from "./projects.module.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectIntro from "@/components/projects/ProjectIntro";
import ProjectDetail from "@/components/projects/ProjectDetail";
import ProjectBrowser from "@/components/projects/ProjectBrowser";
import NavigationDots from "@/components/projects/NavigationDots";

// Get all projects with hackathon info
const allProjects = getAllProjects().map(project => {
  const hackathon = getHackathonByProjectId(project.id);
  return {
    ...project,
    hackathonName: hackathon?.name || "",
    hackathonYear: hackathon?.year || 0,
    hackathonId: hackathon?.id || "",
    hackathonAchievement: hackathon?.achievement || "",
  };
});

export default function ProjectsPage() {
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const introSectionRef = useRef<HTMLDivElement>(null);
  const projectBrowserRef = useRef<HTMLDivElement>(null);
  
  // Calculate total number of sections (intro + projects + browser)
  const totalSections = allProjects.length + 2;
  
  // Initialize refs array based on number of projects
  useEffect(() => {
    // Account for intro section and project browser section
    sectionRefs.current = Array(totalSections)
      .fill(null)
      .map((_, i) => sectionRefs.current[i] || null);
  }, [totalSections]);

  // Handle smooth scrolling between sections
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPosition = container.scrollTop;
      const windowHeight = window.innerHeight;
      
      sectionRefs.current.forEach((section, index) => {
        if (!section) return;
        
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (
          scrollPosition >= sectionTop - windowHeight / 3 &&
          scrollPosition < sectionBottom - windowHeight / 3
        ) {
          setActiveSection(index);
        }
      });
    };
    
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to the selected section
  const scrollToSection = (index: number) => {
    if (sectionRefs.current[index]) {
      sectionRefs.current[index]?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  // Helper function to set refs
  const setRef = (el: HTMLElement | null, index: number) => {
    sectionRefs.current[index] = el;
  };

  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)]">
      <Navbar />
      
      <main ref={containerRef} className={styles.projectContainer}>
        {/* Navigation dots */}
        <NavigationDots 
          totalSections={totalSections}
          activeSection={activeSection}
          onDotClick={scrollToSection}
        />
        
        {/* Introduction Section */}
        <section 
          ref={(el) => {
            setRef(el, 0);
            // @ts-expect-error - TypeScript doesn't know the ref type correctly
            introSectionRef.current = el;
          }}
          className={styles.projectSection}
        >
          <ProjectIntro 
            projects={allProjects}
            onExploreClick={() => scrollToSection(1)}
            onBrowseClick={() => scrollToSection(totalSections - 1)}
            onProjectPreviewClick={(index) => scrollToSection(index + 1)}
          />
        </section>

        {/* Project sections */}
        {allProjects.map((project, index) => (
          <section
            key={project.id}
            ref={(el) => setRef(el, index + 1)}
            className={styles.projectSection}
          >
            <ProjectDetail project={project} />
          </section>
        ))}
        
        {/* Project Browser Section */}
        <section 
          ref={(el) => {
            setRef(el, totalSections - 1);
            // @ts-expect-error - TypeScript doesn't know the ref type correctly
            projectBrowserRef.current = el;
          }}
          className={`${styles.projectSection} bg-[var(--background-secondary)]`}
        >
          <ProjectBrowser projects={allProjects} />
            <Footer />
        </section>
      </main>
      
    </div>
  );
} 