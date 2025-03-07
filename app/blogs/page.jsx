"use client";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Loader2, Heart, MessageCircleMore, ArrowRight } from "lucide-react";
import Link from "next/link";
import axios from "../../utils/axios";

const Alert = React.memo(
  ({ children, variant = "default", className = "" }) => {
    const baseStyles = "rounded-lg border p-4";
    const variants = {
      default: "bg-gray-50 border-gray-200 text-gray-800",
      destructive: "bg-red-50 border-red-200 text-red-800",
      warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
      success: "bg-green-50 border-green-200 text-green-800",
    };

    return (
      <div className={`${baseStyles} ${variants[variant]} ${className}`}>
        {children}
      </div>
    );
  },
);

const AlertTitle = React.memo(({ children, className = "" }) => {
  return <h5 className={`font-medium mb-1 ${className}`}>{children}</h5>;
});

const AlertDescription = React.memo(({ children, className = "" }) => {
  return <div className={`text-sm ${className}`}>{children}</div>;
});

const BlogViewer = React.memo(() => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortType, setSortType] = useState("newest");

  const fetchBlogs = useCallback(async () => {
    try {
      const response = await axios.get("blogs/");
      setBlogs(response.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const filteredData = useMemo(() => {
    return blogs.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.content.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [blogs, searchQuery]);

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

  // Rendering blogs after filtering and sorting
  const renderedBlogs = useMemo(() => {
    return sortedData.map((blog) => (
      <article
        key={blog.id}
        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
      >
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 hover:text-blue-600 transition-colors duration-200">
            {blog.title}
          </h2>
          <div className="flex flex-row items-center text-lg space-x-4 text-gray-600">
            {/* Like Count and Icon */}
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5" />
              <p>{blog.like_count}</p>
            </div>
            {/* Comment Count and Icon */}
            <div className="flex items-center space-x-2">
              <MessageCircleMore className="w-5 h-5" />
              <p>{blog.comment_count}</p>
            </div>
          </div>
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <time className="text-sm text-gray-500" dateTime={blog.created_at}>
              Posted on{" "}
              {new Date(blog.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <Link
              href={`/blogs/${blog.slug}`}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
            >
              <span>Read</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </article>
    ));
  }, [sortedData]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <p className="mt-4 text-gray-600">Loading blog posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center sm:text-left">
        Latest Blog Posts
      </h1>

      {/* Search and Sort Container */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        {/* Search Input */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
        </div>

        {/* Sort Select */}
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

      {/* Rendered Blogs */}
      <div className="space-y-8">{renderedBlogs}</div>
    </div>
  );
});

export default BlogViewer;
