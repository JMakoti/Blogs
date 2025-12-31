import bgCover from "../assets/img/bg-cover.png";
import ViewArticlePage from "./viewarticlepage";

export default function ViewArticle() {
  return (
    <div
      className="bg-fixed md:bg-contain bg-cover bg-center min-h-screen bg-no-repeat backdrop-grayscale"
      style={{ backgroundImage: `url(${bgCover})` }}
    >
      <div className="text-center items-center text-2xl font-bold p-0 md:p-10">
        <ViewArticlePage />
      </div>
    </div>
  );
}
