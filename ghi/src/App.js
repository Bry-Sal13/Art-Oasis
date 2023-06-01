import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import useToken from "@galvanize-inc/jwtdown-for-react";
import React from "react";
import SignUpForm from "./SignUp/SignUpForm";
import NameForm from "./SignUp/NameForm";
import CategoryForm from "./SignUp/CategoryForm";
import PictureForm from "./SignUp/PictureForm";
import LandingPage from "./Landing/LandingPage";
import UserProfile from "./Profile/UserProfile";
import LoginForm from "./Login/LoginForm";
import Nav from "./Nav";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState("");
  const [posts, setPosts] = useState([]);
  const [socials, setSocials] = useState([]);
  const [carousels, setCarousels] = useState([]);
  const { token, fetchWithCookie } = useToken();

  const getUserData = async () => {
    const tokenUrl = "http://localhost:8000/token";
    const response = await fetchWithCookie(tokenUrl);
    if (response != null) {
      setUserData(response);
    }
  };

  const getPosts = async () => {
    const postsUrl = "http://localhost:8010/api/posts";
    const response = await fetch(postsUrl, {credentials: "include"});
    if (response.ok) {
      const data = await response.json();
      setPosts(data);
    }
  }

  const getUsers = async () => {
    const usersUrl = "http://localhost:8000/api/users";
    const response = await fetch(usersUrl, {credentials: "include"});
    if (response.ok) {
      const data = await response.json();
      setUsers(data);
    }
  };

  const getSocials = async () => {
    const socialsUrl = "http://localhost:8000/api/socials";
    const response = await fetch(socialsUrl, { credentials: "include" });
    if (response.ok) {
      const data = await response.json();
      setSocials(data);
    }
  };


  const getCarousels = async () => {
    const carouselsUrl = "http://localhost:8000/api/carousels";
    const response = await fetch(carouselsUrl, { credentials: "include" });
    if (response.ok) {
      const data = await response.json();
      setCarousels(data);
    }
  };

  useEffect(() => {
    getUserData();
  }, [token]);

  // Get list of users only after you're logged in
  useEffect(() => {
    // If token is falsy, then don't call getUsers
    if (userData) {
      getUsers();
      getPosts();
      getCarousels();
      getSocials();
    }
  }, [userData]);


  return (
    <div>
    <BrowserRouter>
      <Nav users={users} getUserData={getUserData} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpForm  />} />
        <Route
          path="/login"
          element={<LoginForm  />}
        />
        <Route path="/name" element={<NameForm userData={userData} setUserData={setUserData} getUserData={getUserData} />} />
        <Route path="/picture" element={<PictureForm />} />
        <Route path="/category" element={<CategoryForm userData={userData}  setUserData={setUserData} />} />
        <Route
          path="/profile"
          element={
            <UserProfile
              posts={posts}
              userData={userData}
              socials={socials}
              carousels={carousels}
            />
          }
        />
      </Routes>
    </BrowserRouter>
    </div>
  );
}
export default App;
