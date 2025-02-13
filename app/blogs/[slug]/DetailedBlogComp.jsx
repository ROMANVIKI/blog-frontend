"use client";
import React, { useEffect, useState } from "react";
import BlogViewer from "../../../components/Tiptap/BlogViewer";
import {
  Loader2,
  Calendar,
  Share2,
  CircleArrowLeft,
  Heart,
  MessageCircle,
  Bookmark,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import useFetchUser from "../../../components/useFetchUser";
import Toast from "../../../components/ui/Toast";
import { useAppState } from "../../../context/StateContext";
import axios from "../../../utils/axios";
import AnonymousUserImg from "../../../public/annymous_user.jpg";

const DetailedBlogComp = ({ slug }) => {
  const [blogData, setBlogData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isCommentSection, setIsCommentSection] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [heartIconCol, setHeartIconCol] = useState(false);
  const [isBookmark, setIsBookmark] = useState(false);
  const [userId, setUserId] = useState(null);

  const [isToast, setIsToast] = useState(false);
  const [toastData, setToastData] = useState({
    message: "",
    textcol: "",
  });

  const { user } = useFetchUser();
  const router = useRouter();
  const { state } = useAppState();
  const token = state.AccessToken;

  // app/blogs/[slug]/DetailedBlogComp.jsx
  useEffect(() => {
    // Safely access localStorage in useEffect (client-side)
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const toggleCommentSection = () => {
    setIsCommentSection((prev) => !prev);
  };

  const navigateBack = () => {
    router.back();
  };

  const getLikeId = () => {
    if (!blogData?.likes) return null;
    const like = blogData.likes.find(
      (item) => item.liked_by === userId || item.liked_by === user?.id,
    );
    return like ? like.id : null;
  };

  const handleLikeBtn = async () => {
    if (!token) {
      setToastData({
        message: "Login to like!",
        textcol: "text-red-500",
      });
      setIsToast(true);
      return;
    }

    try {
      if (heartIconCol) {
        const likeId = getLikeId();
        await axios.delete(`dl-like/${likeId}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setToastData({
          message: "You unliked the blog!",
          textcol: "text-red-800",
        });
        setBlogData((prev) => ({
          ...prev,
          like_count: prev.like_count - 1,
        }));
      } else {
        await axios.post(
          `like/`,
          {
            liked_by: user ? user.id : userId,
            blog: blogData.id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setBlogData((prev) => ({
          ...prev,
          like_count: prev.like_count + 1,
        }));
        setToastData({
          message: "You liked the blog!",
          textcol: "text-blue-500",
        });
      }
      setIsToast(true);
      setHeartIconCol((prev) => !prev);
    } catch (e) {
      setToastData({
        message: "Error occurred, try again later!",
        textcol: "text-red-500",
      });
      setIsToast(true);
    }
  };

  const handleBookmark = async () => {
    if (!token) {
      setToastData({
        message: "Login to save the blog!",
        textcol: "text-red-500",
      });
      setIsToast(true);
      return;
    }

    try {
      await axios.post(
        "save-blog/",
        {
          saved_by: user.id,
          saved_blog: blogData.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setToastData({
        message: "Bookmarked Successfully!",
        textcol: "text-cyan-500",
      });
      setIsToast(true);
      setIsBookmark((prev) => !prev);
    } catch (error) {
      console.log(error, "error during bookmarking");
      setToastData({
        message: "Error occurred, please try again later!",
        textcol: "text-red-500",
      });
      setIsToast(true);
    }
  };

  const copyUrl = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        setToastData({
          message: "URL copied to clipboard!",
          textcol: "text-green-500",
        });
        setIsToast(true);
      })
      .catch(() => {
        setToastData({
          message: "Failed to copy URL!",
          textcol: "text-red-500",
        });
        setIsToast(true);
      });
  };

  const handleCommentSubmit = async () => {
    if (!token) {
      setToastData({
        message: "Login to comment",
        textcol: "text-red-500",
      });
      setIsToast(true);
      return;
    }

    if (!newComment.trim()) {
      setToastData({
        message: "Comment cannot be empty",
        textcol: "text-red-500",
      });
      setIsToast(true);
      return;
    }

    try {
      const response = await axios.post(
        "create-comment/",
        {
          blog: blogData.id,
          comment: newComment,
          commented_by: user.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setBlogData((prev) => ({
        ...prev,
        comments: [response.data, ...prev.comments],
      }));

      setNewComment("");
      setToastData({
        message: "Comment Added Successfully!",
        textcol: "text-green-500",
      });
      setIsToast(true);
    } catch (error) {
      setToastData({
        message: "Can't comment at this moment!",
        textcol: "text-red-500",
      });
      setIsToast(true);
    }
  };

  useEffect(() => {
    let isMounted = true;

    async function fetchBlogData() {
      if (!slug) {
        setLoading(false);
        return; // No explicit return value
      }

      try {
        const response = await axios.get(
          token ? `blog/${slug}` : `blog-fnu/${slug}`,
          token
            ? {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            : {},
        );

        if (isMounted) {
          setBlogData(response.data);
          setIsBookmark(response.data.is_saved);
          setHeartIconCol(response.data.is_liked);
        }
      } catch (error) {
        if (isMounted) {
          setToastData({
            message: "Failed to load blog data.",
            textcol: "text-red-500",
          });
          setIsToast(true);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchBlogData();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [slug, token]);

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
                src={blogData.author_avatar || AnonymousUserImg}
                alt="author profile picture"
                className="rounded-full"
              />
              <p className="text-lg">
                <span className="text-gray-800 font-large">
                  {blogData.author_name}
                </span>
              </p>
              <Calendar className="w-5 h-5" />
              <p className="text-lg">
                <span className="text-gray-800 font-large">
                  {blogData.created_at
                    ? new Date(blogData.created_at).toLocaleDateString()
                    : "N/A"}
                </span>
              </p>
              <div>
                <Share2
                  className="cursor-pointer"
                  disabled={!token}
                  onClick={copyUrl}
                />
              </div>
              <div>
                <CircleArrowLeft
                  className="cursor-pointer"
                  disabled={!token}
                  onClick={navigateBack}
                />
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
                height={30}
                className="cursor-pointer"
                disabled={!token}
                fill={heartIconCol ? "red" : "none"}
                color={heartIconCol ? "red" : "gray"}
                onClick={handleLikeBtn}
              />
              <p className="text-2xl">{blogData.like_count}</p>
              <MessageCircle
                width={30}
                height={30}
                className="cursor-pointer"
                onClick={toggleCommentSection}
              />
              <p className="text-2xl">{blogData.comment_count}</p>
            </div>
            <div>
              <Bookmark
                width={30}
                height={30}
                className="cursor-pointer"
                disabled={!token}
                fill={isBookmark ? "gray" : "none"}
                color="gray"
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
                  disabled={!token}
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
            <Toast
              setIsToast={setIsToast}
              message={toastData.message}
              isToast={isToast}
              textcol={toastData.textcol}
            />
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
