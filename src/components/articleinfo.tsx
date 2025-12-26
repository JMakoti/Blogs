import bgCover from "../assets/img/bg-cover.png";

export default function ArticleInfo() {
  return (
    <div
      className="bg-contain bg-center h-screen"
      style={{ backgroundImage: `url(${bgCover})` }}
    >
      <div className="text-center items-center text-2xl font-bold mt-20">
        <h1>Article Info</h1>
      </div>
    </div>
  );
}
