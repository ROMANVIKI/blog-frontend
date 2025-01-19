"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ProfileForm from "../../components/ProfileForm";
import axios from "axios";

const ProfileComp = () => {
  const router = useRouter();
  const token = localStorage.getItem("accessToken");

  if (!token) {
    router.push("/login");
  } else {
    return <ProfileForm />;
  }
};
export default ProfileComp;
