import React, { memo, useEffect } from "react";
import DOMPurify from "dompurify";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import "./styles.scss";

const BlogViewer = memo(({ content }) => {
  const sanitizedContent = DOMPurify.sanitize(content);

  useEffect(() => {
    document.querySelectorAll("pre code").forEach((block) => {
      hljs.highlightElement(block);
    });

    document.querySelectorAll("pre").forEach((block) => {
      if (block.querySelector(".copy-button")) return;

      const copyButton = document.createElement("button");
      copyButton.classList.add("copy-button");
      copyButton.innerText = "Copy";
      block.appendChild(copyButton);

      copyButton.addEventListener("click", () => {
        const code = block.querySelector("code").innerText;
        navigator.clipboard.writeText(code).then(() => {
          copyButton.innerText = "Copied!";
          setTimeout(() => (copyButton.innerText = "Copy"), 1500);
        });
      });
    });
  }, [content]);

  return (
    <div
      className="tiptap"
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  );
});

export default BlogViewer;
