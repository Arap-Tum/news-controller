import { useParams } from "react-router-dom";
import { EditArticleForm } from "../component/EditArticleForm";
import { Loading } from "../component/Loading";

export const EditArticle = ({ articles, handleUpdate, loading }) => {
  const { id } = useParams();
  const article = articles.find((art) => art.id === id);

  const onSubmit = (formData) => {
    handleUpdate(id, formData); // ✅ Pass the id to handleUpdate
  };

  return (
    <>
      {loading && <Loading />}

      {article ? (
        <EditArticleForm article={article} id={id} onSubmit={onSubmit} />
      ) : (
        <h3>Article not found.</h3>
      )}
    </>
  );
};
