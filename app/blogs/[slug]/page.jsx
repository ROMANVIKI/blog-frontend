"use client";
import React, { useEffect, useState } from "react";
import BlogViewer from "../../../components/Tiptap/BlogViewer";
import axios from "axios";
import {
  Loader2,
  User,
  Calendar,
  Share2,
  CircleArrowLeft,
  Heart,
  MessageCircle,
  Bookmark,
} from "lucide-react";
import { useRouter } from "next/navigation";

const DetailedBlogComp = ({ params: paramsPromise }) => {
  const [params, setParams] = useState(null);
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCommentSection, setIsCommentSection] = useState(false);
  const [newComment, setNewComment] = useState("");

  const router = useRouter();

  const toggleCommentSection = () => {
    setIsCommentSection((prev) => !prev);
  };

  const navigateBack = () => {
    router.back();
  };

  const copyUrl = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        alert("URL copied to clipboard");
      })
      .catch((err) => {
        alert("Failed to copy URL: ", err);
      });
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) {
      alert("Comment cannot be empty.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8000/api/create-comment/`,
        {
          blog_id: 1,
          comment: newComment,
          commented_by: 1,
        },
      );
      setBlogData((prev) => ({
        ...prev,
        comments: [...prev.comments, response.data], // Append the new comment
      }));
      setNewComment("");
    } catch (error) {
      console.error("Error submitting comment:", error);
      alert("Failed to submit comment.");
    }
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
          console.log(response.data);
          setBlogData(response.data);
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
          <div className="border-2 justify-between flex flex-row border-gray-600 p-4">
            <div className="flex flex-row items-center space-x-2">
              <Heart width={30} height={30} />
              <p className="text-2xl">{blogData.like_count}</p>
              <MessageCircle
                onClick={toggleCommentSection}
                width={30}
                height={30}
                className="cursor-pointer"
              />
            </div>
            <div>
              <Bookmark width={30} height={30} />
            </div>
          </div>

          {isCommentSection && (
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Add a Comment</h3>
              <div className="flex flex-col space-y-4">
                <textarea
                  className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-gray-300"
                  rows="4"
                  placeholder="Write your comment here..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <button
                  className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
                  onClick={handleCommentSubmit}
                >
                  Submit Comment
                </button>
              </div>

              <h3 className="text-xl font-semibold mt-8 mb-4">Comments</h3>
              <div className="space-y-4">
                {blogData.comments.map((comment, index) => (
                  <div
                    key={index}
                    className="flex flex-col bg-gray-100 p-4 rounded-lg shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-gray-800">
                        {comment.commented_by_name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(comment.created_at).toLocaleString()}
                      </p>
                    </div>
                    <p className="mt-2 text-gray-700">{comment.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
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
