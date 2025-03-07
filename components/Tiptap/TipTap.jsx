"use client";
import "./styles.scss";
import { useCallback, useState, useEffect } from "react";
import { Color } from "@tiptap/extension-color";
import Heading from "@tiptap/extension-heading";
import Image from "@tiptap/extension-image";
import TextStyle from "@tiptap/extension-text-style";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import Youtube from "@tiptap/extension-youtube";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import BulletList from "@tiptap/extension-bullet-list";
import Document from "@tiptap/extension-document";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import { EditorContent, useEditor } from "@tiptap/react";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import python from "highlight.js/lib/languages/python";
import jsx from "highlight.js/lib/languages/javascript"; // JSX (React)
import json from "highlight.js/lib/languages/json";
import bash from "highlight.js/lib/languages/bash";
import { all, createLowlight } from "lowlight";
import axios from "../../utils/axios";
// import axios from "axios";
import Toast from "../../components/ui/Toast";
import { useRouter } from "next/navigation";
import slugify from "slugify";

import {
  IconH1,
  IconH2,
  IconH3,
  IconBold,
  IconItalic,
  IconStrikethrough,
  IconPilcrowRight,
  IconCodeDots,
  IconCode,
  IconList,
  IconListNumbers,
  IconArrowsHorizontal,
  IconBaselineDensityLarge,
  IconArrowBackUp,
  IconArrowForwardUp,
  IconAccessible,
  IconPhotoScan,
  IconBrandYoutubeFilled,
  IconSquareXFilled,
  IconCloudUp,
  IconPhotoPlus,
} from "@tabler/icons-react";

const lowlight = createLowlight(all);

lowlight.register("python", python);
lowlight.register("jsx", jsx);
lowlight.register("json", json);
lowlight.register("bash", bash);
lowlight.register("html", html);
lowlight.register("css", css);
lowlight.register("js", js);
lowlight.register("ts", ts);

