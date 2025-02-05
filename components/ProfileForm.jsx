"use client";
import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "../utils/axios";
import ImageResizer from "../components/ImageResizer";
import Image from "next/image";
import AnonymouseUserImg from "../public/annymous_user.jpg";
import { useAppState } from "../context/StateContext";
import { useRouter } from "next/navigation";
import Toast from "../components/ui/Toast";

const ProfileForm = () => {
  const router = useRouter();
  const { state } = useAppState();
  const token = state.AccessToken;
  const [isToast, setIsToast] = useState(false);
  const [toastData, setToastData] = useState({
    message: "",
    textcol: "",
  });

  if (!token) {
    router.push("/login");
  }

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
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
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
      setToastData({
        message: "Server error, try again later!!",
        textcol: "text-red-500",
      });
      setIsToast(true);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

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
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setToastData({
        message: "Profile updated successfully!",
        textcol: "text-green-500",
      });
      setIsToast(true);

      // Refetch user data after update
      fetchUser();
    } catch (error) {
      setToastData({
        message: "Error occurred, please try again later!!",
        textcol: "text-red-500",
      });
      setIsToast(true);
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-6 text-center">
          Profile Settings
        </h2>
        <div className="flex flex-col mb-4 items-center">
          <p className="text-lg pb-4">Avatar</p>
          {userAvatar ? (
            <Image
              src={`https://vblog-gbkd.onrender.com/media/${userAvatar}`}
              width={120}
              height={120}
              alt="profile picture"
              className="rounded-full"
            />
          ) : (
            <Image
              src={AnonymouseUserImg}
              width={120}
              height={120}
              alt="profile picture"
              className="rounded-full"
            />
          )}
          <ImageResizer onImageSubmit={handleAvatarChange} />
        </div>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
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
                    className="mt-1 block w-full border rounded-md p-2"
                  />
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div>
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
                    className="mt-1 block w-full border rounded-md p-2"
                  />
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>
              <div>
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
                  className="mt-1 block w-full border rounded-md p-2"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
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
                  className="mt-1 block w-full border rounded-md p-2"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
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
                  className="mt-1 block w-full border rounded-md p-2"
                />
                <ErrorMessage
                  name="bio"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
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
