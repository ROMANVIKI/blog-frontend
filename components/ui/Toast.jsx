"use client";
import React, { useState, useEffect } from "react";

const Toast = ({
  message,
  position = "top-right",
  textcol,
  isToast,
  setIsToast,
}) => {
  // if (!isToast) {
  //   console.log("is not visible from Toast");
  // }
  // if (isToast) {
  //   console.log("is visible from Toast");
  // }

  useEffect(() => {
    if (isToast) {
      const timer = setTimeout(() => setIsToast(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isToast]);

  if (!isToast) return null;

  // Position styles
  // const positionClasses = {
  //   "top-right": "top-4 right-4",
  //   "top-left": "top-4 left-4",
  //   "bottom-right": "bottom-4 right-4",
  //   "bottom-left": "bottom-4 left-4",
  // };

  return (
    <div
      className="fixed z-50 p-4 bg-white shadow-lg rounded-lg border border-gray-200 font-bold top-4 right-4"
      role="alert"
      aria-live="assertive"
    >
      <p className={`text-lg ${textcol}`}>{message}</p>
    </div>
  );
};

export default Toast;
