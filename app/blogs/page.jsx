"use client";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { Loader2, Heart, MessageCircleMore } from "lucide-react";
import Link from "next/link";

const Alert = React.memo(({ children, variant = "default", className = "" }) => {
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
});

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

  const fetchBlogs = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:8000/api/blogs/");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const renderedBlogs = useMemo(() => {
    return blogs.map((blog) => (
      <article
        key={blog.id}
        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
      >
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 hover:text-blue-600 transition-colors duration-200">
            {blog.title}
          </h2>
          <div className="flex flex-row text-lg space-x-2 ">
            <p>{blog.like_count}</p>
            <div>
              <Heart />
            </div>
            <p>{blog.comment_count}</p>
            <div>
              <MessageCircleMore />
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <time
              className="text-sm text-gray-500"
              dateTime={blog.created_at}
            >
              Posted on{" "}
              {new Date(blog.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>

            <Link
              href={`/blogs/${blog.slug}`}
              className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 w-full sm:w-auto"
            >
              Read
            </Link>
          </div>
        </div>
      </article>
    ));
  }, [blogs]);

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

      <div className="space-y-8">
        {renderedBlogs}
      </div>
    </div>
  );
});

export default BlogViewer;
