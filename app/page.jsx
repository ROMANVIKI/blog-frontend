// import React from "react";
// import BackgroundLinesDemo from "../components/BackgroundLinesDemo";
// import FloatingNavDemo from "../components/FloatingNavDemo";
// import Footer from "../components/Footer";
// import SidebarDemo from "../components/SidebarDemo";
// import FeaturesSectionDemo from "../components/FeaturesSectionDemo";
//
// const Home = () => {
//   return (
//     <div>
//       <div >
//         <button className="inline-flex cursor-pointer h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
//           Get Started
//         </button>
//         <BackgroundLinesDemo />
//       </div>
//       <div className="bg-black">
//         <div
//           className="bg-clip-text mb-6 md:mb-0 text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-lg lg:text-3xl font-sans py-2 md:py-10 relative z-20 font-bold
// "
//         >
//           <h2>Tech I Trust</h2>
//         </div>
//
//         <FeaturesSectionDemo />
//       </div>
//       <Footer />
//     </div>
//   );
// };
// export default Home;

import React from "react";
import BackgroundLinesDemo from "../components/BackgroundLinesDemo";
import FloatingNavDemo from "../components/FloatingNavDemo";
import Footer from "../components/Footer";
import SidebarDemo from "../components/SidebarDemo";
import FeaturesSectionDemo from "../components/FeaturesSectionDemo";
import Link from "next/link";

const Home = () => {
  return (
    <div>
      <BackgroundLinesDemo />
      <div className="bg-black">
        <div className="bg-clip-text mb-6 md:mb-0 text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-lg lg:text-3xl font-sans py-2 md:py-10 relative z-20 font-bold">
          <h2>Tech I Trust</h2>
        </div>

        <FeaturesSectionDemo />
      </div>
      <Footer />

      {/* Fixed Button at the Bottom */}
      <Link
        href="/signup"
        className="inline-flex fixed bottom-4 right-4 x-50 cursor-pointer h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
      >
        Get Started
      </Link>

      {/* <button className="fixed bottom-4 right-4 z-50 inline-flex cursor-pointer h-12 items-center justify-center rounded-md border border-slate-800 bg-gradient-to-r from-blue-500 to-indigo-600 px-6 font-medium text-white shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"> */}
      {/*   Contact Us */}
      {/* </button> */}
    </div>
  );
};

export default Home;
