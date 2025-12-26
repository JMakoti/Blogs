import bgCover from "../assets/img/bg-cover.png";

export default function CreateArticle() {
  return (
    <div
      className="bg-contain bg-center h-screen bg-no-repeat"
      style={{ backgroundImage: `url(${bgCover})` }}
    >
      <div className="text-center items-center text-2xl font-bold pt-20">
        <h1>Write Articles</h1>
      </div>
    </div>
  );
}
