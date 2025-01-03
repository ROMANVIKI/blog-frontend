"use client";
import "./styles.scss";
import { useCallback } from "react";
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
// load all languages with "all" or common languages with "common"
import { all, createLowlight } from "lowlight";

const lowlight = createLowlight(all);

lowlight.register("html", html);
lowlight.register("css", css);
lowlight.register("js", js);
lowlight.register("ts", ts);

const MenuBar = () => {
  const { editor } = useCurrentEditor();
  const [height, setHeight] = React.useState(480);
  const [width, setWidth] = React.useState(640);

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

  return (
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
          H1
        </ButtonBase>
        <ButtonBase
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 }) ? "is-active" : ""
          }
        >
          H2
        </ButtonBase>
        <ButtonBase
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 }) ? "is-active" : ""
          }
        >
          H3
        </ButtonBase>
        <ButtonBase
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
        >
          Bold
        </ButtonBase>
        <ButtonBase
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
        >
          Italic
        </ButtonBase>
        <ButtonBase
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          isActive={editor.isActive("strike")}
        >
          Strike
        </ButtonBase>
        <ButtonBase
          onClick={() => editor.chain().focus().setParagraph().run()}
          isActive={editor.isActive("paragraph")}
        >
          Paragraph
        </ButtonBase>
        <ButtonBase
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive("codeBlock") ? "is-active" : ""}
        >
          Toggle code block
        </ButtonBase>
        <ButtonBase
          onClick={() => editor.chain().focus().setCodeBlock().run()}
          disabled={editor.isActive("codeBlock")}
        >
          Set code block
        </ButtonBase>
        <ButtonBase
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
        >
          Toggle bullet list
        </ButtonBase>
        <ButtonBase
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
        >
          Toggle ordered list
        </ButtonBase>
        <ButtonBase
          onClick={() => editor.chain().focus().splitListItem("listItem").run()}
          disabled={!editor.can().splitListItem("listItem")}
        >
          Split list item
        </ButtonBase>
        <ButtonBase
          onClick={() => editor.chain().focus().sinkListItem("listItem").run()}
          disabled={!editor.can().sinkListItem("listItem")}
        >
          Sink list item
        </ButtonBase>
        <ButtonBase
          onClick={() => editor.chain().focus().liftListItem("listItem").run()}
          disabled={!editor.can().liftListItem("listItem")}
        >
          Lift list item
        </ButtonBase>
        <ButtonBase
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          Horizontal Rule
        </ButtonBase>
        <ButtonBase onClick={() => editor.chain().focus().setHardBreak().run()}>
          Hard Break
        </ButtonBase>
        <ButtonBase
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          Undo
        </ButtonBase>
        <ButtonBase
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          Redo
        </ButtonBase>
        <ButtonBase
          onClick={() => editor.chain().focus().setColor("#958DF1").run()}
          isActive={editor.isActive("textStyle", { color: "#958DF1" })}
        >
          Purple
        </ButtonBase>
        <ButtonBase onClick={addImage}>Set image</ButtonBase>

        <ButtonBase id="add" onClick={addYoutubeVideo}>
          Add YouTube video
        </ButtonBase>

        <input
          id="width"
          type="number"
          min="320"
          max="1024"
          placeholder="width"
          value={width}
          onChange={(event) => setWidth(event.target.value)}
          className="  border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <input
          id="height"
          type="number"
          min="180"
          max="720"
          placeholder="height"
          value={height}
          onChange={(event) => setHeight(event.target.value)}
          className=" items-center  border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
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

const content = `
<h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you'd probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That's a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn't that great? And all of that is editable. But wait, there's more. Let's try a code block: </p>
<pre><code class="language-css">body {
  display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. It's only the tip of the iceberg though. Give it a try and click a little bit around. Don't forget to check the other examples too.
</p>
<blockquote>
  Wow, that's amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>
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
