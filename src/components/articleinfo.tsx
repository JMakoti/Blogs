import { useParams, Link } from "react-router";
import bgCover from "../assets/img/bg-cover.png";
import { Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import EditorJsRenderer from "@/components/EditorJsrenderer";
import { useEffect, useState } from "react";
import { getArticleById, type Article } from "@/firebase/articleService";
import moment from "moment";

export default function ArticleDetail() {
  const { articleId } = useParams<{ articleId: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!articleId) return;

    getArticleById(articleId)
      .then(setArticle)
      .catch((err) => {
        console.error(err);
        setArticle(null);
      })
      .finally(() => setLoading(false));
  }, [articleId]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-muted-foreground">
        <svg
          className="animate-spin h-8 w-8 text-foreground mb-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          />
        </svg>
        <span className="text-lg font-medium">Loading article…</span>
      </div>
    );

  if (!article) {
    return (
      <div
        className="min-h-screen bg-fixed md:bg-contain bg-cover bg-contain bg-no-repeat bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${bgCover})` }}
      >
        <div className="text-center">
          <h1 className="text-2xl font-serif font-bold text-foreground mb-4">
            Article not found
          </h1>
          <Link to="/">
            <Button variant="outline">Back to Articles</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-fixed md:bg-contain bg-cover bg-contain bg-center min-h-screen bg-no-repeat"
      style={{ backgroundImage: `url(${bgCover})` }}
    >
      {/* Article Header */}
      <header className="max-w-4xl mx-auto px-4 pt-12 pb-8">
        <div className="animate-fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-foreground leading-tight mb-4">
            {article.title}
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8">
            {article.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-4 pb-8 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                <User className="w-5 h-5 text-secondary-foreground" />
              </div>
              <div>
                <p className="font-medium text-foreground">{article.author}</p>
                <p className="text-sm text-muted-foreground">
                  {article.authorBio}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground ml-auto">
              <span>
                {article.createdAt
                  ? moment(
                      article.createdAt.toDate?.() ?? article.createdAt
                    ).format("MMM Do YY")
                  : "Unknown date"}
              </span>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{article.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <div className="max-w-5xl mx-auto px-4 mb-12">
        <div
          className="
      relative 
      w-full 
      max-w-5xl 
      mx-auto
      aspect-[16/9] 
      sm:aspect-[4/3] 
      md:aspect-[16/9]
      overflow-hidden 
      rounded-xl 
      animate-fade-in
    "
          style={{ animationDelay: "100ms" }}
        >
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover cursor-pointer"
          />
        </div>
      </div>

      {/* Article Content */}
      <article
        className="max-w-3xl mx-auto px-4 pb-16 animate-fade-in"
        style={{ animationDelay: "200ms" }}
      >
        <EditorJsRenderer data={article.content} />
      </article>

      {/* Author Card */}
      <div className="max-w-3xl mx-auto px-4 pb-16">
        <div className="bg-card border border-border rounded-xl p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
              <User className="w-7 h-7 text-secondary-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wide mb-1">
                Written by
              </p>
              <h3 className="text-xl font-serif font-bold text-card-foreground mb-2">
                {article.author}
              </h3>
              <p className="text-muted-foreground">
                {article.authorBio}. Passionate about sharing insights and
                stories that inspire thoughtful living.
              </p>
              <Button variant="outline" className="mt-4" size="sm">
                Follow
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
