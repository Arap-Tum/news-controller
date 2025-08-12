import React from 'react'

export const Header = ({ onLogout }) => {
  return (
    <div>
      <h1>News App</h1>
      {onLogout && <button onClick={onLogout}>Logout</button>}
    </div>
  )
}
