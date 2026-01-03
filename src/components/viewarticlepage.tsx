import imgFrame from "@/assets/img/img-frame.png";
import { Bookmark, MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { getArticles } from "@/firebase/articleService";
import type { Article } from "@/firebase/articleService";
import moment from "moment";

const topics = [
  "Programming",
  "Data Science",
  "Technology",
  "Self Improvement",
  "Writing",
  "Relationships",
  "Machine Learning",
  "Productivity",
];

const getInitials = (author: string) => {
  return author
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
};

export default function ViewArticlePage() {
  const [savedArticles, setSavedArticles] = useState<String[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getArticles()
      .then(setArticles)
      .finally(() => setLoading(false));
  }, []);

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

  const toggleSave = (id: String) => {
    setSavedArticles((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  return (
    <div>
      {/* Topics Bar */}
      <div className="border-b border-border bg-white/80 backdrop-blur-sm sticky top-18 space-y-10">
        <div className="max-w-[1336px] mx-auto px-6">
          <div className="flex items-center gap-8 py-3 overflow-x-auto scrollbar-hide">
            <button className="flex items-center gap-1 text-sm font-medium text-foreground whitespace-nowrap">
              <span className="text-lg">+</span>
            </button>
            <button className="text-sm text-foreground font-medium whitespace-nowrap border-b border-foreground pb-3 -mb-3">
              For you
            </button>
            <button className="text-sm text-muted-foreground hover:text-foreground whitespace-nowrap transition-colors">
              Featured
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-[1336px] mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-[1fr_340px] gap-16">
          {/* Articles Feed */}
          <div className="space-y-10">
            {articles.map((article, index) => (
              <motion.article
                key={article.id}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: index * 0.05,
                }}
              >
                <div className="flex gap-6">
                  {/* Content */}
                  <div className="flex-1 min-w-0 text-start">
                    {/* Author Info */}
                    <div className="flex items-center gap-2 mb-2">
                      <Avatar className="w-6 h-6 sm:w-8 sm:h-8">
                        <AvatarFallback className="text-xs sm:text-sm">
                          {getInitials(article.author)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium text-foreground">
                        {article.author}
                      </span>
                    </div>

                    {/* Title */}
                    <Link to={`/${article.id}`}>
                      <h2 className="text-xl font-bold text-foreground leading-tight mb-1 group-hover:underline decoration-1 underline-offset-2 font-serif cursor-pointer">
                        {article.title}
                      </h2>
                    </Link>

                    {/* Excerpt - hidden on mobile */}
                    <p className="hidden md:block text-base text-muted-foreground leading-relaxed mb-3 line-clamp-2">
                      {article.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>
                          {article.createdAt
                            ? moment(
                                article.createdAt.toDate?.() ??
                                  article.createdAt
                              ).format("MMM Do YY")
                            : "Unknown date"}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSave(article.id);
                          }}
                          className="p-2 hover:bg-surface-hover rounded-full transition-colors"
                        >
                          <motion.div
                            whileTap={{ scale: 0.85 }}
                            whileHover={{ scale: 1.1 }}
                          >
                            <Bookmark
                              className={`w-5 h-5 ${
                                savedArticles.includes(article.id)
                                  ? "fill-foreground text-foreground"
                                  : "text-muted-foreground"
                              }`}
                            />
                          </motion.div>
                        </button>
                        <button className="p-2 hover:bg-surface-hover rounded-full transition-colors">
                          <MoreHorizontal className="w-5 h-5 text-muted-foreground" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Image */}
                  <motion.div
                    className="w-35 h-35 md:w-50 md:h-50 flex-shrink-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${imgFrame})` }}
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  >
                    <img
                      loading="lazy"
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-25 ml-4 h-26 pt-3 md:w-36 md:h-38 object-cover md:pt-5 md:ml-5"
                    />
                  </motion.div>
                </div>

                {/* Divider */}
                {/* <div className="mt-10 border-b border-border" /> */}
                <div className="mt-10 w-full">
                  <motion.svg
                    viewBox="0 0 1200 30"
                    className="w-full h-6"
                    preserveAspectRatio="none"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    <motion.path
                      d="M0 15 
         Q 50 0 100 15 
         T 200 15 
         T 300 15 
         T 400 15 
         T 500 15 
         T 600 15 
         T 700 15 
         T 800 15 
         T 900 15 
         T 1000 15 
         T 1100 15 
         T 1200 15"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-border"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </motion.svg>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-35 space-y-10">
              {/* Recommended Topics */}
              <section>
                <h3 className="text-sm font-bold text-foreground mb-4">
                  Recommended topics
                </h3>
                <div className="flex flex-wrap gap-2">
                  {topics.map((topic) => (
                    <button
                      key={topic}
                      className="px-4 py-2 text-sm text-foreground bg-secondary rounded-full hover:bg-muted transition-colors"
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </section>

              {/* Footer Links */}
              <footer className="pt-6 border-t border-border">
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                  <button className="hover:text-foreground transition-colors">
                    About
                  </button>
                  <button className="hover:text-foreground transition-colors">
                    Blog
                  </button>
                  <button className="hover:text-foreground transition-colors">
                    Privacy
                  </button>
                  <button className="hover:text-foreground transition-colors">
                    Terms
                  </button>
                </div>
              </footer>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
