import React, { Component } from "react";
import UserList from "./Components/UserList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Header from "./Components/UI/Header";
import Footer from "./Components/UI/footer";

const App = () => {
  return (
    <div>
      <Header />
    <Router>
      <Routes>
        <Route path="/" element={<UserList/>} />
      </Routes>
    </Router>
    <Footer />
    </div>
  );
};

export default App;
