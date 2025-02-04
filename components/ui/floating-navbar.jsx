"use client";
import React, { useState, useEffect } from "react";
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
import { sendNotification } from "../sendNotification";
import {
  IconHome,
  IconMessage,
  IconUser,
  IconHeartFilled,
  IconWriting,
  IconDirectionsFilled,
  IconLogout,
} from "@tabler/icons-react";

export const FloatingNav = ({ navItems, className }) => {
  const { state, setState } = useAppState();
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleLogout = () => {
    logout();
    sendNotification("Logged Out", {
      body: "You have been successfully logged out.",
    });
    setState((prev) => ({
      ...prev,
      isLoggedIn: false,
      loggedUserName: "",
    }));
  };

  // Show/hide navbar based on scroll direction
  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current - scrollYProgress.getPrevious();

      if (scrollYProgress.get() < 0.05) {
        setVisible(true); // Hide navbar at the top of the page
      } else {
        if (direction < 0) {
          setVisible(true); // Show navbar when scrolling up
        } else {
          setVisible(false); // Hide navbar when scrolling down
        }
      }
    }
  });

  // Show navbar on touch devices when the user taps near the top of the screen
  useEffect(() => {
    const handleTouchStart = (event) => {
      if (event.touches[0].clientY < 10) {
        setVisible(true);
        setTimeout(() => setVisible(false), 6000); // Hide after 2 seconds
      }
    };

    window.addEventListener("touchstart", handleTouchStart);
    return () => window.removeEventListener("touchstart", handleTouchStart);
  }, []);

  // Show navbar on scroll for mobile devices
  useEffect(() => {
    const handleScroll = () => {
      if (!isHovered) {
        setVisible(true);
        setTimeout(() => setVisible(false), 6000); // Hide after 2 seconds
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHovered]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible || isHovered ? 0 : -100,
          opacity: visible || isHovered ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
          "flex max-w-fit fixed top-10 inset-x-0 mx-auto border border-white/[0.2] rounded-full dark:bg-black bg-black shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2 items-center justify-center space-x-4",
          className,
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {navItems.map((navItem, idx) => (
          <Link
            key={`link=${idx}`}
            href={navItem.link}
            className={cn(
              "relative items-center flex space-x-1 text-neutral-400 hover:text-neutral-300",
            )}
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="hidden sm:block text-sm">{navItem.name}</span>
          </Link>
        ))}
        {state.isLoggedIn ? (
          <>
            <Link
              href="/creations"
              className={cn(
                "relative items-center flex space-x-1 text-neutral-400 hover:text-neutral-300",
              )}
            >
              <span className="block sm:hidden">
                <IconDirectionsFilled className="h-4 w-4 text-white" />
              </span>
              <span className="hidden sm:block text-sm">Your Blogs</span>
            </Link>
            <Link
              href="/create-blog"
              className={cn(
                "relative items-center flex space-x-1 text-neutral-400 hover:text-neutral-300",
              )}
            >
              <span className="block sm:hidden">
                <IconWriting className="h-4 w-4 text-white" />
              </span>
              <span className="hidden sm:block text-sm">Create Blog</span>
            </Link>

            <Link
              href="/favourites"
              className={cn(
                "relative items-center flex space-x-1 text-neutral-400 hover:text-neutral-300",
              )}
            >
              <span className="block sm:hidden">
                <IconHeartFilled className="h-4 w-4 text-white" />
              </span>
              <span className="hidden sm:block text-sm">Favourites</span>
            </Link>
            <div>
              <button className="border text-sm font-medium relative border-neutral-500 border-white/[0.5] text-white px-4 py-2 rounded-full">
                <span className="hidden sm:block text-sm">
                  <Link href="/profile">{state.loggedUserName}</Link>
                </span>
                <span className="block sm:hidden">
                  <IconUser className="h-4 w-4 text-white" />
                </span>
                <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
              </button>

              <button
                onClick={handleLogout}
                className="border text-sm font-medium relative border-neutral-200 border-white/[0.2] text-white px-4 py-2 rounded-full"
              >
                <span className="block sm:hidden">
                  <IconLogout className="h-4 w-4 text-white" />
                </span>
                <span className="hidden sm:block text-sm">Logout</span>
                <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
              </button>
            </div>
          </>
        ) : (
          <>
            <button className="border text-sm font-medium relative border-neutral-200 border-white/[0.2] text-white px-4 py-2 rounded-full">
              <span>
                <Link href="/signup">Sign Up</Link>
              </span>
              <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
            </button>
            <button className="border text-sm font-medium relative border-neutral-200 border-white/[0.2] text-white px-4 py-2 rounded-full">
              <span>
                <Link href="/login">Login</Link>
              </span>
              <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px" />
            </button>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
