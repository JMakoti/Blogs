import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import LinkTool from "@editorjs/link";
// import SimpleImage from "@editorjs/simple-image";
import ImageTool from "@editorjs/image";
import Checklist from "@editorjs/checklist";
import EditorjsList from "@editorjs/list";
import Embed from "@editorjs/embed";

const uploadImageByUrl = async (url: string) => {
  return {
    success: 1,
    file: {
      url,
    },
  };
};

const uploadImageByFile = () => {};

export const tools = {
  header: {
    class: Header,
    // inlineToolbar: true,
    config: {
      placeholder: "Type Heading.....",
      levels: [1, 2, 3, 4, 5, 6],
      defaultLevel: 2,
    },
  },
  linkTool: {
    class: LinkTool,
    config: {
      endpoint: "http://localhost:8008/fetchUrl", // Your backend endpoint for url data fetching,
    },
  },
  checklist: {
    class: Checklist,
    inlineToolbar: true,
  },
  // image: SimpleImage,
  image: {
    class: ImageTool,
    config: {
      endpoints: {
        byFile: "http://localhost:8008/uploadFile", // Your backend file uploader endpoint
        byUrl: uploadImageByUrl, // "http://localhost:8008/fetchUrl", // Your endpoint that provides uploading by Url
      },
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
  List: {
    class: EditorjsList,
    inlineToolbar: true,
    config: {
      defaultStyle: "unordered",
    },
  },
  embed: Embed,
};
