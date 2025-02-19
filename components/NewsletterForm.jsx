import React, { useState } from "react";
import axios from "../utils/axios";

const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      setIsSubmitting(false);
      return;
    }
    console.log(email, "email from handleSubmit func");

    try {
      const response = await axios.post("subscribe/", {
        email,
      });
      console.log("successfully posted");
      setSuccess("You have successfully subscribed!");
      setEmail("");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        type="email"
        value={email}
        onChange={handleEmailChange}
        placeholder="Your email coordinates"
        className="w-full px-4 py-2 bg-gray-900 border border-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
      />
      {error && <p className="text-red-500">{error}</p>}{" "}
      {success && <p className="text-green-500">{success}</p>}{" "}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
      >
        {isSubmitting ? "Subscribing..." : "Launch Subscription"}
      </button>
    </form>
  );
};

export default NewsletterForm;
