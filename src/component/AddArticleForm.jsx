import React, { useState, useEffect } from "react";
import "../styles/form.css";
import { getCategories } from "../api/categories";

export const AddArticleForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: null,
    categoryId: "",
    isTrending: false,
    isFeatured: false,
  });
  const [preview, setPreview] = useState(null);

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

    // Only set preview for file input
    if (type === "file" && files && files.length > 0) {
      setPreview(URL.createObjectURL(files[0]));
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]:
        type === "checkbox"
          ? checked
          : type === "file"
          ? (files && files[0]) || null
          : value,
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
    });
  };
  return (
    <div className="article-form">
      {/* LEFT PANEL - Editor */}
      <div className="editor-panel">
        {/* Title */}
        <input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />

        {/* Mini Editor */}
        <div className="mini-editor">
          {/* Toolbar (bold, italic, etc.) */}
          <div className="editor-toolbar"></div>

          {/* Textarea */}
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Content"
            required
          />
        </div>

        {/* Submit Button */}
        <button onClick={handleSubmit}>Publish</button>
      </div>

      {/* RIGHT PANEL - Sidebar Options */}
      <div className="sidebar-panel">
        {/* Category */}
        <div className="sidebar-section">
          <label>Category</label>
          <select
            id="categoryId"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
          >
            <option value="">Select...</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="sidebar-section">
          <label htmlFor="imageUrl">Upload Image </label>
          <input
            type="file"
            id="imageUrl"
            name="image"
            onChange={handleChange}
          />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              style={{
                width: "80px",
                height: "80px",
                objectFit: "cover",
                borderRadius: "4px",
              }}
            />
          )}
        </div>

        {/* Trending */}
        <div className="sidebar-section">
          <label>
            <input
              type="checkbox"
              name="isTrending"
              checked={formData.isTrending}
              onChange={handleChange}
            />{" "}
            Trending
          </label>
        </div>

        {/* Featured */}
        <div className="sidebar-section">
          <label>
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
            />{" "}
            Featured
          </label>
        </div>
      </div>
    </div>
  );
};
