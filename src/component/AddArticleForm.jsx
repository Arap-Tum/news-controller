import React, { useState, useEffect } from 'react'

import { getCategories } from '../api/categories';

export const AddArticleForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
     title: "",
    content: "",
    image: null,
    categoryId: "",
    isTrending: false,
    isFeatured: false,
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getCategories();
      setCategories(response.data);
    };

    fetchCategories();
  }, []);

 const handleChange = (e) => {
  const { name, value, type, checked, files } = e.target;

  setFormData((prevData) => ({
    ...prevData,
  [name]: type === "checkbox" ? checked : type === "file" ? (files && files[0]) || null : value,
  }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("content", formData.content);
    if (formData.image) {
      data.append("image", formData.image);
    }
    data.append("categoryId", formData.categoryId);
    data.append("isTrending", formData.isTrending);
    data.append("isFeatured", formData.isFeatured);

      console.log("Form data submitted:", [...data.entries()]); // Debugging


    onSubmit(data);

    setFormData({
        title: "",
    content: "",
    image: null,
    categoryId: "",
    isTrending: false,
    isFeatured: false,
    })
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
      </div>
      <div className='form-group'>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Content"
          required
        />
      </div>
      <div className='form-group'>
        <label htmlFor="imageUrl">Upload Image </label>
        <input
          type='file'
          id="imageUrl"
          name="image"
          onChange={handleChange}
          placeholder="Image"
        />
      </div>
      <div className='form-group'>
        <label htmlFor="categoryId">Category</label>
        <select
          id="categoryId"
          name="categoryId"
            value={formData.categoryId}
          onChange={handleChange}
        >
  <option value="">Select a category</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className='form-group'>
        <label htmlFor="isTrending">
          <input
            type="checkbox"
            name="isTrending"
            checked={formData.isTrending}
          onChange={handleChange}
        />{" "}
        Trending
      </label>
      </div>
      <div className='form-group'>
      <label htmlFor="isFeatured">
        <input
          type="checkbox"
          name="isFeatured"
          checked={formData.isFeatured}
          onChange={handleChange}
        />{" "}
        Featured
      </label>
      </div>
      <button type="submit">Add Article</button>
    </form>
  )
}
