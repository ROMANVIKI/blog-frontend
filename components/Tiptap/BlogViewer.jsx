// import React from "react";
// import DOMPurify from "dompurify";
// import "./styles.scss"; // Optional: Add styles for the blog viewer
//
// const BlogViewer = ({ content }) => {
//   return (
//     <div className="tiptap" dangerouslySetInnerHTML={{ __html: content }} />
//   );
// };
//
// export default BlogViewer;

import React, { memo } from "react";
import DOMPurify from "dompurify";
import "./styles.scss";

const BlogViewer = memo(({ content }) => {
  const sanitizedContent = DOMPurify.sanitize(content);

  return (
    <div
      className="tiptap"
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
});

export default BlogViewer;
