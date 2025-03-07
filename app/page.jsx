"use client";
import React from "react";
import BackgroundLinesDemo from "../components/BackgroundLinesDemo";
import FloatingNavDemo from "../components/FloatingNavDemo";
import Footer from "../components/Footer";
import { lazy } from "react";
import Link from "next/link";
import { useAppState } from "../context/StateContext"; // Import the custom hook

const Features = lazy(() => import("../components/Features"));

const FeaturesSectionDemo = lazy(
  () => import("../components/FeaturesSectionDemo"),
);

const Home = () => {
  const { state } = useAppState();
  const isLogged = state.isLoggedIn; // Get the login state from context

  return (
    <div>
      <BackgroundLinesDemo />
      <div className="bg-black">
        <Features />
        <div className="bg-clip-text mb-6 md:mb-0 text-transparent text-center bg-gradient-to-b from-neutral-300 to-neutral-400 dark:from-neutral-600 dark:to-white text-2xl md:text-lg lg:text-3xl font-sans py-2 md:py-10 relative z-20 font-bold">
          <h2>Tech I Trust</h2>
        </div>

        <FeaturesSectionDemo />
      </div>
      <Footer />

      {isLogged ? (
        <Link
          href="/blogs"
          className="inline-flex z-50 fixed bottom-4 right-4 x-50 cursor-pointer h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          Explore Blogs
        </Link>
      ) : (
        <Link
          href="/signup"
          className="inline-flex z-50 fixed bottom-4 right-4 x-50 cursor-pointer h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          Get Started
        </Link>
      )}
    </div>
  );
};

export default Home;
