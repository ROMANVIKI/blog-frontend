"use client";

import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import {
  PlusCircle,
  Trash2,
  ExternalLink,
  Loader2,
  CircleArrowLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppState } from "../../context/StateContext";
import Toast from "../../components/ui/Toast";

function Creations() {
  const [currentUserBlogData, setCurrentUserBlogData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { state } = useAppState();
  const token = localStorage.getItem("accessToken");
  const userName = localStorage.getItem("userName");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortType, setSortType] = useState("newest");
  const [isToast, setIsToast] = useState(false);
  const [toastData, setToastData] = useState({
    message: "",
    textcol: "",
  });

  // Check for token and fetch blogs
  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchSavedBlogs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/cu-blogs/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setCurrentUserBlogData(response.data);
        setIsLoading(false);
      } catch (e) {
        console.error("Error fetching saved blogs:", e);
        if (e.response?.status === 401) {
          router.push("/login");
        } else {
          alert("Failed to fetch saved blogs");
        }
      }
    };

    fetchSavedBlogs();
  }, [token, router]);

  // Filtering blogs based on search query
  const filteredData = useMemo(() => {
    return currentUserBlogData.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.content.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [currentUserBlogData, searchQuery]);

  // Sorting the filtered data
  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      if (sortType === "newest") {
        return new Date(b.created_at) - new Date(a.created_at);
      } else if (sortType === "oldest") {
        return new Date(a.created_at) - new Date(b.created_at);
      } else if (sortType === "most_liked") {
        return b.like_count - a.like_count;
      } else if (sortType === "least_liked") {
        return a.like_count - b.like_count;
      } else if (sortType === "most_commented") {
        return b.comment_count - a.comment_count;
      } else if (sortType === "least_commented") {
        return a.comment_count - b.comment_count;
      }
      return 0;
    });
  }, [filteredData, sortType]);

  const navigateBack = () => {
    router.back();
  };

  const navigateToBlogs = () => {
    router.push("/blogs");
  };

  const navigateToTheBlog = (slug) => {
    router.push(`/blogs/${slug}`);
  };

  const handleRemove = async (blogId) => {
    try {
      await axios.delete(`http://localhost:8000/api/dl-blog/${blogId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Update the UI by removing the deleted blog
      setCurrentUserBlogData((prev) =>
        prev.filter((blog) => blog.id !== blogId),
      );
      setToastData({
        message: "Blog Deleted Successfully!!",
        textcol: "text-red-500",
      });
      setIsToast(true);
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete blog");
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <p className="mt-4 text-gray-600">Loading saved blogs...</p>
      </div>
    );
  }

  if (currentUserBlogData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-2xl font-semibold text-gray-600">No Blogs Saved</p>
        <button
          onClick={navigateToBlogs}
          className="mt-4 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
        >
          Go To Blogs
        </button>
      </div>
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
          <h1 className="text-3xl font-bold ml-4 text-gray-800">
            Your Own Blogs
          </h1>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
        </div>

        <div className="flex-1 sm:max-w-[200px]">
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          >
            <option value="newest">Newest to Oldest</option>
            <option value="oldest">Oldest to Newest</option>
            <option value="most_liked">Most Liked</option>
            <option value="least_liked">Least Liked</option>
            <option value="most_commented">Most Commented</option>
            <option value="least_commented">Least Commented</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sortedData.map((blog) => (
          <div
            key={blog.id}
            className="bg-white p-6 rounded-2xl shadow-lg flex flex-col justify-between hover:shadow-xl transition-shadow"
          >
            <h2 className="text-xl font-semibold text-gray-900">
              {blog.title}
            </h2>
            <p className="text-gray-600 mt-2 text-sm">
              <span className="font-medium">Author:</span> {userName}
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
                onClick={() => navigateToTheBlog(blog.slug)}
              />
              <Trash2
                className="w-6 h-6 text-red-500 cursor-pointer hover:scale-110 transition-transform"
                onClick={() => handleRemove(blog.id)}
                title="Remove"
              />
            </div>
          </div>
        ))}
        {isToast && (
          <Toast
            setIsToast={setIsToast}
            message={toastData.message}
            isToast={isToast}
            textcol={toastData.textcol}
          />
        )}
      </div>
    </div>
  );
}

export default Creations;
