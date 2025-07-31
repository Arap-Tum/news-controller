import React from 'react';
import './App.css';
import { Header } from './component/Header';
import { Home } from './pages/Home';
import { AddArticle } from './pages/AddArticle';
import { EditArticle } from './pages/EditArticle';
import { Article } from './pages/Article';

import { Routes, Route } from 'react-router-dom';
// Importing API functions
import { getArticles } from './api/articles'; // Adjust the import path as needed
import { getCategories } from './api/categories'; // Adjust the import path as needed


import { useState, useEffect } from 'react';
function App() {
    const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const fetchAndSet = async (apFn, setter, label) => {
    try {
      setLoading(true);
      const response = await apFn();
      console.log(`✅ ${label} fetched`);
      setter(response.data);
    } catch (error) {
      console.error(`Error fetching ${label}:`, error);
      console.error(`❌ ${label} Error:`, error.message);
      console.log("🔍 URL:", error.config?.baseURL + error.config?.url);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAndSet(getArticles, setArticles, 'articles');
    fetchAndSet(getCategories, setCategories, 'categories');
  }, []);
  return (
    <div className="App">

      <Header />

      <Routes>
        <Route path="/" element={<Home articles={articles} loading={loading} categories={categories} />} />
        <Route path="/add-article" element={<AddArticle />} />
        <Route path="/edit-article/:id" element={<EditArticle />} />
        <Route path="/article/:id" element={<Article />} />
      </Routes>
      
    </div>
  );
}

export default App;
