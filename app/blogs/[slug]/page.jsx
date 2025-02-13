"use client";
import { use } from "react";
import dynamic from "next/dynamic";

const DetailedBlogComp = dynamic(() => import("../[slug]/DetailedBlogComp"), {
  ssr: false,
});

export default function BlogPage({ params }) {
  const resolvedParams = use(params);
  return <DetailedBlogComp slug={resolvedParams.slug} />;
}
