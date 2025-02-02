import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import FloatingNavDemo from "../components/FloatingNavDemo";
import { StateProvider } from "../context/StateContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "VBlog - Your Source for Tech & Programming Insights",
  description:
    "VBlog is a modern blogging platform focused on tech, programming, and web development. Read expert insights, tutorials, and industry news.",
  keywords:
    "VBlog, tech blog, programming, web development, JavaScript, Python, React, Next.js, Django, tutorials, coding",
  author: "VBlog Team",
  robots: "index, follow", // Ensure search engines index your blog
  canonical: "https://vblog-gbkd.onrender.com", // Replace with your actual domain
  openGraph: {
    title: "VBlog - Tech & Programming Insights",
    description:
      "Stay updated with the latest tech trends, programming tutorials, and web development guides on VBlog.",
    type: "website",
    url: "https://vblog-gbkd.onrender.com",
    siteName: "VBlog",
    images: [
      {
        url: "https://vblog-gbkd.onrender.com/og-image.jpg", // Add an actual image URL for previews
        width: 1200,
        height: 630,
        alt: "VBlog - Your Source for Tech & Programming Insights",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@vblog_official", // Replace with your actual Twitter handle
    title: "VBlog - Your Source for Tech & Programming Insights",
    description:
      "Read expert insights, tutorials, and industry news on web development and programming.",
    images: [
      "https://vblog-gbkd.onrender.com/og-image.jpg", // Same image as Open Graph
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StateProvider>
          <FloatingNavDemo />
          {children}
        </StateProvider>
      </body>
    </html>
  );
}
