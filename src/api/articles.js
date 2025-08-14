import axios from "./api";

export const getArticles = () => axios.get("/articles");
  export const getArticleById = (id) => axios.get(`/articles/${id}`); 

export const createArticle = (formData, token) => {
  return axios.post("/articles", formData, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "multipart/form-data"
    }
    
  });
};
 

export const updateArticle = (id, formData, token) =>
  axios.put(`/articles/${id}`, formData, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteArticle = (id, token) =>
  axios.delete(`/articles/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });


export const getMyArticles = () => {
  const token = localStorage.getItem("token");
  return axios.get("/articles/my-articles", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};