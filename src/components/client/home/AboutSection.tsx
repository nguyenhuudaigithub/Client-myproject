"use client";
import React, { useTransition, useState } from "react";
import TabButton from "./TabButton";

// Define types for tab data
interface TabData {
  title: string;
  id: string;
  content: string;
}
interface about {
  title: string;
  imageAbout: string;
  detail: string;
}

interface TAB_DATA {
  about: about;
  tab_Data: TabData[];
}

const AboutSection: React.FC<TAB_DATA> = ({ about, tab_Data }) => {
  const data = about[0];

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
        <img src={data.imageAbout} alt="About" width={500} height={500} />
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2 className="text-4xl font-bold text-white mb-4">{data.title}</h2>
          <p className="text-base lg:text-lg">{data.detail}</p>
          <div className="flex flex-row justify-start mt-8">
            {tab_Data.map((tabData) => (
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
                __html: tab_Data.find((t) => t.id === tab)?.content || "",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
