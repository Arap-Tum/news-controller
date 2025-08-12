import React, { useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom'
import { Hero } from '../component/Hero'
import { ListOfNews } from '../component/ListOfNews'

import { getMyArticles } from '../api/articles'

export const Home = ({ user }) => {

  const [articles, setArticles] = React.useState([]);

  const location = useLocation();
  const isNewUser = location.state?.isNewUser;

  useEffect(() => {
    const fetchMyArticles = async () => {
      try {
        const response = await getMyArticles();
        setArticles(response.data);
        console.log("✅ My articles fetched successfully");
      } catch (error) {
        console.error("Error fetching my articles:", error);
        console.error("❌ My articles Error:", error.message);
        console.log("🔍 URL:", error.config?.baseURL + error.config?.url);
      }
    };

    fetchMyArticles();

  }, []);



  return (
    <>
    <div className="author-home">
       <Hero 
       name={user?.name || "Author Name"} // Replace with dynamic name if available
       isNewUser={isNewUser}
       />
    
<section className='authored-news'>
  <h2>Your Articles</h2>   
  <p>Here you can find all the articles you have authored.</p>



  <ListOfNews articles={articles} />
</section>

    </div>
    </>

  )
}
