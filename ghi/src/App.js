import { useEffect, useState } from "react";
import React from 'react';
// import SignUpForm from './components/SignUpForm';
import Nav from './Nav';
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {

  const [users, setUsers] = useState([]);

  const GetUserData = async () => {
    const usersUrl = "http://localhost:8000/api/users";
    const response = await fetch(usersUrl);
    if (response.ok) {
      const data = await response.json();
      setUsers(data.manufacturers);
    }
  }

  useEffect(() => {
    GetUserData()
  },[])

  return (
    <BrowserRouter>
      <Nav users= {users} />
    </BrowserRouter>
  );
}

export default App;
