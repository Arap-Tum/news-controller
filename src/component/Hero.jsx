import React from 'react'
import { Link } from 'react-router-dom'
export const Hero = ({ name, isNewUser }) => {
  return (
    <>    
    <div className="hero-author">
      <h1>{isNewUser ? "Welcome to the News App," : "Welcome back,"} <span>{name}</span> </h1>
      <p>Manage your News content effectively.</p>
      <Link to='/add-article'>Write a New Article</Link>
    </div>
    </>
  )
}
