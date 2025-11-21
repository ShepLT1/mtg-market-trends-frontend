import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Dashboard from "./pages/Dashboard";
import ReportGenerator from "./pages/ReportGenerator";
import CardSearch from "./pages/CardSearch";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/report" element={<ReportGenerator />} />
        <Route path="/search" element={<CardSearch />} />
      </Routes>
    </div>
  );
}

export default App;
