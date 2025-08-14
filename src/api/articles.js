import axios from "./api";

export const getArticles = () => axios.get("/articles");
export const createArticle = (articleData) => axios.post("/articles", articleData);


export const updateArticle = (id, formData, token) =>
  axios.put(`/articles/${id}`, formData, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  
export const deleteArticle = (id) => axios.delete(`/articles/${id}`);
export const getArticleById = (id) => axios.get(`/articles/${id}`); 


export const getMyArticles = () => {
  const token = localStorage.getItem("token");
  return axios.get("/articles/my-articles", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};