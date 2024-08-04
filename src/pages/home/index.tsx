import AboutSection from "@/components/client/home/AboutSection";
import AchievementsSection from "@/components/client/home/AchievementsSection";
import EmailSection from "@/components/client/home/EmailSection";
import HeroSection from "@/components/client/home/HeroSection";
import ProjectsSection from "@/components/client/home/ProjectsSection";
import { Divider } from "antd";
import styles from "styles/client.module.scss";

const HomePage = () => {
  return (
    <div className={`${styles["container"]} ${styles["home-section"]}`}>
      <Divider />
      <HeroSection />
      <div style={{ margin: 50 }}></div>
      <Divider />
      <AchievementsSection />
      <AboutSection />
      <ProjectsSection />
      <EmailSection />
    </div>
  );
};

export default HomePage;
