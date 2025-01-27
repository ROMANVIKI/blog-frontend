"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import ProfileForm from "../../components/ProfileForm";
import axios from "axios";
import { useAppState } from "../../context/StateContext";

const ProfileComp = () => {
  const router = useRouter();
  const { state } = useAppState();
  const token = state.AccessToken;

  if (!token) {
    router.push("/login");
  } else {
    return <ProfileForm />;
  }
};
export default ProfileComp;
