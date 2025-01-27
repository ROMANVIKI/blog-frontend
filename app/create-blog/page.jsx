"use client";
import { useRouter } from "next/navigation";
import React from "react";
import TipTap from "../../components/Tiptap/TipTap";
import { useAppState } from "../../context/StateContext";

const CreateBlog = () => {
  const router = useRouter();
  const { state } = useAppState();
  const token = state.AccessToken;

  if (!token) {
    router.push("/login");
  }

  return <TipTap />;
};
export default CreateBlog;
