"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

// Backend validation function
const checkExistingUser = async (email) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/check-email/",
      { email },
    );
    return response.data.exists;
  } catch (error) {
    console.error("Validation error:", error);
    throw new Error("Failed to check email existence");
  }
};

const checkExistingUserName = async (username) => {
  try {
    const res = await axios.post("http://localhost:8000/api/check-username/", {
      username,
    });
    console.log(`API Response: ${res.data.exists}`);
    return res.data.exists;
  } catch (error) {
    console.error("Validation error:", error);
    throw new Error("Failed to check username existence");
  }
};

// Submit form function
const submitForm = async (values) => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/create-user/",
      values,
    );
    return response.data;
  } catch (error) {
    console.error("Error submitting form:", error);
    throw error;
  }
};

const SignupForm = () => {
  const [emailError, setEmailError] = useState("");
  const [userNameError, setUserNameError] = useState("");

  const handleEmailBlur = async (e) => {
    const email = e.target.value;

    // Check if the email field is empty
    if (!email) {
      setEmailError("Email is required");
      return;
    }

    // Validate email format using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
      return;
    }

    // If the email format is valid, proceed to check with the database
    try {
      const exists = await checkExistingUser(email);
      if (exists) {
        setEmailError("Email already exists");
      } else {
        setEmailError(""); // No error
      }
    } catch (error) {
      setEmailError("Failed to validate email");
    }
  };

  const handleUserNameBlur = async (e) => {
    const username = e.target.value;
    if (!username) {
      setUserNameError("Username is required");
      return;
    }
    try {
      const exists = await checkExistingUserName(username);
      if (exists) {
        setUserNameError("Usrename already exists");
      } else {
        setUserNameError("");
      }
    } catch (error) {
      setUserNameError("Failed to validate the username from the server");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
          Signup To Continue
        </h2>
        <Formik
          initialValues={{
            userName: "",
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            // userName: Yup.string()
            //   .max(15, "Must be 15 characters or less")
            //   .required("Required"),
            password: Yup.string()
              .min(8, "Password must be at least 8 characters")
              .matches(/[a-z]/, "Must contain at least one lowercase letter")
              .matches(/[A-Z]/, "Must contain at least one uppercase letter")
              .matches(/[0-9]/, "Must contain at least one number")
              .matches(
                /[@$!%*?&#]/,
                "Must contain at least one special character",
              )
              .required("Password is required"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await submitForm(values);
            } catch (error) {
              console.error("Submission error:", error);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <div>
                <label
                  htmlFor="userName"
                  className="block mb-2 text-sm font-medium text-gray-600"
                >
                  User Name
                </label>
                <Field
                  name="userName"
                  placeholder="Enter Your User Name"
                  type="text"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  onBlur={handleUserNameBlur}
                />
                {userNameError && (
                  <div className="mt-1 text-sm text-red-500">
                    {userNameError}
                  </div>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-600"
                >
                  Email Address
                </label>
                <Field
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  onBlur={handleEmailBlur}
                />
                {emailError && (
                  <div className="mt-1 text-sm text-red-500">{emailError}</div>
                )}
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-600"
                  htmlFor="password"
                >
                  Password
                </label>
                <Field
                  name="password"
                  type="password"
                  placeholder="Enter Password"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
              <p className="text-sm text-center text-gray-600">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-600 hover:underline">
                  Login
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignupForm;
