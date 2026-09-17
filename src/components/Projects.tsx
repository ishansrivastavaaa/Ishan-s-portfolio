import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ExternalLink, Github } from 'lucide-react';
import type { Project } from '../types';

const projects: Project[] = [
  {
    id: "unistay",
    title: "UNIstay",
    description: "Peer-to-Peer Student Rental Architecture. Constructed a robust relational layout model storing live accommodation inventory, real-time feedback, and dynamic availability. Developed custom, high-fidelity visual interfaces targeted to remove friction on mobile device browsing sessions.",
    tags: ["Systems Design", "Relational Databases", "UI/UX Guidelines"],
    github: "https://github.com/ishansrivastavaaa",
    link: "#"
  },
  {
    id: "helpers-app",
    title: "Helpers",
    description: "AI-Driven Automated Matching Engine. Built an automation framework that converts raw, unstructured textual leads into highly structured, actionable JSON outputs. Optimized API calls and parsing logic, ensuring lightning-fast matching between target consumers and regional service operators.",
    tags: ["Python", "SQL", "Generative AI APIs", "Workflow Automation"],
    github: "https://github.com/ishansrivastavaaa"
  }
];

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className={`relative ${index % 2 !== 0 ? 'md:mt-32' : ''} [perspective:1000px]`}
    >
      {/* Background offset block */}
      <div className="absolute top-6 left-6 w-full h-full border-2 border-brand-orange z-0 transition-transform duration-300" />
      
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="bg-brand-green p-10 relative z-10 h-full flex flex-col shadow-2xl"
      >
        <div style={{ transform: "translateZ(30px)" }} className="flex flex-col h-full pointer-events-none">
          <div className="flex justify-between items-start mb-8 pointer-events-auto">
            <h3 className="font-['Playfair_Display'] text-4xl font-black text-base-light max-w-[80%] leading-tight">
              {project.title}
            </h3>
            <div className="flex gap-4">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-base-light hover:text-brand-orange transition-colors">
                  <Github size={28} />
                </a>
              )}
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-base-light hover:text-brand-orange transition-colors">
                  <ExternalLink size={28} />
                </a>
              )}
            </div>
          </div>
          
          <p className="text-base-light/90 font-medium text-lg mb-12 flex-grow leading-relaxed">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-3 mt-auto">
            {project.tags.map(tag => (
              <span 
                key={tag} 
                className="px-4 py-1.5 bg-base-dark text-brand-orange text-xs font-mono tracking-widest font-bold uppercase"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-32 px-6 bg-base-dark text-base-light relative overflow-hidden">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-brand-orange opacity-10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="mb-32 relative pl-4 md:pl-0">
           <h2 className="font-['Playfair_Display'] text-[12vw] font-black leading-none text-outline-2 text-brand-green opacity-60 absolute -top-10 -left-10 whitespace-nowrap pointer-events-none select-none">
             SELECTED WORK
           </h2>
           <h2 className="font-['Playfair_Display'] text-6xl md:text-8xl font-black leading-none text-brand-orange relative z-10">
             Projects
           </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
