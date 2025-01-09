"use client";
import React, { useEffect, useState } from "react";
import BlogViewer from "../../../components/Tiptap/BlogViewer";
import axios from "axios";
import { Loader2, User, Calendar, Share2, CircleArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const DetailedBlogComp = ({ params: paramsPromise }) => {
  const [params, setParams] = useState(null);
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const navigateBack = () => {
    router.back();
  };

  const copyUrl = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        // Optionally show a success message
        alert("URL copied to clipboard");
      })
      .catch((err) => {
        alert("Failed to copy URL: ", err);
      });
  };

  useEffect(() => {
    const unwrapParams = async () => {
      const resolvedParams = await paramsPromise;
      setParams(resolvedParams);
    };

    unwrapParams();
  }, [paramsPromise]);

  useEffect(() => {
    const fetchBlogData = async () => {
      if (params?.slug) {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/blog/${params.slug}`,
          );
          setBlogData(response.data); // Assuming response.data contains the blog data
          setLoading(false);
        } catch (error) {
          console.error("Error fetching blog data:", error);
          alert("Failed to load blog data.");
        }
      }
    };

    fetchBlogData();
  }, [params]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin text-gray-500" />
        <span className="ml-2">Loading blog data...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {blogData ? (
        <div className="bg-white shadow-lg border rounded-lg overflow-hidden">
          <div className="p-6 border-b">
            <div className="flex items-center space-x-4 text-gray-600">
              <User className="w-5 h-5" />
              <p className="text-lg">
                Author:{" "}
                <span className="text-gray-800 font-large">
                  {blogData.author === 1 ? "romanviki" : "Admin"}
                </span>
              </p>
              <Calendar className="w-5 h-5" />
              <p className="text-lg">
                Published:{" "}
                <span className="text-gray-800 font-large">
                  {blogData.created_at
                    ? new Date(blogData.created_at).toLocaleDateString()
                    : "N/A"}
                </span>
              </p>
              <div>
                <Share2 onClick={copyUrl} />
              </div>
              <div>
                <CircleArrowLeft onClick={navigateBack} />
              </div>
            </div>
          </div>
          <div className="p-6">
            <BlogViewer content={blogData.content} />
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-600">
          <p>Blog data could not be loaded.</p>
        </div>
      )}
    </div>
  );
};

export default DetailedBlogComp;
