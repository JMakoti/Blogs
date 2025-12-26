import bgCover from "../assets/img/bg-cover.png";

export default function ArticleInfo() {
  return (
    <div
      className="bg-contain bg-center h-screen bg-no-repeat"
      style={{ backgroundImage: `url(${bgCover})` }}
    >
      <div className="text-center items-center text-2xl font-bold pt-20">
        <h1>Article Info</h1>
      </div>
    </div>
  );
}
