"use client";
import React from "react";
import { BackgroundLines } from "@/components/ui/background-lines";
import Link from "next/link";

export default function BackgroundLinesDemo() {
  return (
    <BackgroundLines className="flex items-center justify-center w-full flex-col bg-black px-4">
      <h2 className="bg-clip-text mb-6 md:mb-0 text-transparent text-center bg-gradient-to-b from-neutral-200 to-neutral-700 dark:from-neutral-600 dark:to-white text-4xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
        Welcome to My Blog Website, <br /> Your Source of Inspiration.
      </h2>
      <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-500 dark:text-neutral-400 text-center max-md:mb-6">
        Explore the latest insights, stories, and creative content. Get ready to
        be inspired and to inspire others by writing your own blog with my text
        editor, learn something new, and dive into my world of writing!
      </p>
      {/* <div className="flex flex-row  gap-x-6"> */}
      {/*   <div className="mt-4"> */}
      {/*     <button className="inline-flex cursor-pointer h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"> */}
      {/*       Get Started */}
      {/*     </button> */}
      {/*   </div> */}
      {/*   <div className="mt-4"> */}
      {/*     <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"> */}
      {/*       Read My Blogs */}
      {/*     </div> */}
      {/*     </button> */}
      {/* </div> */}
    </BackgroundLines>
  );
}
