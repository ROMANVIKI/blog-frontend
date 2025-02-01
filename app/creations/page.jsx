"use client";
import React, { useState } from "react";

const Creations = () => {
  const [dataSet] = useState([
    {
      id: 1,
      title: "Introduction to React",
      content: "React is a JavaScript library for building user interfaces.",
      likes: 120,
      createdAt: "2024-08-20T10:30:00Z",
      author: "John Doe",
    },
    {
      id: 2,
      title: "Understanding Hooks",
      content:
        "Hooks let you use state and other React features without writing a class.",
      likes: 200,
      createdAt: "2024-08-18T14:00:00Z",
      author: "Jane Smith",
    },
    {
      id: 3,
      title: "JavaScript ES6 Features",
      content:
        "ES6 introduced many features such as arrow functions, template literals, and destructuring.",
      likes: 90,
      createdAt: "2024-08-25T09:45:00Z",
      author: "Alice Brown",
    },
    {
      id: 4,
      title: "Next.js vs React",
      content:
        "Next.js is a React framework that enables server-side rendering and static site generation.",
      likes: 150,
      createdAt: "2024-08-22T08:20:00Z",
      author: "Michael Johnson",
    },
    {
      id: 5,
      title: "State Management in React",
      content:
        "State management is an important concept in React applications.",
      likes: 80,
      createdAt: "2024-08-27T12:15:00Z",
      author: "Emily White",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [sortType, setSortType] = useState("newest"); // Default sort: newest

  // Filtering based on search input
  const filteredData = dataSet.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.content.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Sorting logic
  const sortedData = [...filteredData].sort((a, b) => {
    if (sortType === "newest") {
      return new Date(b.createdAt) - new Date(a.createdAt); // Newest first
    } else if (sortType === "oldest") {
      return new Date(a.createdAt) - new Date(b.createdAt); // Oldest first
    } else if (sortType === "most_liked") {
      return b.likes - a.likes; // Most liked first
    } else if (sortType === "least_liked") {
      return a.likes - b.likes; // Least liked first
    }
    return 0;
  });

  return (
    <div className="p-4">
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search articles..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />

      {/* Sorting Options */}
      <select
        value={sortType}
        onChange={(e) => setSortType(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      >
        <option value="newest">Newest to Oldest</option>
        <option value="oldest">Oldest to Newest</option>
        <option value="most_liked">Most Liked</option>
        <option value="least_liked">Least Liked</option>
      </select>

      {/* Display Filtered & Sorted Data */}
      {sortedData.length > 0 ? (
        sortedData.map((item) => (
          <div key={item.id} className="border p-4 my-2 rounded">
            <p className="font-bold text-lg">{item.title}</p>
            <p>{item.content}</p>
            <p>Likes: {item.likes}</p>
            <p>Author: {item.author}</p>
            <p className="text-sm text-gray-500">
              Published: {new Date(item.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No results found.</p>
      )}
    </div>
  );
};

export default Creations;
