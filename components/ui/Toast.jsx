"use client";
import React, { useState, useEffect } from "react";

const Toast = ({
  message,
  duration = 5000,
  position = "top-right",
  textcol,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), duration);
    return () => clearTimeout(timer); // Cleanup on unmount
  }, [duration]);

  if (!isVisible) return null;

  // Position styles
  const positionClasses = {
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
  };

  return (
    <div
      className={`fixed z-50 p-4 bg-white shadow-lg rounded-lg border border-gray-200 ${positionClasses[position]}`}
      role="alert"
      aria-live="assertive"
    >
      <p className={`text-lg ${textcol}`}>{message}</p>
    </div>
  );
};

export default Toast;
