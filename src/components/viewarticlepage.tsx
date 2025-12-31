import imgFrame from "@/assets/img/img-frame.png";
import { Bookmark, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { motion } from "framer-motion";

const articles = [
  {
    id: 1,
    title: "The Art of Mindful Living: A Journey to Inner Peace",
    excerpt:
      "Discover the transformative power of being present in every moment of your daily life. Learn practical techniques for cultivating awareness and finding calm in chaos.",
    author: "Elena Martinez",
    img: "https://images.pexels.com/photos/3576284/pexels-photo-3576284.jpeg",
    category: "Lifestyle",
    date: "Dec 28",
  },
  {
    id: 2,
    title: "Sustainable Architecture: Building Tomorrow's Cities Today",
    excerpt:
      "How modern architects are reimagining buildings with environmental consciousness and creating spaces that breathe with nature. The future of urban development.",
    author: "James Chen",

    img: "https://images.pexels.com/photos/3320529/pexels-photo-3320529.jpeg",
    category: "Design",
    date: "Dec 25",
  },
  {
    id: 3,
    title: "The Future of Digital Art: Where Technology Meets Creativity",
    excerpt:
      "Exploring the intersection of technology and creativity in the modern art world. From NFTs to immersive installations, discover what's next.",
    author: "Sofia Laurent",
    category: "Art",
    img: "https://images.pexels.com/photos/7650786/pexels-photo-7650786.jpeg",
    date: "Dec 22",
  },
  {
    id: 4,
    title: "AI in Everyday Life: Smarter Living Through Technology",
    excerpt:
      "A deep dive into how artificial intelligence is reshaping daily routines, from smart homes to personalized digital assistants.",
    author: "Daniel Kim",
    category: "Technology",
    img: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg",
    date: "Jan 05",
  },
  {
    id: 5,
    title: "Sustainable Fashion: Redefining Style with Purpose",
    excerpt:
      "How eco-friendly materials and ethical production are transforming the global fashion industry for the better.",
    author: "Amara Njeri",
    category: "Fashion",
    img: "https://images.pexels.com/photos/5709656/pexels-photo-5709656.jpeg",
    date: "Jan 10",
  },
  {
    id: 6,
    title: "The Rise of Remote Work: Opportunities and Challenges",
    excerpt:
      "Examining how remote work is changing company culture, productivity, and work-life balance worldwide.",
    author: "Michael Torres",
    category: "Business",
    img: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
    date: "Jan 14",
  },
  {
    id: 7,
    title: "Healthy Minds: The Importance of Mental Wellness Today",
    excerpt:
      "Understanding mental health awareness, modern coping strategies, and why open conversations matter more than ever.",
    author: "Grace Mwangi",
    category: "Health",
    img: "https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg",
    date: "Jan 18",
  },
  {
    id: 8,
    title: "Exploring the World: Travel Trends Shaping 2025",
    excerpt:
      "From eco-tourism to digital nomad destinations, discover the travel trends redefining global exploration.",
    author: "Lucas Bennett",
    category: "Travel",
    img: "https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg",
    date: "Jan 22",
  },
];

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
  const [savedArticles, setSavedArticles] = useState<number[]>([]);

  const toggleSave = (id: number) => {
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
                    <h2 className="text-xl font-bold text-foreground leading-tight mb-1 group-hover:underline decoration-1 underline-offset-2 font-serif">
                      {article.title}
                    </h2>

                    {/* Excerpt - hidden on mobile */}
                    <p className="hidden md:block text-base text-muted-foreground leading-relaxed mb-3 line-clamp-2">
                      {article.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{article.date}</span>
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
                      src={article.img}
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
