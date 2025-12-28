import { useEffect, useRef } from "react";
import bgCover from "@/assets/img/bg-cover.png";
import EditorJS from "@editorjs/editorjs";
import { tools } from "./articleEditor";

export default function CreateArticle() {
  const editorRef = useRef<EditorJS | null>(null);

  useEffect(() => {
    if (editorRef.current) return;
    let editor = new EditorJS({
      holder: "editorjs",
      autofocus: true,
      tools: tools,
      // data:'',
      placeholder: "Start writing your article...",
      onReady: () => {
        editorRef.current = editor;
      },
    });

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  return (
    <div
      className="bg-contain bg-center h-screen bg-no-repeat"
      style={{ backgroundImage: `url(${bgCover})` }}
    >
      {/* <div className="text-center items-center text-2xl font-bold pt-20">
        <h1>Write Articles</h1>
      </div> */}
      <div className="max-w-3xl mx-auto pt-20 bg-white/90 p-4 rounded">
        <div id="editorjs"></div>
      </div>
    </div>
  );
}
