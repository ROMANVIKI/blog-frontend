"use client";
import { useRouter } from "next/navigation";
import React from "react";
import TipTap from "../../components/Tiptap/TipTap";
import { useAppState } from "../../context/StateContext";

const CreateBlog = () => {
  const router = useRouter();
  const { state } = useAppState();
  const token = state.AccessToken;
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized && state.AccessToken !== undefined) {
      setIsInitialized(true);
      if (!state.AccessToken) {
        router.push("/login");
      }
    }
  }, [state.AccessToken, isInitialized, router]);

  return <TipTap />;
};
export default CreateBlog;
