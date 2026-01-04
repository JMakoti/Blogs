interface EditorJsBlock {
  id?: string;
  type: string;
  data: any;
}

interface EditorJsData {
  blocks: EditorJsBlock[];
}

interface EditorJsRendererProps {
  data: EditorJsData;
}

const classNames = {
  paragraph: "text-muted-foreground leading-relaxed mb-6 text-lg",

  header: {
    h1: "text-4xl font-serif font-bold text-foreground mt-10 mb-4",
    h2: "text-2xl font-serif font-bold text-foreground mt-12 mb-4",
    h3: "text-xl font-serif font-bold text-foreground mt-8 mb-3",
    h4: "text-lg font-serif font-bold text-foreground mt-6 mb-2",
  },

  list: {
    container: "text-muted-foreground my-6 pl-6 list-disc",
    listItem: "mb-2",
  },

  quote: {
    container: "border-l-4 border-primary pl-6 italic text-foreground my-8",
    author: "text-sm text-muted-foreground mt-2",
  },

  image: {
    img: "w-full rounded-lg",
    figure: "my-8",
    figcaption: "text-center text-sm text-muted-foreground mt-2 italic",
  },

  delimiter: {
    container: "my-10 flex justify-center text-muted-foreground",
  },
};

const HeaderTags = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
} as const;

type HeaderLevel = keyof typeof HeaderTags;

export default function EditorJsRenderer({ data }: EditorJsRendererProps) {
  if (!data?.blocks?.length) {
    return <p className="text-muted-foreground">No content available.</p>;
  }

  return (
    <div className="editorjs-content">
      {data.blocks.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p
                key={block.id ?? index}
                className={classNames.paragraph}
                dangerouslySetInnerHTML={{ __html: block.data.text }}
              />
            );

          case "header": {
            const level = block.data.level as HeaderLevel;
            const Tag = HeaderTags[level] ?? "h2";

            return (
              <Tag
                key={block.id ?? index}
                className={classNames.header[Tag]}
                dangerouslySetInnerHTML={{ __html: block.data.text }}
              />
            );
          }

          case "list":
            return (
              <ul key={block.id ?? index} className={classNames.list.container}>
                {block.data.items.map((item: string, i: number) => (
                  <li
                    key={i}
                    className={classNames.list.listItem}
                    dangerouslySetInnerHTML={{ __html: item }}
                  />
                ))}
              </ul>
            );

          case "quote":
            return (
              <blockquote
                key={block.id ?? index}
                className={classNames.quote.container}
              >
                <p dangerouslySetInnerHTML={{ __html: block.data.text }} />
                {block.data.caption && (
                  <footer className={classNames.quote.author}>
                    — {block.data.caption}
                  </footer>
                )}
              </blockquote>
            );

          case "image":
            return (
              <figure
                key={block.id ?? index}
                className={classNames.image.figure}
              >
                <img
                  src={block.data.file?.url}
                  alt={block.data.caption || "Article image"}
                  className={classNames.image.img}
                />
                {block.data.caption && (
                  <figcaption className={classNames.image.figcaption}>
                    {block.data.caption}
                  </figcaption>
                )}
              </figure>
            );

          case "delimiter":
            return (
              <div
                key={block.id ?? index}
                className={classNames.delimiter.container}
              >
                * * *
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
