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

const projectsData: ProjectsData = {
  title: "My Projects",
  data: [
    {
      id: 1,
      title: "React Portfolio Website",
      description: "Project 1 description",
      image:
        "https://th.bing.com/th/id/OIP.bB3jSGIL66ld_Mhfm_OHIwHaEK?rs=1&pid=ImgDetMain",
      tag: ["All", "Web"],
      gitUrl: "/",
      previewUrl: "/",
    },
    {
      id: 2,
      title: "Photography Portfolio Website",
      description: "Project 2 description",
      image:
        "https://th.bing.com/th/id/OIP.bB3jSGIL66ld_Mhfm_OHIwHaEK?rs=1&pid=ImgDetMain",
      tag: ["All", "Web"],
      gitUrl: "/",
      previewUrl: "/",
    },
    {
      id: 3,
      title: "E-commerce Application",
      description: "Project 3 description",
      image:
        "https://th.bing.com/th/id/OIP.bB3jSGIL66ld_Mhfm_OHIwHaEK?rs=1&pid=ImgDetMain",
      tag: ["All", "Web"],
      gitUrl: "/",
      previewUrl: "/",
    },
    {
      id: 4,
      title: "Food Ordering Application",
      description: "Project 4 description",
      image:
        "https://th.bing.com/th/id/OIP.bB3jSGIL66ld_Mhfm_OHIwHaEK?rs=1&pid=ImgDetMain",
      tag: ["All", "Mobile"],
      gitUrl: "/",
      previewUrl: "/",
    },
    {
      id: 5,
      title: "React Firebase Template",
      description: "Authentication and CRUD operations",
      image:
        "https://th.bing.com/th/id/OIP.bB3jSGIL66ld_Mhfm_OHIwHaEK?rs=1&pid=ImgDetMain",
      tag: ["All", "Web"],
      gitUrl: "/",
      previewUrl: "/",
    },
    {
      id: 6,
      title: "Full-stack Roadmap",
      description: "Project 5 description",
      image:
        "https://th.bing.com/th/id/OIP.bB3jSGIL66ld_Mhfm_OHIwHaEK?rs=1&pid=ImgDetMain",
      tag: ["All", "Web"],
      gitUrl: "/",
      previewUrl: "/",
    },
  ],
};

const ProjectsSection: React.FC = () => {
  const [tag, setTag] = useState<string>("All");
  const ref = useRef<HTMLUListElement | null>(null);
  const isInView = useInView(ref, { once: true });

  const handleTagChange = (newTag: string) => {
    setTag(newTag);
  };

  const filteredProjects = projectsData.data.filter((project) =>
    project.tag.includes(tag)
  );

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  const allTags = [
    "All",
    ...new Set(
      projectsData.data
        .flatMap((project) => project.tag)
        .filter((tag) => tag !== "All")
    ),
  ];

  return (
    <section id="projects">
      <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
        {projectsData.title}
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
