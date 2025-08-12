import React from 'react'
import { useNavigate } from 'react-router-dom';


import { AddArticleForm } from '../component/AddArticleForm';
import { createArticle } from '../api/articles';




export const AddArticle = ({user}) => {
  const navigate = useNavigate();

const handleCreateArticle = async (formData) => {
  try{
    const response = await createArticle({ ...formData, authorId: user.id });
    console.log("Article created successfully:", response.data);
    // Optionally, redirect or update state to reflect the new article
    navigate('/author/home'); // Redirect to home or another page after creation
  } catch (error) {
    console.error("Error creating article:", error);
  }
}
  return (
    <div>
      <h2>Add Article</h2>
      <AddArticleForm onSubmit={handleCreateArticle} />
    </div>
  )
}
