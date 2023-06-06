import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./MainPage.css";

function MainPage({ posts, userData, users, getUserData, connections, like }) {

  const handlePostLike = (post_id) => {
    setLiked(!liked);
    if (liked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
  };
  const likeButton = () => {
    const [liked, setLiked] = useState(null);
  }

   const [following, setFollowing] = useState(0)
   const [followers, setFollowers] = useState(0)
   const [postNum, setPostNum] = useState(0)
   const [likeCount, setLikeCount] = useState(0)
   const [liked, setLiked] = useState(0)

  if (userData === undefined) {
    getUserData();
  }
  const getUserStats = async() => {
    const followingNum = connections.filter((connection) => {
      return connection.user_id === userData.user.user_id
    })
    const followerNum = connections.filter((connection) => {
      return connection.following_id === userData.user.user_id
    })
    const postNum = posts.filter((post) => {
      return post.post_id === userData.user.user_id
    })
    setFollowing(followingNum.length)
    setFollowers(followerNum.length)
    setPostNum(postNum.length)
  }
  console.log(userData);
  console.log(users);
  useEffect(() => {
    getUserStats()
  },[connections, posts])
  return (
    <>
      <div className="container text-center">
        <div className="row g-3">
          <div id="liveAlertPlaceholder"></div>
          {/* Profile Card */}
          <div className="container d-flex justify-content-center align-items-center bg-light-purp">
            <div className="card card-profile">
              <div className="upper">
                <img src={userData.user.header_image} className="img-fluid" />
              </div>
              <div className="user text-center">
                <div className="profile">
                  <img
                    src={userData.user.image}
                    className="rounded-circle"
                    width="80"
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
          <div>
            {/* Feed */}
            <div className="main-feed">
              <div class="container mt-5 mb-5">
                <div class="row d-flex align-items-center justify-content-center">
                  <div class="col-md-6">
                    <div class="card">
                      <div class="d-flex justify-content-between p-2 px-3">
                        <div class="d-flex flex-row align-items-center"> <img src="{userData.user.image}" width="50" class="rounded-circle"></img>
                          <div class ="d-flex flex-column ml-2"> <span class="font-weight-bold">{userData.user.display_name}</span> </div>
                        </div>
                        <div class="d-flex flex-row mt-1 ellipsis"> <small class="mr-2">placeholder for time of post</small> <i class="fa fa-ellipsis-h"></i> </div>
                      </div> <img src="{userData.user.image}" class="img-fluid"></img>
                      <div class="p-2">
                        <p class="text-justify"> placeholder for now </p>
                        <div class="d-flex justify-content-between align-items-center">
                          <div class="d-flex flex-row icons d-flex align-items-center"> <i class="fa fa-heart"></i></div>
                          <div class="d-flex flex-row muted-color"> <span>placeholder for # of comments</span></div>
                        </div>
                        <div class="comments"></div>
                          <div class="d-flex flex-row mlb-2"> <img src="{userData.user.image}" width="40" class="rounded-image"></img>
                            <div class="d-flex flex-column ml-2"> <span class="name">"{userData.user.display_name}"</span><small class="comment-text">placeholder</small>
                              <div class="d-flex flex-row align-items-center status">
                                <button
                                  onClick={() => setLiked(!liked)}
                                  onAnimationEnd={() => setClicked(false)}
                                  className={cn("like-button-wrapper", {
                                    liked,
                                  })}
                                >
                                  <div className="like-button">
                                    <Hand />
                                    <span>Like</span>
                                    <span className={cn("suffix", { liked })}>d</span>
                                </div>
                              </button>
                              </div>
                            </div>
                          </div>
                          <div class="comment-input"> <input type="text" class="form-control"></input>
                            <div class="fonts"><button>Add a comment</button><i class="fa fa-camera"></i></div>
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default MainPage;
