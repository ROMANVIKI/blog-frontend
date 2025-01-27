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
import Image from "next/image";
import { useFetchUser } from "../../../components/useFetchUser";
import Toast from "../../../components/ui/Toast";

const DetailedBlogComp = ({ params: paramsPromise }) => {
  const [params, setParams] = useState(null);
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCommentSection, setIsCommentSection] = useState(false);
  const [newComment, setNewComment] = useState("");

  const [heartIconCol, setHeartIconCol] = useState(false);
  const [isBookmark, setIsBookmark] = useState(false);

  const [isToast, setIsToast] = useState(false);
  const [toastData, setToastData] = useState({
    message: "",
    textcol: "",
  });

  const { user, error } = useFetchUser();

  const router = useRouter();

  const toggleCommentSection = () => {
    setIsCommentSection((prev) => !prev);
  };

  const navigateBack = () => {
    router.back();
  };

  const handleLikeBtn = () => {
    setHeartIconCol((prev) => !prev);
  };

  const handleBookmark = () => {
    setIsBookmark((prev) => !prev);
    try {
      const response = axios.post(
        "http://localhost:8000/api/save-blog/",
        {
          saved_by: user.id,
          saved_blog: blogData.id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        },
      );
      setToastData({
        message: "Bookmarked SuccessFully!",
        textcol: "text-green-500",
      });
      setIsToast(true);
    } catch (error) {
      console.log(error);
    }
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
        "http://localhost:8000/api/create-comment/",
        {
          blog: blogData.id,
          comment: newComment,
          commented_by: user.id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        },
      );

      setToastData({
        message: "Comment Added SuccessFully!",
        textcol: "text-green-500",
      });
      setIsToast(true);

      if (response.data) {
        setBlogData((prev) => ({
          ...prev,
          comments: [response.data, ...prev.comments],
        }));

        setNewComment("");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
      // More detailed error handling
      if (error.response) {
        alert(
          `Failed to submit comment: ${JSON.stringify(error.response.data)}`,
        );
      } else {
        alert("Failed to submit comment. Please check your connection.");
      }
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
              <Image
                width={50}
                height={50}
                src={`http://localhost:8000${user.avatar}`}
                alt="author profile picture"
                className="rounded-full"
              />
              <p className="text-lg">
                Author:{" "}
                <span className="text-gray-800 font-large">
                  {blogData.author_name}
                </span>
              </p>
              <Calendar className="w-5 h-5" />
              Published:{" "}
              <p className="text-lg">
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
          <div className="border-2 justify-between flex flex-row border-gray-600 p-2">
            <div className="flex flex-row items-center space-x-2">
              <Heart
                width={30}
                fill={heartIconCol ? "red" : "none"}
                color={heartIconCol ? "red" : "black"}
                onClick={handleLikeBtn}
                height={30}
              />
              <p className="text-2xl">{blogData.like_count}</p>
              <MessageCircle
                onClick={toggleCommentSection}
                width={30}
                height={30}
                className="cursor-pointer"
              />

              <p className="text-2xl">{blogData.comment_count}</p>
            </div>
            <div>
              <Bookmark
                width={30}
                height={30}
                fill={isBookmark ? "black" : "none"}
                color={isBookmark ? "black" : "black"}
                onClick={handleBookmark}
              />
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
          {isToast && (
            <Toast message={toastData.message} textcol={toastData.textcol} />
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
