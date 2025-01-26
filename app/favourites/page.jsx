"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { PlusCircle, Trash2, ExternalLink } from "lucide-react";

function Favourites() {
  const [savedBlogData, setSavedBlogData] = useState([]);

  useEffect(() => {
    const fetchSavedBlogs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/saved-blogs/",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          },
        );
        setSavedBlogData(response.data);
      } catch (e) {
        console.error("Error fetching saved blogs:", e);
        alert("Failed to fetch saved blogs");
      }
    };

    fetchSavedBlogs();
  }, []);

  const handleAdd = (blogId) => {
    alert(`Add icon clicked for blog ID: ${blogId}`);
  };

  const handleRemove = (blogId) => {
    alert(`Remove icon clicked for blog ID: ${blogId}`);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Saved Blogs
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {savedBlogData.map((blog) => (
          <div
            key={blog.id}
            className="bg-white p-6 rounded-2xl shadow-lg flex flex-col justify-between"
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
                onClick={() => handleAdd(blog.id)}
                title="View Details"
              />
              <PlusCircle
                className="w-6 h-6 text-green-500 cursor-pointer hover:scale-110 transition-transform"
                onClick={() => handleAdd(blog.id)}
                title="Add"
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
