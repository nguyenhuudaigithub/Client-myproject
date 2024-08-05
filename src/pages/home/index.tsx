// pages/home/index.tsx
import React, { useEffect, useState } from "react";
import AboutSection from "@/components/client/home/AboutSection";
import AchievementsSection from "@/components/client/home/AchievementsSection";
import EmailSection from "@/components/client/home/EmailSection";
import HeroSection from "@/components/client/home/HeroSection";
import ProjectsSection from "@/components/client/home/ProjectsSection";
import { Divider } from "antd";
import styles from "styles/client.module.scss";
import { IProfile } from "@/types/backend";

interface DataProfile {
  data: IProfile;
}
const HomePage: React.FC<DataProfile> = ({ data }) => {
  return (
    <div className={`${styles["container"]} ${styles["home-section"]}`}>
      <Divider />
      <HeroSection heroSection={data.heroSection} />
      <Divider />
      <AchievementsSection achievementsList={data.achievementsList} />
      <Divider />
      <AboutSection tab_Data={data.tabData} about={data.about} />
      <Divider />
      <ProjectsSection
        title={data.projectsData[0].title}
        data={data.projectsData[0].data}
      />
      <Divider />
      <EmailSection
        title={data.contact[0].title}
        detail={data.contact[0].detail}
        socialMedia={data.contact[0].socialMedia}
      />
    </div>
  );
};

export default HomePage;
