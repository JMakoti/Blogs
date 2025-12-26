import bgCover from "../assets/img/bg-cover.png";

export default function ViewArticle() {
  return (
    <div
      className="bg-contain bg-center h-screen bg-no-repeat backdrop-grayscale"
      style={{ backgroundImage: `url(${bgCover})` }}
    >
      <div className="text-center items-center text-2xl font-bold pt-20">
        <h1>View Articles</h1>
      </div>
    </div>
  );
}
