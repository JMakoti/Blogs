import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import LinkTool from "@editorjs/link";
import ImageTool from "@editorjs/image";
import EditorjsList from "@editorjs/list";
import Embed from "@editorjs/embed";
import { uploadToCloudinary } from "./cloudinaryUpload";

const uploadImageByUrl = async (url: string) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    const imageName = url.split("/").pop() || "uploaded-image.jpg";
    const file = new File([blob], imageName, { type: blob.type });
    const { url: firebaseUrl, publicId } = await uploadToCloudinary(file);
    return {
      success: 1,
      file: {
        url: firebaseUrl,
        publicId: publicId,
      },
    };
  } catch (error) {
    console.error("Error uploading by URL:", error);
    return {
      success: 0,
    };
  }
};

export const tools = {
  header: {
    class: Header,
    inlineToolbar: true,
    config: {
      placeholder: "Type Heading.....",
      levels: [1, 2, 3, 4, 5, 6],
      defaultLevel: 2,
    },
  },
  linkTool: LinkTool,
  // linkTool: {
  //   class: LinkTool,
  //   config: {
  //     endpoint: "http://localhost:8008/fetchUrl", // Your backend endpoint for url data fetching,
  //   },
  // },
  // checklist: {
  //   class: Checklist,
  //   inlineToolbar: true,
  // },
  image: {
    class: ImageTool,
    config: {
      uploader: {
        uploadByFile: async (file: File) => {
          try {
            // const url = await uploadImageToFirebase(file);
            const { url, publicId } = await uploadToCloudinary(file);
            return {
              success: 1,
              file: {
                url: url,
                publicId: publicId,
              },
            };
          } catch (error) {
            console.error("Firebase Upload Error:", error);
            return {
              success: 0,
            };
          }
        },
        uploadByUrl: uploadImageByUrl,
      },

      // config: {
      //   endpoints: {
      //     byFile: uploadImageByFile, // "http://localhost:8008/uploadFile", // Your backend file uploader endpoint
      //     byUrl: uploadImageByUrl, // "http://localhost:8008/fetchUrl", // Your endpoint that provides uploading by Url
      //   },
      // },
    },
  },
  quote: {
    class: Quote,
    inlineToolbar: true,
    shortcut: "CMD+SHIFT+O",
    config: {
      quotePlaceholder: "Enter a quote",
      captionPlaceholder: "Quote's author",
    },
  },
  list: {
    class: EditorjsList,
    inlineToolbar: true,
    // config: {
    //   defaultStyle: "unordered",
    // },
  },
  embed: {
    class: Embed,
    inlineToolbar: false,
  },
};
