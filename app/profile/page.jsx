"use client";
import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "../../utils/axios.js";
import ImageResizer from "../../components/ImageResizer";
import Image from "next/image";
import AnonymouseUserImg from "../../public/annymous_user.jpg";
import { useAppState } from "../../context/StateContext";
import { useRouter } from "next/navigation";

const ProfileForm = () => {
  const router = useRouter();
  const { state } = useAppState();
  const token = state.AccessToken;
  const [isToast, setIsToast] = useState(false);
  const [toastData, setToastData] = useState({
    message: "",
    textcol: "",
  });

  // Redirect to login if no token is found
  useEffect(() => {
    const token = localStorage.getItem("accessToken"); // Use localStorage directly

    if (!token) {
      router.push("/login");
      return null; // Return null to prevent rendering the rest of the component
    }
  }, []);

  const [initialValues, setInitialValues] = useState({
    id: "",
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    bio: "",
    avatar: null,
  });

  const [userAvatar, setUserAvatar] = useState();

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    bio: Yup.string().max(500, "Bio must be at most 500 characters"),
  });

  const fetchUser = async () => {
    try {
      const response = await axios.get("user/", {
        headers: {
          Authorization: `Bearer ${token}`, // Use the token from localStorage
        },
      });
      const userData = response.data;
      setInitialValues({
        id: userData.id,
        firstName: userData.first_name,
        lastName: userData.last_name,
        username: userData.username,
        email: userData.email,
        bio: userData.bio,
        avatar: userData.avatar,
      });
      setUserAvatar(userData.avatar);
    } catch (error) {
      alert(`Error: ${error.response?.data?.detail || error.message}`);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token]);

  const handleAvatarChange = (file) => {
    setInitialValues((prev) => ({ ...prev, avatar: file }));
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("id", values.id);
      formData.append("first_name", values.firstName);
      formData.append("last_name", values.lastName);
      formData.append("username", values.username);
      formData.append("email", values.email);
      formData.append("bio", values.bio);
      if (values.avatar) {
        formData.append("avatar", values.avatar);
      }

      await axios.put(`edit-user/${values.id}/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Use the token from localStorage
          "Content-Type": "multipart/form-data",
        },
      });
      setToastData({
        message: "You unliked the blog!!",
        textcol: "text-red-800",
      });
      setIsToast(true);

      fetchUser();
    } catch (error) {
      setToastData({
        message: "Error while sending the data, please try again later...!!",
        textcol: "text-red-800",
      });
      setIsToast(true);
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">
          Profile Settings
        </h2>

        {/* Avatar Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-blue-100 shadow-lg mb-4">
              {userAvatar ? (
                <Image
                  src={`https://vblog-gbkd.onrender.com${userAvatar}`}
                  width={128}
                  height={128}
                  alt="profile picture"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={AnonymouseUserImg}
                  width={128}
                  height={128}
                  alt="profile picture"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <ImageResizer
                onImageSubmit={handleAvatarChange}
                className="backdrop-blur-sm bg-black/30 rounded-full w-full h-full flex items-center justify-center"
              />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">Click to change avatar</p>
        </div>

        {/* Form Section */}
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>
                  <Field
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="Enter your first name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>
                  <Field
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Enter your last name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <Field
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Enter your username"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="bio"
                  className="block text-sm font-medium text-gray-700"
                >
                  Bio
                </label>
                <Field
                  as="textarea"
                  name="bio"
                  id="bio"
                  placeholder="Tell us about yourself"
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors resize-none"
                />
                <ErrorMessage
                  name="bio"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transform transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Saving...
                    </span>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
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
};
export default ProfileForm;
