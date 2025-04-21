"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { getAllProjects, getHackathonByProjectId } from "@/utils/dataUtils";
import styles from "./projects.module.css";

// Get all projects from all hackathons with their associated hackathon info
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
  
  // Initialize refs array based on number of projects
  useEffect(() => {
    sectionRefs.current = Array(allProjects.length)
      .fill(null)
      .map((_, i) => sectionRefs.current[i] || null);
  }, []);

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

  const setRef = (el: HTMLElement | null, index: number) => {
    sectionRefs.current[index] = el;
  };

  return (
    <main ref={containerRef} className={styles.projectContainer}>
      {/* Navigation dots */}
      <div className={styles.navDots}>
        {allProjects.map((_, index) => (
          <button
            key={`nav-dot-${index}`}
            onClick={() => scrollToSection(index)}
            className={`${styles.navDot} ${activeSection === index ? styles.navDotActive : ""}`}
            aria-label={`Go to project ${index + 1}`}
          />
        ))}
      </div>

      {/* Project sections */}
      {allProjects.map((project, index) => (
        <section
          key={project.id}
          ref={(el) => setRef(el, index)}
          className={styles.projectSection}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Project Image */}
              <div className="order-2 md:order-1">
                <motion.div 
                  className="relative w-full aspect-video rounded-lg overflow-hidden shadow-xl"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <Image
                    src={`/${project.thumbnail}`}
                    alt={project.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </motion.div>
                
                <motion.div 
                  className="flex flex-wrap mt-6 gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-800 text-gray-200 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </motion.div>
              </div>

              {/* Project Info */}
              <div className="order-1 md:order-2">
                <div className="space-y-6">
                  <motion.div
                    className={styles.fadeInContent}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <p className="text-[#FFDC00] text-lg mb-2">
                      {project.hackathonName} ({project.hackathonYear})
                    </p>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-4">
                      {project.name}
                    </h1>
                    <p className="text-xl text-gray-300 mb-6 italic">
                      &ldquo;{project.tagline}&rdquo;
                    </p>
                    
                    {project.achievements && project.achievements.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-lg text-gray-300 mb-2">Achievements:</h3>
                        <div className="flex flex-wrap gap-2">
                          {project.achievements.map((achievement) => (
                            <span
                              key={achievement}
                              className="px-3 py-1 bg-[#FF3C38] text-white rounded-full text-sm font-medium"
                            >
                              {achievement}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <p className="text-gray-400 mb-8">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-4">
                      {project.devpostLink && (
                        <Link href={project.devpostLink} target="_blank" rel="noopener noreferrer">
                          <button className="px-6 py-2 bg-[#FFDC00] text-black font-medium rounded-lg hover:bg-opacity-80 transition-all">
                            DevPost
                          </button>
                        </Link>
                      )}
                      
                      {project.demoLink && (
                        <Link href={project.demoLink} target="_blank" rel="noopener noreferrer">
                          <button className="px-6 py-2 bg-[#FF3C38] text-white font-medium rounded-lg hover:bg-opacity-80 transition-all">
                            Live Demo
                          </button>
                        </Link>
                      )}
                      
                      {project.githubLink && (
                        <Link href={project.githubLink} target="_blank" rel="noopener noreferrer">
                          <button className="px-6 py-2 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-700 transition-all">
                            GitHub
                          </button>
                        </Link>
                      )}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
    </main>
  );
} 