import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./MainPage.css";

function MyProfileSidebar({connections,userInfo,posts}) {
    const [following, setFollowing] = useState(0);
    const [followers, setFollowers] = useState(0);
    const [postNum, setPostNum] = useState(0);
    const getUserStats = () => {
        const followingNum = connections.filter((connection) => {
            return connection.user_id === userInfo.user_id;
        });
        const followerNum = connections.filter((connection) => {
            return connection.following_id === userInfo.user_id;
        });
        const postNum = posts.filter((post) => {
            return post.post_id === userInfo.user_id;
        });
        setFollowing(followingNum.length);
        setFollowers(followerNum.length);
        setPostNum(postNum.length);
    };
    useEffect(() => {
      if (connections.length > 0) {
          getUserStats();
      }
    }, [connections, posts]);
  return (
    <div className="container d-flex justify-content-center align-items-center bg-light-purp">
            <div className="card card-profile">
              <div className="upper">
                <img src={userInfo.header_image} className="img-fluid" alt="header"/>
              </div>
              <div className="user text-center">
                <div className="profile">
                  <img
                    src={userInfo.image}
                    className="rounded-circle"
                    width="80"
                    alt="profile"
                  />
                </div>
              </div>
              <div className="mt-5 text-center">
                <h4 className="mb-0">{userInfo.display_name}</h4>
                <span className="text-muted d-block mb-2"></span>
                  <span className="text-muted d-block mb-2"> {userInfo.category} </span>
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

function MainPage({ posts, userInfo, users, connections, like }) {
    const [likeCount, setLikeCount] = useState(0);
    const [liked, setLiked] = useState(0);
    console.log(userInfo)
    const handlePostLike = (post_id) => {
        setLiked(!liked);
        if (liked) {
            setLikeCount(likeCount - 1);
        } else {
            setLikeCount(likeCount + 1);
        }
    };

    return (
        <div className="container">
          <MyProfileSidebar connections={connections} posts={posts} userInfo={userInfo} />
          <div className="row">
          {/* CREATE POST */}
          <div className="card post">
            <div className="card-header">
              Create a Post
            </div>
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col">
                  <img className="rounded-circle"
                        width="80"
                        alt="profile"
                        src={userInfo.profile_picture}/>
                </div>
                <div className="col-6">
                  <h5 className="card-title">Special title treatment</h5>
                  <button className="btn btn-primary" type="submit" value="Submit">Post</button>
                </div>
                <div className="row align-items-center">

                </div>
              </div>
            </div>
          </div>
          {/* FEED */}

          </div>
        </div>
    );
}
export default MainPage;
