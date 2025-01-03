import { cn } from "@/lib/utils";
import {
  IconTerminal2,
  IconSourceCode,
  IconBrandReact,
  IconBrandNextjs,
  IconBrandDjango,
  IconApi,
  IconEaseInOut,
  IconCodeCircle2,
  IconTerminal,
} from "@tabler/icons-react";

export default function FeaturesSectionDemo() {
  const features = [
    {
      title: "Django",
      description:
        "A high-level Python web framework that allows rapid development and clean, pragmatic design.",
      icon: <IconBrandDjango />,
    },
    {
      title: "React",
      description:
        "A JavaScript library for building user interfaces, developed by Facebook.",
      icon: <IconBrandReact />,
    },
    {
      title: "Next.js",
      description:
        "The React Framework for Production, offering server-side rendering and static site generation.",
      icon: <IconBrandNextjs />,
    },
    {
      title: "DRF (Django Rest Framework)",
      description: "A powerful and flexible toolkit for building Web APIs.",
      icon: <IconApi />,
    },
    {
      title: "GSAP",
      description:
        "GreenSock Animation Platform, the standard for JavaScript animations.",
      icon: <IconEaseInOut />,
    },
    {
      title: "Neovim",
      description: "A hyperextensible Vim-based text editor.",
      icon: <IconCodeCircle2 />,
    },
    {
      title: "Tmux",
      description:
        "A terminal multiplexer, allowing multiple terminal sessions to be accessed simultaneously.",
      icon: <IconTerminal2 />,
    },
    {
      title: "Alacritty",
      description: "A GPU-accelerated terminal emulator for high performance.",
      icon: <IconTerminal />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({ title, description, icon, index }) => {
  return (
    <div
      className={cn(
        "flex flex-col w-full  lg:border-r  py-10 relative group/feature dark:bg-black",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800",
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
