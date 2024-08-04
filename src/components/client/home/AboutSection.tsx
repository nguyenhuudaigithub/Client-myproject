"use client";
import React, { useTransition, useState } from "react";
import TabButton from "./TabButton";

// Define types for tab data
interface TabData {
  title: string;
  id: string;
  content: string;
}

const about = {
  title: "About Me",
  imageAbout:
    "https://th.bing.com/th/id/OIP.bB3jSGIL66ld_Mhfm_OHIwHaEK?rs=1&pid=ImgDetMain",
  detail:
    "I am a full stack web developer with a passion for creating interactive and responsive web applications. I have experience working with JavaScript, React, Redux, Node.js, Express, PostgreSQL, Sequelize, HTML, CSS, and Git. I am a quick learner and I am always looking to expand my knowledge and skill set. I am a team player and I am excited to work with others to create amazing applications.",
};

const TAB_DATA: TabData[] = [
  {
    title: "Skills",
    id: "skills",
    content: `
      <ul class="list-disc pl-2">
        <li>Node.js</li>
        <li>Express</li>
        <li>PostgreSQL</li>
        <li>Sequelize</li>
        <li>JavaScript</li>
        <li>React</li>
      </ul>
    `,
  },
  {
    title: "Education",
    id: "education",
    content: `
      <ul class="list-disc pl-2">
        <li>Fullstack Academy of Code</li>
        <li>University of California, Santa Cruz</li>
      </ul>
    `,
  },
  {
    title: "Certifications",
    id: "certifications",
    content: `
      <ul class="list-disc pl-2">
        <li>AWS Cloud Practitioner</li>
        <li>Google Professional Cloud Developer</li>
      </ul>
    `,
  },
];

const AboutSection: React.FC = () => {
  const [tab, setTab] = useState<string>("skills");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id: string) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section className="text-white" id="about">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <img src={about.imageAbout} alt="About" width={500} height={500} />
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2 className="text-4xl font-bold text-white mb-4">{about.title}</h2>
          <p className="text-base lg:text-lg">{about.detail}</p>
          <div className="flex flex-row justify-start mt-8">
            {TAB_DATA.map((tabData) => (
              <TabButton
                key={tabData.id}
                selectTab={() => handleTabChange(tabData.id)}
                active={tab === tabData.id}
              >
                {tabData.title}
              </TabButton>
            ))}
          </div>
          <div className="mt-8">
            <div
              dangerouslySetInnerHTML={{
                __html: TAB_DATA.find((t) => t.id === tab)?.content || "",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
