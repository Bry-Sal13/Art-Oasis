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
import AboutForm from "./Profile/AboutForm";
import CarouselForm from "./Profile/CarouselForm";
import SocialsForm from "./Profile/SocialsForm";
import EditForm from "./Profile/EditProfile";
import LoginForm from "./Login/LoginForm";
import CookiePolicy from "./Agreement/CookiePolicy";
import Nav from "./Nav";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState("");
  const [posts, setPosts] = useState([]);
  const [socials, setSocials] = useState([]);
  const [carousels, setCarousels] = useState([]);
  const [userInfo, setUserInfo] = useState(userData.user);
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
    const response = await fetch(postsUrl, { credentials: "include" });
    if (response.ok) {
      const data = await response.json();
      setPosts(data);
    }
  };

  const getUsers = async () => {
    const usersUrl = "http://localhost:8000/api/users";
    const response = await fetch(usersUrl, { credentials: "include" });
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

  const getUserInfo = async () => {
    const username = userData.user.username;
    const url = `http://localhost:8000/api/users/${username}`;
    const response = await fetch(url, { credentials: "include" });
    if (response.ok) {
      const data = await response.json();
      setUserInfo(data);
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
      getUserInfo();
    }
  }, [userData]);

  return (
    <div>
      <BrowserRouter>
        <Nav users={users} token={token} setUserInfo={setUserInfo} />
        <div className="routes">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route
              path="/name"
              element={
                <NameForm
                  userInfo={userInfo}
                  setUserInfo={setUserInfo}
                  getUserInfo={getUserInfo}
                />
              }
            />
            <Route
              path="/picture"
              element={
                <PictureForm userInfo={userInfo} setUserInfo={setUserInfo} />
              }
            />
            <Route
              path="/category"
              element={
                <CategoryForm
                  userInfo={userInfo}
                  getUserInfo={getUserInfo}
                  setUserInfo={setUserInfo}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <UserProfile
                  posts={posts}
                  userInfo={userInfo}
                  socials={socials}
                  carousels={carousels}
                  getUserInfo={getUserInfo}
                />
              }
            />
            <Route
              path="/profile/edit"
              element={
                <EditForm
                  posts={posts}
                  userInfo={userInfo}
                  socials={socials}
                  carousels={carousels}
                  setCarousels={setCarousels}
                  setSocials={setSocials}
                  setUserInfo={setUserInfo}
                />
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
