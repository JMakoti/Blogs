import { useEffect, useRef, useState } from "react";
import bgCover from "@/assets/img/bg-cover.png";
import EditorJS from "@editorjs/editorjs";
import { tools } from "./editorTools";
import { db } from "@/firebase/firebase";
import { doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useNavigate, useOutletContext, useParams } from "react-router";
import { toast } from "react-toastify";
import { uploadToCloudinary } from "./cloudinaryUpload";
import { getArticleById, type Article } from "@/firebase/articleService";

type EditorActions = {
  formRef: React.RefObject<HTMLFormElement>;
};

export default function EditArticle() {
  const { articleId } = useParams<{ articleId: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const { formRef } = useOutletContext<EditorActions>();

  const editorRef = useRef<EditorJS | null>(null);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [author, setAuthor] = useState("");
  const [authorBio, setAuthorBio] = useState("");
  const [readTime, setReadTime] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [actionType] = useState<"draft" | "published">("published");

  const navigate = useNavigate();

  // Fetch article
  useEffect(() => {
    if (!articleId) return;
    setLoading(true);

    getArticleById(articleId)
      .then((data) => {
        if (!data) {
          toast.error("Article not found");
          return;
        }
        setArticle(data);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load article");
      })
      .finally(() => setLoading(false));
  }, [articleId]);

  // Initialize editor when article is ready
  useEffect(() => {
    if (!article || editorRef.current) return;

    setTitle(article.title || "");
    setExcerpt(article.excerpt || "");
    setAuthor(article.author || "");
    setAuthorBio(article.authorBio || "");
    setReadTime(article.readTime || "");
    setImagePreview(article.imageUrl || null);

    const editor = new EditorJS({
      holder: "editorjs",
      data: article.content,
      autofocus: true,
      tools: tools,
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
  }, [article]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editorRef.current || !title.trim()) {
      toast.error("Please add a title");
      return;
    }

    try {
      setLoading(true);
      let imageUrl = article!.imageUrl || "";
      let imagePublicId = article?.imagePublicId || "";

      // Upload image to Cloudinary if exists
      if (image) {
        try {
          toast.info("Uploading image...");
          const result = await uploadToCloudinary(image, imagePublicId);

          imageUrl = result.url;
          imagePublicId = result.publicId;

          toast.success("Image uploaded successfully!");
        } catch (error) {
          console.error("Error uploading image:", error);
          toast.error("Failed to upload image. Please try again.");
          setLoading(false);
          return;
        }
      }

      // Get editor content
      const content = await editorRef.current.save();

      // Prepare article data
      const articleData = {
        title: title.trim(),
        excerpt: excerpt.trim(),
        author: author.trim(),
        authorBio: authorBio.trim(),
        readTime: readTime.trim(),
        content,
        status: actionType,
        imageUrl,
        imagePublicId,
        updatedAt: serverTimestamp(),
      };

      // Save to Firebase
      const articleRef = doc(db, "articles", article!.id);
      await updateDoc(articleRef, articleData);

      toast.success("Article updated successfully!");
      navigate(`/${article!.id}`);
    } catch (error) {
      console.error("Error saving article:", error);
      toast.error("Failed to save article");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Basic validation for image file
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }

      // Validate file size (e.g., 10MB limit)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        toast.error("Image size should be less than 10MB");
        return;
      }

      setImage(file);

      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      // Clean up previous preview URL if exists
      return () => {
        if (imagePreview) {
          URL.revokeObjectURL(imagePreview);
        }
      };
    }
  };

  // Remove image
  const removeImage = () => {
    setImage(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
  };

  return (
    <div>
      <div
        className="bg-fixed md:bg-contain bg-cover bg-contain bg-center h-auto bg-no-repeat"
        style={{ backgroundImage: `url(${bgCover})` }}
      >
        <div className="max-w-4xl mx-auto pt-20 bg-white/80 p-6 rounded-lg">
          <form ref={formRef} onSubmit={handleUpdate} className="space-y-6">
            {/* Title Input */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Article Title *
              </label>
              <input
                id="title"
                type="text"
                placeholder="Enter article title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-xl font-bold outline-none border-b-2 border-gray-300 focus:border-blue-500 pb-2 bg-transparent"
                disabled={loading}
                required
              />
            </div>

            {/* Excerpt Input */}
            <div>
              <label
                htmlFor="excerpt"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Article Excerpt *
              </label>
              <input
                id="excerpt"
                type="text"
                placeholder="Enter article excerpt..."
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="w-full text-lg outline-none border-b-2 border-gray-300 focus:border-blue-500 pb-2 bg-transparent"
                disabled={loading}
                required
              />
            </div>

            {/* Author Input */}
            <div>
              <label
                htmlFor="author"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Author Name
              </label>
              <input
                id="author"
                type="text"
                placeholder="Enter author name..."
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full text-lg outline-none border-b-2 border-gray-300 focus:border-blue-500 pb-2 bg-transparent"
                disabled={loading}
              />
            </div>

            {/* Author Bio Input */}
            <div>
              <label
                htmlFor="authorBio"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Author Bio
              </label>
              <textarea
                id="authorBio"
                placeholder="Enter author bio..."
                value={authorBio}
                onChange={(e) => setAuthorBio(e.target.value)}
                className="w-full text-lg outline-none border-2 border-gray-300 focus:border-blue-500 rounded p-2 bg-transparent resize-none"
                disabled={loading}
                rows={3}
              />
            </div>

            {/* Read Time Input */}
            <div>
              <label
                htmlFor="readTime"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Read Time (e.g., "5 min read")
              </label>
              <input
                id="readTime"
                type="text"
                placeholder="Enter estimated read time..."
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
                className="w-full text-lg outline-none border-b-2 border-gray-300 focus:border-blue-500 pb-2 bg-transparent"
                disabled={loading}
              />
            </div>

            {/* Article Image */}
            <div>
              <label
                htmlFor="articleImage"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Article Featured Image
              </label>
              <input
                id="articleImage"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                disabled={loading}
              />

              {/* Image Preview */}
              {imagePreview && (
                <div className="mt-4 relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-h-64 rounded-lg object-cover"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                  >
                    ✕
                  </button>
                </div>
              )}

              {image && !imagePreview && (
                <p className="mt-1 text-sm text-gray-500">
                  Selected: {image.name} (
                  {(image.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
            </div>

            {/* EditorJS */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Article Content *
              </label>
              <div className="border-2 border-gray-300 rounded-lg p-4 min-h-[400px]">
                <div id="editorjs"></div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
