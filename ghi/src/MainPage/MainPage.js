import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./MainPage.css";

function MyProfileSidebar({connections,userData,posts}) {
    const [following, setFollowing] = useState(0);
    const [followers, setFollowers] = useState(0);
    const [postNum, setPostNum] = useState(0);
    const getUserStats = async () => {
        const followingNum = connections.filter((connection) => {
            return connection.user_id === userData.user.user_id;
        });
        const followerNum = connections.filter((connection) => {
            return connection.following_id === userData.user.user_id;
        });
        const postNum = posts.filter((post) => {
            return post.post_id === userData.user.user_id;
        });
        setFollowing(followingNum.length);
        setFollowers(followerNum.length);
        setPostNum(postNum.length);
    };
    useEffect(() => {
      if (connections) {
          getUserStats();
      }
    }, [connections, posts]);
  return (
    <div className="container d-flex justify-content-center align-items-center bg-light-purp">
            <div className="card card-profile">
              <div className="upper">
                <img src={userData.user.header_image} className="img-fluid" alt="header"/>
              </div>
              <div className="user text-center">
                <div className="profile">
                  <img
                    src={userData.user.image}
                    className="rounded-circle"
                    width="80"
                    alt="profile"
                  />
                </div>
              </div>
              <div className="mt-5 text-center">
                <h4 className="mb-0">{userData.user.display_name}</h4>
                <span className="text-muted d-block mb-2"></span>
                  <span className="text-muted d-block mb-2"> {userData.user.category} </span>
                <div className="d-flex justify-content-between align-items-center mt-4 px-4">
                  <div className="stats">
                    <h6 className="mb-0">Following</h6>
                    <span>{following}</span>
                  </div>
                  <div className="stats">
                    <h6 className="mb-0">Followers</h6>
                    <span>{followers}</span>
                  </div>
                  <div className="stats">
                    <h6 className="mb-0">Posts</h6>
                    <span>{postNum}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
  );
}

function MainPage({ posts, userData, users, getUserData, connections, like }) {
    const [likeCount, setLikeCount] = useState(0);
    const [liked, setLiked] = useState(0);

    const handlePostLike = (post_id) => {
        setLiked(!liked);
        if (liked) {
            setLikeCount(likeCount - 1);
        } else {
            setLikeCount(likeCount + 1);
        }
    };
    console.log(userData)
    useEffect(() => {
      if (userData === null) {
        getUserData();
    }
    },[userData])

    return (
        <div className="container text-center">
        <div className="row g-3">
          {/* Profile Card */}
          <MyProfileSidebar connections={connections} posts={posts} userData={userData} />
            {/* Feed */}

          </div>
        </div>
    );
}
export default MainPage;
