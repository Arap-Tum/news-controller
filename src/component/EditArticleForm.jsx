import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "../api/categories";

export const EditArticleForm = ({ article, onSubmit, id }) => {
  const [formData, setFormData] = useState({});
  const [preview, setPreview] = useState(null);

  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getCategories();
      setCategories(response.data);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (article) {
      setFormData({
        title: article.title || "",
        content: article.content || "",
        image: null,
        categoryId: article.categoryId || "",
        isTrending: article.isTrending || false,
        isFeatured: article.isFeatured || false,
      });
      // If there's an existing image, set it as the preview
      if (article.imageUrl) {
        setPreview(article.imageUrl);
      }
    }
  }, [article]);

 const handleChange = (e) => {
  const { name, value, type, checked, files } = e.target;
  
  if (type === "file" && files && files[0]) {
    setFormData((prevData) => ({
      ...prevData,
      [name]: files[0],
    }));
    setPreview(URL.createObjectURL(files[0])); // show new image preview
  } else {
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  }
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

     navigate(`/article/${id}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
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
      <div className="form-group">
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
     <div className="form-group">
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

      <div className="form-group">
        <label htmlFor="categoryId">Category</label>
        <select
          id="categoryId"
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
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
      <div className="form-group">
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
      <button type="submit">Edit Article</button>
    </form>
  );
};
