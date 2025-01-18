"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { logout } from "../../utils/auth";
import { useAppState } from "../../context/StateContext";

export const FloatingNav = ({ navItems, className }) => {
  const { state, setState } = useAppState();
  const { scrollYProgress } = useScroll();

  const [visible, setVisible] = useState(false);

  const handleLogout = () => {
    logout();
    setState((prev) => ({
      ...prev,
      isLoggedIn: false,
      loggedUserName: "",
    }));
  };

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      let direction = current - scrollYProgress.getPrevious();

      if (scrollYProgress.get() < 0.05) {
        setVisible(false);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-fit  fixed top-10 inset-x-0 mx-auto border border-white/[0.2] rounded-full dark:bg-black bg-black shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2  items-center justify-center space-x-4",
          className,
        )}
      >
        {navItems.map((navItem, idx) => (
          <Link
            key={`link=${idx}`}
            href={navItem.link}
            className={cn(
              "relative items-center flex space-x-1 text-neutral-600 hover:text-neutral-300",
            )}
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="hidden sm:block text-sm">{navItem.name}</span>
          </Link>
        ))}
        {state.isLoggedIn ? (
          <div>
            <button
              onClick={handleLogout}
              className="border text-sm font-medium relative border-neutral-500 border-white/[0.5]  text-white px-4 py-2 rounded-full"
            >
              <span>
                <Link href="/blogs">{state.loggedUserName}</Link>
              </span>
              <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent  h-px" />
            </button>

            <button
              onClick={handleLogout}
              className="border text-sm font-medium relative border-neutral-200 border-white/[0.2]  text-white px-4 py-2 rounded-full"
            >
              <span>Logout</span>
              <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent  h-px" />
            </button>
          </div>
        ) : (
          <button className="border text-sm font-medium relative border-neutral-200 border-white/[0.2]  text-white px-4 py-2 rounded-full">
            <span>
              <Link href="/login">Login</Link>
            </span>
            <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent  h-px" />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
