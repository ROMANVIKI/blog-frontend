"use client";
import Link from "next/link";
import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import axios from "axios";

// Backend validation function
const checkExistingUser = async (email) => {
  try {
    const response = await fetch("/api/check-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    return data.exists;
  } catch (error) {
    console.error("Validation error:", error);
    return false;
  }
};

const LoginForm = () => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
          Login To Continue
        </h2>
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={Yup.object({
            username: Yup.string().required("Required"),
            password: Yup.string().required("Required"),
          })}
          onSubmit={(values, { setSubmitting }) => {
            try {
              axios
                .post("http://localhost:8000/api/token/", {
                  username: values.username,
                  password: values.password,
                })
                .then((response) => {
                  localStorage.setItem("accessToken", response.data.access);
                  localStorage.setItem("refreshToken", response.data.refresh);
                  console.log(response.data);
                  alert("Token obtained successfully");
                  setSubmitting(false);
                  router.push("/create-blog");
                })
                .catch((error) => {
                  alert(error);
                  setSubmitting(false);
                });

              // Your form submission logic here
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
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-600"
                >
                  User Name
                </label>
                <Field
                  name="username"
                  type="text"
                  placeholder="Enter Your Username"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-600"
                >
                  Password
                </label>
                <Field
                  name="password"
                  type="password"
                  placeholder="Enter The Password"
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
                Don't you have an account?{" "}
                <Link href="/signup" className="text-blue-600 hover:underline">
                  Signup
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
