import React from 'react'
import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

function Header() {
  return (
    <header id="header" className="fixed-top d-flex align-items-center">
        <div className="container d-flex justify-content-between">

        <div id="logo">
            <h1><Link to="/">Frog<span>ressive</span></Link></h1>
        </div>

        <nav id="navbar" className="navbar">
            <ul>
            <li><NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Home</NavLink></li>
            <li><NavLink to="/form" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>File Claim</NavLink></li>
            <li><NavLink to="/admin" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Admin</NavLink></li>
            </ul>
            <i className="bi bi-list mobile-nav-toggle"></i>
        </nav>

        </div>
  </header>
  )
}

export default Header