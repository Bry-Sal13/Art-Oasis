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
import MainPage from "./MainPage/MainPage";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState("");
  const { token, fetchWithCookie } = useToken();
  const [posts, setPosts] = useState([]);
  const [connections, setConnections] = useState([]);

  const getUserData = async () => {
    const tokenUrl = "http://localhost:8000/token";
    const response = await fetchWithCookie(tokenUrl);
    if (response != null) {
      setUserData(response);
    }
  };

  const getAllConnections = async () => {
    const connectionsURL = "http://localhost:8000/api/connections";
    const response = await fetch(connectionsURL, { credentials: "include" });
    if (response.ok) {
      const data = await response.json();
      setConnections(data);
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

  async function getPosts() {
    const url = "http://localhost:8010/api/posts/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setPosts(data.posts);
    }
  }

  useEffect(() => {
    getPosts();
  });

  // Grab the token when the component first renders
  useEffect(() => {
    getUserData();
  }, [token]);

  // Get list of users only after you're logged in
  useEffect(() => {
    // If token is falsy, then don't call getUsers
    if (userData) {
      getUsers();
    }
  }, [userData]);

  return (
    <div>
      <BrowserRouter>
        <Nav users={users} token={token} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/home"
            element={
              <MainPage
                element={
                  <MainPage posts={posts} userData={userData} users={users} />
                }
              />
            }
          />
          <Route
            path="/signup"
            element={<SignUpForm getUserData={getUserData} />}
          />
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/name"
            element={
              <NameForm
                userData={userData}
                setUserData={setUserData}
                getUserData={getUserData}
              />
            }
          />
          <Route path="/picture" element={<PictureForm />} />
          <Route
            path="/category"
            element={
              <CategoryForm
                userData={userData}
                getUserData={getUserData}
                setUserData={setUserData}
              />
            }
          />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
