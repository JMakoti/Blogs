import { useParams, Link } from "react-router";
import bgCover from "../assets/img/bg-cover.png";
import { Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import EditorJsRenderer from "@/components/EditorJsrenderer";
// Editor.js format content
const articlesData = [
  {
    id: "1",
    title: "The Art of Mindful Living",
    subtitle:
      "Discover the transformative power of being present in every moment of your daily life",
    author: "Elena Martinez",
    authorBio: "Wellness writer and meditation practitioner",
    readTime: "5 min read",
    category: "Lifestyle",
    image: "https://images.pexels.com/photos/3576284/pexels-photo-3576284.jpeg",
    date: "Dec 28, 2024",
    content: {
      time: 1703779200000,
      blocks: [
        {
          id: "1",
          type: "paragraph",
          data: {
            text: "In our fast-paced world, the concept of mindful living has become more relevant than ever. It's not just about meditation or yoga—it's about bringing awareness to every aspect of our daily lives.",
          },
        },
        {
          id: "2",
          type: "header",
          data: {
            text: "What is Mindful Living?",
            level: 2,
          },
        },
        {
          id: "3",
          type: "paragraph",
          data: {
            text: "Mindful living is the practice of being fully present and engaged in the current moment. It means paying attention to your thoughts, feelings, bodily sensations, and surrounding environment with openness and curiosity.",
          },
        },
        {
          id: "4",
          type: "quote",
          data: {
            text: "The present moment is filled with joy and happiness. If you are attentive, you will see it.",
            caption: "Thich Nhat Hanh",
          },
        },
        {
          id: "5",
          type: "header",
          data: {
            text: "Starting Your Journey",
            level: 2,
          },
        },
        {
          id: "6",
          type: "paragraph",
          data: {
            text: "Beginning a mindful living practice doesn't require dramatic changes. Start with small, intentional moments throughout your day. When you wake up, take three deep breaths before reaching for your phone.",
          },
        },
        {
          id: "7",
          type: "paragraph",
          data: {
            text: "The key is consistency, not perfection. Each moment of awareness builds upon the last, creating a foundation for a more peaceful and intentional life.",
          },
        },
        {
          id: "8",
          type: "header",
          data: {
            text: "Practical Techniques",
            level: 2,
          },
        },
        {
          id: "9",
          type: "list",
          data: {
            style: "unordered",
            items: [
              "<b>Morning intention:</b> Set a positive intention for your day before getting out of bed",
              "<b>Mindful walking:</b> Pay attention to each step, the feeling of your feet on the ground",
              "<b>Breathing breaks:</b> Take three conscious breaths whenever you feel stressed",
              "<b>Gratitude practice:</b> End each day by noting three things you're grateful for",
            ],
          },
        },
        {
          id: "10",
          type: "paragraph",
          data: {
            text: "Remember, mindful living is not about achieving a perfect state of calm. It's about developing a new relationship with your experiences—one characterized by awareness, acceptance, and compassion.",
          },
        },
      ],
      version: "2.28.2",
    },
  },
  {
    id: "2",
    title: "Sustainable Architecture",
    subtitle:
      "How modern architects are reimagining buildings with environmental consciousness",
    author: "James Chen",
    authorBio: "Architectural critic and sustainability advocate",
    readTime: "8 min read",
    category: "Design",
    image: "https://images.pexels.com/photos/3320529/pexels-photo-3320529.jpeg",
    date: "Dec 25, 2024",
    content: {
      time: 1703520000000,
      blocks: [
        {
          id: "1",
          type: "paragraph",
          data: {
            text: "The built environment accounts for nearly 40% of global carbon emissions. As we face the climate crisis, architects and designers are pioneering new approaches that harmonize human habitation with ecological sustainability.",
          },
        },
        {
          id: "2",
          type: "header",
          data: {
            text: "Beyond Green Buildings",
            level: 2,
          },
        },
        {
          id: "3",
          type: "paragraph",
          data: {
            text: "Sustainable architecture has evolved far beyond simple energy efficiency measures. Today's leading practitioners are creating buildings that actively contribute to their ecosystems—structures that clean the air, generate more energy than they consume, and provide habitats for local wildlife.",
          },
        },
        {
          id: "4",
          type: "quote",
          data: {
            text: "We do not inherit the Earth from our ancestors; we borrow it from our children.",
            caption: "Native American Proverb",
          },
        },
        {
          id: "5",
          type: "header",
          data: {
            text: "Biophilic Design",
            level: 2,
          },
        },
        {
          id: "6",
          type: "paragraph",
          data: {
            text: "One of the most significant trends in sustainable architecture is biophilic design—the practice of incorporating natural elements into built spaces. This includes living walls, natural lighting, organic materials, and designs that mimic patterns found in nature.",
          },
        },
        {
          id: "7",
          type: "header",
          data: {
            text: "Materials Revolution",
            level: 2,
          },
        },
        {
          id: "8",
          type: "list",
          data: {
            style: "unordered",
            items: [
              "<b>Mass timber:</b> Engineered wood products that can replace steel and concrete",
              "<b>Recycled materials:</b> Buildings constructed from reclaimed and recycled components",
              "<b>Bio-based materials:</b> Innovations like mycelium insulation and hempcrete",
              "<b>Smart glass:</b> Windows that adapt to light conditions to optimize energy use",
            ],
          },
        },
        {
          id: "9",
          type: "paragraph",
          data: {
            text: "The future of architecture is not just about minimizing harm—it's about creating buildings that heal and regenerate the natural world around them.",
          },
        },
      ],
      version: "2.28.2",
    },
  },
  {
    id: "3",
    title: "The Future of Digital Art",
    subtitle:
      "Exploring the intersection of technology and creativity in the modern art world",
    author: "Sofia Laurent",
    authorBio: "Digital art curator and tech culture writer",
    readTime: "6 min read",
    category: "Art",
    image: "https://images.pexels.com/photos/7650786/pexels-photo-7650786.jpeg",
    date: "Dec 22, 2024",
    content: {
      time: 1703260800000,
      blocks: [
        {
          id: "1",
          type: "paragraph",
          data: {
            text: "Digital art has transcended its origins as a niche medium to become one of the most dynamic and controversial forces in the contemporary art world. From generative algorithms to immersive virtual reality experiences, technology is reshaping how we create, experience, and value art.",
          },
        },
        {
          id: "2",
          type: "header",
          data: {
            text: "The NFT Revolution",
            level: 2,
          },
        },
        {
          id: "3",
          type: "paragraph",
          data: {
            text: "Non-fungible tokens have fundamentally altered the economics of digital art. For the first time, digital artists can create verifiable scarcity and provenance for their work, opening new markets and challenging traditional gallery systems.",
          },
        },
        {
          id: "4",
          type: "quote",
          data: {
            text: "Art is not what you see, but what you make others see.",
            caption: "Edgar Degas",
          },
        },
        {
          id: "5",
          type: "header",
          data: {
            text: "AI as Creative Partner",
            level: 2,
          },
        },
        {
          id: "6",
          type: "paragraph",
          data: {
            text: "Artificial intelligence is no longer just a tool—it's becoming a creative collaborator. Artists are using machine learning to generate novel visual styles, create interactive installations, and explore possibilities beyond human imagination alone.",
          },
        },
        {
          id: "7",
          type: "header",
          data: {
            text: "Immersive Experiences",
            level: 2,
          },
        },
        {
          id: "8",
          type: "list",
          data: {
            style: "unordered",
            items: [
              "<b>VR galleries:</b> Virtual reality spaces where physical laws don't apply",
              "<b>AR installations:</b> Augmented reality art that exists in our world",
              "<b>Interactive pieces:</b> Works that respond to and evolve with their audience",
              "<b>Generative art:</b> Pieces that create themselves through coded algorithms",
            ],
          },
        },
        {
          id: "9",
          type: "paragraph",
          data: {
            text: "As technology continues to evolve, so too will our definitions of art. The future promises even more radical experiments at the intersection of creativity and computation.",
          },
        },
      ],
      version: "2.28.2",
    },
  },
];

export default function ArticleDetail() {
  const { articleId } = useParams<{ articleId: string }>();
  const article = articlesData.find((a) => a.id === articleId);
  console.log(article);
  if (!article) {
    return (
      <div className="min-h-screen bg-fixed md:bg-contain bg-cover bg-contain bg-no-repeat bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${bgCover})` }}>
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
            {article.subtitle}
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
              <span>{article.date}</span>
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
            src={article.image}
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
