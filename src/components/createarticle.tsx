import { useEffect, useRef, useState } from "react";
import bgCover from "@/assets/img/bg-cover.png";
import EditorJS from "@editorjs/editorjs";
import { tools } from "./editorTools";
import { db } from "@/firebase/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useOutletContext } from "react-router";
import { toast } from 'react-toastify';

type EditorActions = {
  formRef: React.RefObject<HTMLFormElement>;
};

export default function CreateArticle() {
  const { formRef } = useOutletContext<EditorActions>();

  const editorRef = useRef<EditorJS | null>(null);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [actionType, setActionType] = useState<"draft" | "published">("published");

  useEffect(() => {
    if (editorRef.current) return;
    
    const editor = new EditorJS({
      holder: "editorjs",
      autofocus: true,
      tools: tools,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!editorRef.current || !title.trim()) {
      alert("Please add a title");
      return;
    }

    try {
      setLoading(true);
      const content = await editorRef.current.save();
      
      // Save to Firebase
      await addDoc(collection(db, "articles"), {
        title,
        content,
        status: actionType, // Use the actionType state
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      toast.success(`Article ${actionType === "published" ? "published" : "saved as draft"} successfully!`);
      
      // Optional: Redirect or clear form
      // setTitle("");
      // editorRef.current.clear();
      
    } catch (error) {
      console.error("Error saving article:", error);
      alert("Failed to save article");
    } finally {
      setLoading(false);
    }
  };

  // Optional: Separate handler for save draft
  // const handleSaveDraft = () => {
  //   setActionType("draft");
  //   if (formRef.current) {
  //     formRef.current.requestSubmit();
  //   }
  // };

  return (
    <div>
      <div
        className="bg-contain bg-center h-screen bg-no-repeat"
        style={{ backgroundImage: `url(${bgCover})` }}
      >
        <div className="max-w-4xl mx-auto pt-20 bg-white/80 p-3 rounded">
          <form ref={formRef} onSubmit={handleSubmit}>
            {/* Hidden input to track action type */}
            <input type="hidden" value={actionType} onChange={(e) => setActionType(e.target.value as "draft" | "published")} />
            
            {/* Title Input */}
            <input
              type="text"
              placeholder="Article title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-2xl mx-20 font-bold outline-none border-b pb-2 bg-transparent"
              disabled={loading}
            />

            {/* EditorJS */}
            <div className="mt-4" id="editorjs"></div>
            
            {/* Optional: Local submit button for testing */}
            {/* <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Submit Form"}
            </Button> */}
          </form>
        </div>
      </div>
    </div>
  );
}