const MenuBar = () => {
  const { editor } = useCurrentEditor();
  const [height, setHeight] = React.useState(480);
  const [width, setWidth] = React.useState(640);
  // const [token, setToken] = useState(null);
  const router = useRouter();
  const [isToast, setIsToast] = useState(false);
  const [toastData, setToastData] = useState({
    message: "",
    textcol: "",
  });

  // useEffect(() => {
  //   const token1 = localStorage.getItem("accessToken");
  //   if (!token1) {
  //     setToken(token1);
  //   }
  // }, []);

  if (!editor) return null;

  const ButtonBase = ({ onClick, disabled, isActive, children }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-3 py-1 rounded-lg text-sm font-medium
        transition-all duration-200 ease-in-out
        ${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-opacity-80"}
        ${
          isActive
            ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md"
            : "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300"
        }
      `}
    >
      {children}
    </button>
  );

  const addYoutubeVideo = () => {
    const url = prompt("Enter YouTube URL");

    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
        width: Math.max(320, parseInt(width, 10)) || 640,
        height: Math.max(180, parseInt(height, 10)) || 480,
      });
    }
  };

  const addImage = useCallback(() => {
    const url = window.prompt("URL");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const uploadImage = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.click();

    input.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const dataURL = e.target.result;

          editor.chain().focus().setImage({ src: dataURL }).run();
        };
        reader.readAsDataURL(file);
      }
    };
  }, [editor]);

  const clearContent = () => {
    editor?.commands.clearContent();
  };

  const submitData = async ({ blogData }) => {
    try {
      const response = await axios.post(
        "create-blog/",
        {
          title: blogData.title,
          slug: blogData.slug,
          content: blogData.content,
          author: blogData.author,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      );
      setToastData({
        message: "Blog Created Successfully!!",
        textcol: "text-blue-500",
      });
      setIsToast(true);
      router.push("/creations");
    } catch (e) {
      setToastData({
        message: `Error: Try using a different blog name or try again later.`,
        textcol: "text-red-500",
      });
      setIsToast(true);
    }
  };

  const handleSubmit = useCallback(() => {
    if (!editor) return;

    // Get the editor's HTML content
    const content = editor.getHTML();

    // Extract the first h1 tag content as the title
    const titleMatch = content.match(/<h1>(.*?)<\/h1>/);
    const title = titleMatch ? titleMatch[1].trim() : "Untitled Post";

    // Remove the h1 tag from the content
    const contentWithoutTitle = content.replace(/<h1>.*?<\/h1>/, "").trim();

    // Generate the sluf from the title
    const slug = slugify(title, {
      lower: true,
      strict: true,
    });

    // Prepare the data to send to backend

    const blogData = {
      title: title,
      author: 1,
      content: content,
    };

    submitData({ blogData });
  }, [editor]);

  const addCodeBlock = () => {
    const language = prompt(
      "Enter language (e.g., python, jsx, json, bash, ts, js):",
    );

    if (language) {
      editor.chain().focus().setCodeBlock({ language }).run();
    }
  };

  return (
    <>
      <div className="bg-black bg-opacity-90 backdrop-blur-sm shadow-lg rounded-lg p-4 mb-4 sticky top-0 z-10 border border-gray-100">
        <div className="flex flex-wrap gap-2">
          <ButtonBase
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor.isActive("heading", { level: 1 }) ? "is-active" : ""
            }
          >
            <IconH1 />
          </ButtonBase>
          <ButtonBase
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor.isActive("heading", { level: 2 }) ? "is-active" : ""
            }
          >
            <IconH2 />
          </ButtonBase>
          <ButtonBase
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={
              editor.isActive("heading", { level: 3 }) ? "is-active" : ""
            }
          >
            <IconH3 />
          </ButtonBase>
          <ButtonBase
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            isActive={editor.isActive("bold")}
          >
            <IconBold />
          </ButtonBase>
          <ButtonBase
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            isActive={editor.isActive("italic")}
          >
            <IconItalic />
          </ButtonBase>
          <ButtonBase
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            isActive={editor.isActive("strike")}
          >
            <IconStrikethrough />
          </ButtonBase>
          <ButtonBase
            onClick={() => editor.chain().focus().setParagraph().run()}
            isActive={editor.isActive("paragraph")}
          >
            <IconPilcrowRight />
          </ButtonBase>
          <ButtonBase
            onClick={addCodeBlock}
            className={editor.isActive("codeBlock") ? "is-active" : ""}
          >
            <IconCodeDots />
          </ButtonBase>
          <ButtonBase
            onClick={() => editor.chain().focus().setCodeBlock().run()}
            disabled={editor.isActive("codeBlock")}
          >
            <IconCode />
          </ButtonBase>
          <ButtonBase
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "is-active" : ""}
          >
            <IconList />
          </ButtonBase>
          <ButtonBase
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive("orderedList") ? "is-active" : ""}
          >
            <IconListNumbers />
          </ButtonBase>
          <ButtonBase
            onClick={() =>
              editor.chain().focus().splitListItem("listItem").run()
            }
            disabled={!editor.can().splitListItem("listItem")}
          >
            Split list item
          </ButtonBase>
          <ButtonBase
            onClick={() =>
              editor.chain().focus().sinkListItem("listItem").run()
            }
            disabled={!editor.can().sinkListItem("listItem")}
          >
            Sink list item
          </ButtonBase>
          <ButtonBase
            onClick={() =>
              editor.chain().focus().liftListItem("listItem").run()
            }
            disabled={!editor.can().liftListItem("listItem")}
          >
            Lift list item
          </ButtonBase>
          <ButtonBase
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          >
            <IconArrowForwardUp />
          </ButtonBase>
          <ButtonBase
            onClick={() => editor.chain().focus().setHardBreak().run()}
          >
            <IconBaselineDensityLarge />
          </ButtonBase>
          <ButtonBase
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
          >
            <IconArrowBackUp />
          </ButtonBase>
          <ButtonBase
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
          >
            <IconArrowForwardUp />
          </ButtonBase>
          <ButtonBase
            onClick={() => editor.chain().focus().setColor("#958DF1").run()}
            isActive={editor.isActive("textStyle", { color: "#958DF1" })}
          >
            <IconAccessible />
          </ButtonBase>
          <ButtonBase onClick={addImage}>
            <IconPhotoScan />
          </ButtonBase>

          <ButtonBase id="add" onClick={uploadImage}>
            <IconPhotoPlus />
          </ButtonBase>

          <div className="hidden max-md:flex justify-between space-x-2">
            <div>
              <ButtonBase id="add" onClick={addYoutubeVideo}>
                <IconBrandYoutubeFilled />
              </ButtonBase>
            </div>
            <div>
              <input
                id="width"
                type="number"
                min="320"
                max="1024"
                placeholder="width"
                value={width}
                onChange={(event) => setWidth(event.target.value)}
                className="w-24 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>

            <div>
              <input
                id="height"
                type="number"
                min="180"
                max="720"
                placeholder="height"
                value={height}
                onChange={(event) => setHeight(event.target.value)}
                className="w-24 px-3 py-2 ml-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <div className="bg-gray-700 max-md:hidden flex w-full items-center p-2 rounded-lg justify-center">
            <p className="text-white mr-4 text-lg text-bold">
              Youtube Integration Section
            </p>
            <div className="flex items-center space-x-4">
              <div>
                <ButtonBase id="add" onClick={addYoutubeVideo}>
                  <IconBrandYoutubeFilled />
                </ButtonBase>
              </div>
              <div>
                <input
                  id="width"
                  type="number"
                  min="320"
                  max="1024"
                  placeholder="width"
                  value={width}
                  onChange={(event) => setWidth(event.target.value)}
                  className="w-24 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
                <input
                  id="height"
                  type="number"
                  min="180"
                  max="720"
                  placeholder="height"
                  value={height}
                  onChange={(event) => setHeight(event.target.value)}
                  className="w-24 px-3 py-2 ml-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-row justify-between w-full">
            <div>
              <ButtonBase id="add" onClick={clearContent}>
                Clear
              </ButtonBase>
            </div>
            <div>
              <ButtonBase id="add" onClick={handleSubmit}>
                Submit
              </ButtonBase>
            </div>
          </div>
        </div>
      </div>
      {isToast && (
        <Toast
          setIsToast={setIsToast}
          message={toastData.message}
          isToast={isToast}
          textcol={toastData.textcol}
        />
      )}
    </>
  );
};

const extensions = [
  Document,
  Paragraph,
  Text,
  Image,
  BulletList,
  OrderedList,
  ListItem,
  Heading.configure({
    levels: [1, 2, 3],
  }),
  CodeBlockLowlight.configure({
    lowlight,
  }),
  Youtube.configure({
    controls: false,
    nocookie: true,
  }),
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit,
];

const content = `<h1>
  My Awesome Blog Post
</h1>
<p>
  Start writing your amazing blog post here. You can use various formatting options like <em>italic</em>, 
  <strong>bold</strong>, and much more!
</p>
<h2>
  Introduction
</h2>
<p>
  Write an engaging introduction to hook your readers...
</p>
<h2>
  Main Content
</h2>
<ul>
  <li>
    Your first important point
  </li>
  <li>
    Another crucial insight
  </li>
</ul>
<h2>
  Conclusion
</h2>
<p>
  Wrap up your thoughts and leave your readers with something to think about.
</p>
`;

const TipTapEditor = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl shadow-xl p-6">
        <EditorProvider
          slotBefore={<MenuBar />}
          extensions={extensions}
          content={content}
          editorProps={{
            attributes: {
              class:
                "prose prose-lg max-w-none focus:outline-none min-h-[300px] p-4",
            },
          }}
        ></EditorProvider>
      </div>
    </div>
  );
};

export default TipTapEditor;
