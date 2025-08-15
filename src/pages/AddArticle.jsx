import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useAuth } from "../context/AuthContext";

import { AddArticleForm } from "../component/AddArticleForm";
import { createArticle } from "../api/articles";
import { Loading } from "../component/Loading";

export const AddArticle = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {token , user} = useAuth();

  const handleCreateArticle = async (formData) => {
    try {
      setLoading(true);
      if (!user || !user.id) {
        toast.error("User is not authenticated");
        return;
      }

      // Add author Id
      formData.append("authorId", user.id);

      const response = await createArticle(formData, token);
      console.log("Article created successfully:", response.data);

      toast.success("Article created successfully!");

      navigate("/author/home"); // Redirect to home or another page after creation
    } catch (error) {
      console.error("Error creating article:", error);
      console.error(
        "Error details:",
        error.response ? error.response.data : error.message
      );
      const backendMessage =
        error.response?.data?.message || error.response?.data?.error;

      const friendlyMessage =
        backendMessage === "Invalid credentials"
          ? "Your email or password is incorrect."
          : backendMessage || "Something went wrong. Please try again.";

      toast.error(friendlyMessage);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      {loading && <Loading />}
      <h2>Add Article</h2>
      <AddArticleForm onSubmit={handleCreateArticle} />
    </div>
  );
};
