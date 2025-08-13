import React from 'react'
import '../styles/loading.css'
export const Loading = () => {
  return (
      <div className="loading-wrapper">
      <div className="spinner"></div>
      <p className="loading-text">Loading, please wait...</p>
    </div>
  )
}
