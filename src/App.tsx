import { Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import Layout from "./components/layout";
import ViewArticle from "./components/viewarticle";
import CreateArticle from "./components/createarticle";
import ArticleDetail from "./components/articleinfo";

function App() {
  return (
    <>
      <ToastContainer />

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ViewArticle />} />
          <Route path="/write" element={<CreateArticle  />} />
          <Route path="/:articleId" element={<ArticleDetail  />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
