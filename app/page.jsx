import React from "react";
import BackgroundLinesDemo from "../components/BackgroundLinesDemo";
import FloatingNavDemo from "../components/FloatingNavDemo";
import Footer from "../components/Footer";
import SidebarDemo from "../components/SidebarDemo";
import FeaturesSectionDemo from "../components/FeaturesSectionDemo";

const Home = () => {
  return (
    <div>
      <FloatingNavDemo />
      <BackgroundLinesDemo />
      <div className="bg-black">
        <div
          className="bg-clip-text mb-6 md:mb-0 text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-lg lg:text-3xl font-sans py-2 md:py-10 relative z-20 font-bold 
"
        >
          <h2>Tech I Trust</h2>
        </div>

        <FeaturesSectionDemo />
      </div>
      <Footer />
    </div>
  );
};
export default Home;
