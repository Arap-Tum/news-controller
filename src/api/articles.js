import axios from "./api";

export const getArticles = () => axios.get("/articles");
export const createArticle = (articleData) => axios.post("/articles", articleData);
export const updateArticle = (id, articleData) => axios.put(`/articles/${id}`, articleData);
export const deleteArticle = (id) => axios.delete(`/articles/${id}`);
export const getArticleById = (id) => axios.get(`/articles/${id}`); 