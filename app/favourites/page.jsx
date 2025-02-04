"use client";

import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import {
  PlusCircle,
  Trash2,
  ExternalLink,
  Loader2,
  CircleArrowLeft,
} from "lucide-react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import { useAppState } from "../../context/StateContext";
import { useFetchUser } from "../../components/useFetchUser.js";

function Favourites() {
  const [savedBlogData, setSavedBlogData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const { state } = useAppState();
  const token = state.AccessToken;

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  const navigateBack = () => {
    router.back();
  };

  const navigateToBlogs = () => {
    router.push("/blogs");
  };

  const navigateToTheBlog = (slug) => {
    router.push(`/blogs/${slug}`);
  };

  useEffect(() => {
    const fetchSavedBlogs = async () => {
      try {
        const response = await axios.get("saved-blogs/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSavedBlogData(response.data);
        setIsLoading(false);
      } catch (e) {
        console.error("Error fetching saved blogs:", e);
        alert("Failed to fetch saved blogs");
      }
    };

    fetchSavedBlogs();
  }, []);

  const handleRemove = (blogId) => {
    alert(`Remove icon clicked for blog ID: ${blogId}`);
    const deleteSavedBlog = async () => {
      try {
        const response = await axios.delete(`dl-saved-blog/${blogId}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert("deleted");
      } catch (error) {
        alert(error);
      }
    };
    deleteSavedBlog();
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <p className="mt-4 text-gray-600">Loading saved blogs...</p>
      </div>
    );
  }

  if (savedBlogData.length === 0) {
    return (
      <>
        <p className="text-2xl font-semibold text-gray-600">No Blogs Saved</p>
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
          <button
            onClick={navigateToBlogs}
            className="mt-4 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
          >
            Go To Blogs
          </button>
        </div>
      </>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <CircleArrowLeft
            onClick={navigateBack}
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
                onClick={() => navigateToTheBlog(blog.slug)} // Fixed here
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
}

export default Favourites;
