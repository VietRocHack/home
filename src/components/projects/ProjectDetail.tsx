"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Project } from "@/utils/dataUtils";

interface ProjectDetailProps {
  project: Project & {
    hackathonName: string;
    hackathonYear: number;
    hackathonId: string;
    hackathonAchievement: string;
  };
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  return (
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
                className="px-3 py-1 bg-[var(--background-secondary)] text-gray-200 rounded-full text-sm"
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
              className="fade-in-content"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <p className="text-[var(--accent-yellow)] text-lg mb-2">
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
                        className="px-3 py-1 bg-[var(--accent-yellow)] text-black rounded-full text-sm font-medium"
                      >
                        {achievement}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <p className="text-[var(--foreground-secondary)] mb-8">{project.description}</p>
              
              <div className="flex flex-wrap gap-4">
                {project.devpostLink && (
                  <Link href={project.devpostLink} target="_blank" rel="noopener noreferrer">
                    <button className="px-6 py-2 bg-[var(--accent-yellow)] text-black font-medium rounded-lg hover:bg-opacity-80 transition-all">
                      DevPost
                    </button>
                  </Link>
                )}
                
                {project.demoLink && (
                  <Link href={project.demoLink} target="_blank" rel="noopener noreferrer">
                    <button className="px-6 py-2 bg-[var(--accent-red)] text-white font-medium rounded-lg hover:bg-opacity-80 transition-all">
                      Live Demo
                    </button>
                  </Link>
                )}
                
                {project.githubLink && (
                  <Link href={project.githubLink} target="_blank" rel="noopener noreferrer">
                    <button className="px-6 py-2 bg-[var(--background-secondary)] text-white font-medium rounded-lg hover:bg-opacity-80 transition-all">
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
  );
} 