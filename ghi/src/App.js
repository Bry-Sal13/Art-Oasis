import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import SignUpForm from "./SignUp/SignUpForm";
import NameForm from "./SignUp/NameForm";
import CategoryForm from "./SignUp/CategoryForm";
import PictureForm from "./SignUp/PictureForm";
import LandingPage from "./Landing/LandingPage";
import UserProfile from "./Profile/UserProfile";
import LoginForm from "./Login/LoginForm";

import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState("");

  // const getToken = async () => {
  //   const tokenUrl = "http://localhost:8000/token";
  //   const response = await fetch(tokenUrl, {credentials: "include"});
  //   if (response.ok) {
  //     const data = await response.json();
  //     console.log(`token is ${data}`);
  //     setToken(data)
  //   }
  // };

  const getUsers = async () => {
    const usersUrl = "http://localhost:8000/api/users";
    const response = await fetch(usersUrl);
    if (response.ok) {
      const data = await response.json();
      setUsers(data);
    }
  };

  useEffect(() => {
    getUsers();
    // getToken();
  }, []);
  // TODO: Focus on users and how tokenUrl is used.

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/name" element={<NameForm />} />
          <Route path="/picture" element={<PictureForm />} />
          <Route path="/category" element={<CategoryForm />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </BrowserRouter>
  );
}
export default App;
