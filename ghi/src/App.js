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
import MainPage from "./MainPage/MainPage";
import EditForm from "./Profile/EditProfile";
import LoginForm from "./Login/LoginForm";
import OthersProfile from "./Profile/OthersProfile";
import CookiePolicy from "./Agreement/CookiePolicy";
import Nav from "./Nav/Nav";

function App() {
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState("");
  const [posts, setPosts] = useState([]);
  const [socials, setSocials] = useState([]);
  const [carousels, setCarousels] = useState([]);
  const [userInfo, setUserInfo] = useState(userData.user);
  const { token, fetchWithCookie } = useToken();
  const [connections, setConnections] = useState([]);
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState("");
  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");
  const [likes, setLikes] = useState([]);

  const getLikes = async () => {
    const url = `${process.env.REACT_APP_USERS_SERVICE_API_HOST}/api/likes`;
    const response = await fetch(url, { credentials: "include" });
    if (response.ok) {
      const data = await response.json();
      setLikes(data);
    }
  };

  const getUserData = async () => {
    const tokenUrl = `${process.env.REACT_APP_USERS_SERVICE_API_HOST}/token`;
    const response = await fetchWithCookie(tokenUrl);
    if (response != null) {
      setUserData(response);
    }
  };

  const getPosts = async () => {
    const postsUrl = `${process.env.REACT_APP_USERS_SERVICE_API_HOST}/api/posts`;
    const response = await fetch(postsUrl, { credentials: "include" });
    if (response.ok) {
      const data = await response.json();
      setPosts(data);
    }
  };

  const getUsers = async () => {
    const usersUrl = `${process.env.REACT_APP_USERS_SERVICE_API_HOST}/api/users`;
    const response = await fetch(usersUrl, { credentials: "include" });
    if (response.ok) {
      const data = await response.json();
      setUsers(data);
    }
  };

  const getSocials = async () => {
    const socialsUrl = `${process.env.REACT_APP_USERS_SERVICE_API_HOST}/api/socials`;
    const response = await fetch(socialsUrl, { credentials: "include" });
    if (response.ok) {
      const data = await response.json();
      setSocials(data);
    }
  };

  const getCarousels = async () => {
    const carouselsUrl = `${process.env.REACT_APP_USERS_SERVICE_API_HOST}/api/carousels`;
    const response = await fetch(carouselsUrl, { credentials: "include" });
    if (response.ok) {
      const data = await response.json();
      setCarousels(data);
    }
  };

  const getUserInfo = async () => {
    const username = userData.user.username;
    const url = `${process.env.REACT_APP_USERS_SERVICE_API_HOST}/api/users/${username}`;
    const response = await fetch(url, { credentials: "include" });
    if (response.ok) {
      const data = await response.json();
      setUserInfo(data);
    }
  };

  const getUser = async (username) => {
    if (username) {
      const url = `${process.env.REACT_APP_USERS_SERVICE_API_HOST}/api/users/${username}`;
      const response = await fetch(url, { credentials: "include" });
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      }
    }
  };

  const getComments = async () => {
    const CommentsUrl = `${process.env.REACT_APP_USERS_SERVICE_API_HOST}/api/comments`;
    const response = await fetch(CommentsUrl, { credentials: "include" });
    if (response.ok) {
      const data = await response.json();
      setComments(data);
    }
  };

  const getAllConnections = async () => {
    const connectionsURL = `${process.env.REACT_APP_USERS_SERVICE_API_HOST}/api/connections`;
    const response = await fetch(connectionsURL, {
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      setConnections(data);
    }
  };

  useEffect(() => {
    getUserData();
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (userData && token) {
      getPosts();
    }
  }, [userData, token]);
  // Get list of users only after you're logged in
  useEffect(() => {
    // If token is falsy, then don't call getUsers
    if (userData && token) {
      getUsers();
      getComments();
      getCarousels();
      getSocials();
      getUserInfo();
      getAllConnections();
      getUser();
      getLikes();
    }
  }, [userData]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <BrowserRouter basename={basename}>
        <Nav
          users={users}
          searchUser={user}
          setUserInfo={setUserInfo}
          getUser={getUser}
          token={token}
          setUser={setUser}
        />
        <div className="routes">
          <Routes>
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/home"
              element={
                <MainPage
                  getUser={getUser}
                  setUser={setUser}
                  getLikes={getLikes}
                  likes={likes}
                  getComments={getComments}
                  getPosts={getPosts}
                  posts={posts}
                  userInfo={userInfo}
                  getUserInfo={getUserInfo}
                  users={users}
                  connections={connections}
                  userData={userData}
                  comments={comments}
                />
              }
            />
            <Route path="/signup" element={<SignUpForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/cookie" element={<CookiePolicy />} />
            <Route
              path="/name"
              element={
                <NameForm userInfo={userInfo} setUserInfo={setUserInfo} />
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
                <CategoryForm userInfo={userInfo} setUserInfo={setUserInfo} />
              }
            />
            <Route path="profiles">
              <Route
                path="me"
                element={
                  <UserProfile
                    posts={posts}
                    userInfo={userInfo}
                    socials={socials}
                    carousels={carousels}
                    getCarousels={getCarousels}
                    getPosts={getPosts}
                    getSocials={getSocials}
                    getAllConnections={getAllConnections}
                    connections={connections}
                  />
                }
              />
              <Route
                path=":username"
                element={
                  <OthersProfile
                    posts={posts}
                    user={user}
                    socials={socials}
                    userInfo={userInfo}
                    carousels={carousels}
                    getSocials={getSocials}
                    getUser={getUser}
                    getAllConnections={getAllConnections}
                    connections={connections}
                  />
                }
              />
            </Route>
            <Route
              path="/profile/edit"
              element={
                <EditForm
                  token={userData.access_token}
                  posts={posts}
                  userInfo={userInfo}
                  socials={socials}
                  carousels={carousels}
                  setCarousels={setCarousels}
                  setSocials={setSocials}
                  setUserInfo={setUserInfo}
                  getSocials={getSocials}
                  getCarousels={getCarousels}
                  getUsers={getUsers}
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
