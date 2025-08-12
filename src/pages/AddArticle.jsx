import React from 'react'
import { useNavigate } from 'react-router-dom';


import { AddArticleForm } from '../component/AddArticleForm';
import { createArticle } from '../api/articles';




export const AddArticle = ({user}) => {
  const navigate = useNavigate();

const handleCreateArticle = async (formData) => {
  try{
    if (!user || !user.id) {
      console.error("User is not authenticated");
      return;
    }

    // Add author Id
    formData.append('authorId', user.id);

    const response = await createArticle(formData);
    console.log("Article created successfully:", response.data);

    navigate('/author/home'); // Redirect to home or another page after creation
  } catch (error) {
    console.error("Error creating article:", error);
    console.error("Error details:", error.response ? error.response.data : error.message);
  }
}
  return (
    <div>
      <h2>Add Article</h2>
      <AddArticleForm onSubmit={handleCreateArticle} />
    </div>
  )
}
