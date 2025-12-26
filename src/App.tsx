import { Route, Routes } from "react-router";
import Layout from "./components/layout";
import ViewArticle from "./components/viewarticle";
import CreateArticle from "./components/createarticle";
import ArticleInfo from "./components/articleinfo";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ViewArticle />} />
        <Route path="/write" element={<CreateArticle />} />
        <Route path="/:id" element={<ArticleInfo />} />
      </Route>
    </Routes>
  );
}

export default App;
