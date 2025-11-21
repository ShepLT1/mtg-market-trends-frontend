import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-link">
        Dashboard
      </NavLink>
      <NavLink to="/report" className="nav-link">
        Report Generator
      </NavLink>
      <NavLink to="/search" className="nav-link">
        Card Search
      </NavLink>
    </nav>
  );
}
