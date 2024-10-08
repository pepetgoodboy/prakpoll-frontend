import DefaultLayout from "@/components/Layouts/DefaultLayout";
import HeroSection from "../Molecules/HeroSection";
import AboutSection from "../Molecules/AboutSection";
import ReportSection from "../Molecules/ReportSection";
import { Element } from "react-scroll";

export default function HomeContainer() {
  return (
    <>
      <DefaultLayout>
        <HeroSection />
        <Element name="about">
          <AboutSection />
        </Element>
        <Element name="report">
          <ReportSection />
        </Element>
      </DefaultLayout>
    </>
  );
}
