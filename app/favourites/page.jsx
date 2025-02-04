"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppState } from "../../context/StateContext";
import axios from "../../utils/axios";
import {
  PlusCircle,
  Trash2,
  ExternalLink,
  Loader2,
  CircleArrowLeft,
} from "lucide-react";

const Favourites = () => {
  const [savedBlogData, setSavedBlogData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();
  const { state } = useAppState();

  // Authentication check effect
  useEffect(() => {
    if (!isInitialized && state.AccessToken !== undefined) {
      setIsInitialized(true);
      if (!state.AccessToken) {
        router.push("/login");
      }
    }
  }, [state.AccessToken, isInitialized, router]);

  // Data fetching effect
  useEffect(() => {
    const fetchSavedBlogs = async () => {
      if (!state.AccessToken) return;

      try {
        const response = await axios.get("saved-blogs/", {
          headers: {
            Authorization: `Bearer ${state.AccessToken}`,
          },
        });
        setSavedBlogData(response.data);
      } catch (error) {
        console.error("Error fetching saved blogs:", error);
        if (error.response?.status === 403) {
          router.push("/login");
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (isInitialized) {
      fetchSavedBlogs();
    }
  }, [state.AccessToken, isInitialized, router]);

  const handleRemove = async (blogId) => {
    try {
      await axios.delete(`dl-saved-blog/${blogId}/`, {
        headers: {
          Authorization: `Bearer ${state.AccessToken}`,
        },
      });

      // Optimistically update UI
      setSavedBlogData((prev) => prev.filter((blog) => blog.id !== blogId));
    } catch (error) {
      console.error("Error removing blog:", error);
      alert("Failed to remove blog");
    }
  };

  // Early return while checking authentication
  if (!isInitialized) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <p className="mt-4 text-gray-600">Initializing...</p>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <p className="mt-4 text-gray-600">Loading saved blogs...</p>
      </div>
    );
  }

  // Empty state
  if (savedBlogData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <p className="text-2xl font-semibold text-gray-600 mb-4">
          No Blogs Saved
        </p>
        <button
          onClick={() => router.push("/blogs")}
          className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
        >
          Go To Blogs
        </button>
      </div>
    );
  }

  // Main content
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <CircleArrowLeft
            onClick={() => router.back()}
            className="w-8 h-8 text-gray-700 cursor-pointer hover:text-gray-900 transition-colors"
          />
          <h1 className="text-3xl font-bold ml-4 text-gray-800">Saved Blogs</h1>
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {savedBlogData.map((blog) => (
          <div
            key={blog.id}
            className="bg-white p-6 rounded-2xl shadow-lg flex flex-col justify-between hover:shadow-xl transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-900">
              {blog.blog_title}
            </h2>
            <p className="text-gray-600 mt-2 text-sm">
              <span className="font-medium">Author:</span> {blog.blog_author}
            </p>
            <p className="text-gray-600 mt-1 text-sm">
              <span className="font-medium">Created At:</span>{" "}
              {new Date(blog.blog_created_at).toLocaleString()}
            </p>
            <p className="text-gray-600 mt-1 text-sm">
              <span className="font-medium">Saved At:</span>{" "}
              {new Date(blog.created_at).toLocaleString()}
            </p>
            <div className="flex justify-end items-center gap-4 mt-6">
              <ExternalLink
                className="w-6 h-6 text-blue-500 cursor-pointer hover:scale-110 transition-transform"
                title="View Details"
                onClick={() => router.push(`/blogs/${blog.slug}`)}
              />
              <Trash2
                className="w-6 h-6 text-red-500 cursor-pointer hover:scale-110 transition-transform"
                onClick={() => handleRemove(blog.id)}
                title="Remove"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favourites;
