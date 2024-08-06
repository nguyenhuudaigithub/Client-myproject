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
      <HeroSection heroData={data.heroSection} />
      <Divider />
      <AchievementsSection achievementsList={data.achievementsList} />
      <Divider />
      <AboutSection about={data.about} tab_Data={data.tabData} />
      <Divider />
      <ProjectsSection projectsData={data.projectsData} />
      <Divider />
      <EmailSection contact={data.contact} />
    </div>
  );
};

export default HomePage;
