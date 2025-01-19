"use client";
import { useRouter } from "next/navigation";
import React from "react";
import TipTap from "../../components/Tiptap/TipTap";

const CreateBlog = () => {
  const router = useRouter();
  const token = localStorage.getItem("accessToken");

  if (!token) {
    router.push("/login");
  }

  return <TipTap />;
};
export default CreateBlog;
