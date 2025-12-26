import bgCover from "../assets/img/bg-cover.png";

export default function CreateArticle() {
  return (
    <div
      className="bg-contain bg-center h-screen"
      style={{ backgroundImage: `url(${bgCover})` }}
    >
      <div className="text-center items-center text-2xl font-bold mt-20">
        <h1>Write Articles</h1>
      </div>
    </div>
  );
}
