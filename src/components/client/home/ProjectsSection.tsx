"use client";
import React, { useState, useRef } from "react";

import { motion, useInView } from "framer-motion";
import ProjectTag from "./ProjectTag";
import ProjectCard from "./ProjectCard";

// Define types for project data
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tag: string[];
  gitUrl: string;
  previewUrl: string;
}

interface ProjectsData {
  title: string;
  data: Project[];
}

const ProjectsSection: React.FC<ProjectsData> = ({ title, data }) => {
  const [tag, setTag] = useState<string>("All");
  const ref = useRef<HTMLUListElement | null>(null);
  const isInView = useInView(ref, { once: true });

  const handleTagChange = (newTag: string) => {
    setTag(newTag);
  };

  const filteredProjects = data.filter((project) => project.tag.includes(tag));

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  const allTags = [
    "All",
    ...new Set(
      data.flatMap((project) => project.tag).filter((tag) => tag !== "All")
    ),
  ];

  return (
    <section id="projects">
      <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
        {title}
      </h2>
      <div className="text-white flex flex-row justify-center items-center gap-2 py-6">
        {allTags.map((tagName) => (
          <ProjectTag
            key={tagName}
            onClick={() => handleTagChange(tagName)}
            name={tagName}
            isSelected={tag === tagName}
          />
        ))}
      </div>
      <ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-12">
        {filteredProjects.map((project, index) => (
          <motion.li
            key={project.id}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.4 }}
          >
            <ProjectCard
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectsSection;
