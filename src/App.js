import React from 'react';
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import {toast, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import './App.css';

//iMPORT FROM CONTEXT
import { useAuth } from './context/AuthContext';

import Login from './pages/Login';
import Register from './pages/Register';
import { Header } from './component/Header';
import { Home } from './pages/Home';
import { AddArticle } from './pages/AddArticle';
import { EditArticle } from './pages/EditArticle';
import { Article } from './pages/Article';

// Importing API functions
import { getArticleById, getArticles, updateArticle } from './api/articles'; // Adjust the import path as needed
import { getCategories } from './api/categories'; // Adjust the import path as needed
import { logInUser, registerUser } from './api/reg-logIn';


function App() {
    const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);

  //destructure
  const { login, register, token } = useAuth()

  // Navigation
  const navigate = useNavigate();

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

  //Register
  const handleRegister = async (form) => {
    try {
      setLoading(true);
      
    const response = await registerUser(form);
    const { user, token } = response.data;

    // Save user & token globally
    register(user, token);

    console.log("Registration successful:", user);

   toast.success(`Welcome back, ${user.name || "User"}!`);
    
    navigate('/author/home', { state: { isNewUser: true } });


  } catch (error) {
    console.error("Registration error:", error);
      console.error(
        "Registration failed:",
        error.response?.data?.message || error.message
      );

     const backendMessage =
  error.response?.data?.message || error.response?.data?.error;

const friendlyMessage =
  backendMessage === "Invalid credentials"
    ? "Your email or password is incorrect."
    : backendMessage || "Something went wrong. Please try again.";

toast.error(friendlyMessage);
    } finally {
      setLoading(false)
    }
  }


  //login 
const handleLogin = async(form) => {
  try {
    setLoading(true)
     const response = await logInUser(form);
      const { token, user } = response.data;
      // console.log(response.data);

     // Save user & token globally
      login(user, token);
      
      // console.log("Login successful:", user);

      // Show SUCCESS NOTIFICATION
      toast.success(`Welcome back, ${user.name || "User"}!`);

      navigate("/author/home");navigate('/author/home', { state: { isNewUser: false } });

  } catch (error) {
    console.error("Login error:", error);
     console.error(
        "Login failed:",
        error.response?.data?.message || error.message
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
}

//Update 
 const handleUpdate = async (id, formData) => {
    try {
      setLoading(true);

       if (!user || !user.id) {
              toast.error("User is not authenticated");
              return;
            }
            
      const formDataWithId = new FormData();


         // Copy over existing formData entries
    for (const [key, value] of formData.entries()) {
      formDataWithId.append(key, value);
    }
       // Add authorId
    formDataWithId.append("authorId", user.id);

    const res = await updateArticle(id, formDataWithId, token);

      console.log("✅ Updated:", res.data);
      toast.success("Article updated successfully!");
     
       // Refetch the updated article
    const updated = await getArticleById(id);
    setArticles((prev) =>
      prev.map((a) => (a.id === id ? updated.data : a))
    );

    } catch (error) {
      console.error("❌ Error updating article:", error);
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

//Get User From local Storage 
useEffect(() => {
  const savedUser = localStorage.getItem('user');

  if (savedUser) {
    setUser(JSON.parse(savedUser))
  } else {
    console.log('User not saved in the local storage')
  }
},[])

// Logout function
const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  setUser(null);
  navigate("/");
};



  return (
    <div className="App">

      <Header  />

      <ToastContainer  position="top-right" autoClose={3000} />

      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} loading={loading}/>} />

        <Route path='/register' element={<Register onRegister={handleRegister} loading={loading}/>} />

        <Route path="/author/home" element={<Home articles={articles} loading={loading} categories={categories} user={user} onLogout={handleLogout}/>}/>

        <Route path="/add-article" element={<AddArticle user={user} />} />

        <Route path="/edit-article/:id" element={<EditArticle articles={articles} user={user} handleUpdate={handleUpdate} loading={loading}/>} />

        <Route path="/article/:id" element={<Article articles={articles} loading={loading} setLoading={setLoading} />} />
      </Routes>
      
    </div>
  );
}

export default App;
