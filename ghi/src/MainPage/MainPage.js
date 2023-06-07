import React, { useEffect, useState } from "react";
import "./MainPage.css";

function MyProfileSidebar({ connections, userInfo, posts }) {
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
                    <div
                        className="card-header"
                        style={{
                            backgroundImage: `url(${userInfo.header_image})`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "center center",
                            backgroundSize: "319px",
                            width: "319px",
                            height: "100px",
                            borderRadius: "10px",
                        }}></div>
                </div>
                <div className="user text-center">
                    <div className="profile">
                        <img
                            src={userInfo.profile_picture}
                            className="rounded-circle"
                            width="80"
                            alt="profile"
                        />
                    </div>
                </div>
                <div className="mt-5 text-center">
                    <h4 className="mb-0">{userInfo.display_name}</h4>
                    <span className="text-muted d-block mb-2"></span>
                    <span className="text-muted d-block mb-2">
                        {userInfo.category}
                    </span>
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

function CreatePost({ userInfo }) {
    const [text, setText] = useState("");
    const [image, setImage] = useState("");

    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    const handlePicUrlChange = (event) => {
        setImage(event.target.value);
    };

    const handlePostSubmit = async (event) => {
        event.preventDefault();
        const user_id = userInfo.user_id;
        const url = "http://localhost:8010/api/posts/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify({ user_id, text, image }),
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            const response = await fetch(url, fetchConfig);
            if (response.ok) {
                setImage("");
                setText("");
            }
        } catch (error) {
            console.log("error updating user: ", error);
        }
    };
    return (
        <div className="card post">
            <div className="card-header">Create a Post</div>
            <div className="card-body">
                <div className="row align-items-center">
                    <div className="col-3 text-center">
                        <img
                            className="rounded-circle"
                            width="125"
                            alt="profile"
                            src={userInfo.profile_picture}
                        />
                    </div>
                    <div className="col">
                        <form onSubmit={handlePostSubmit}>
                            <label htmlFor="picUrl">Picture Url:</label>
                            <br />
                            <input
                                onChange={handlePicUrlChange}
                                className="margins pic-border"
                                id="picUrl"
                                name="picUrl"
                                type="text"
                                value={image}
                                required
                            />
                            <br />
                            <label htmlFor="postText">Caption:</label>
                            <br />
                            <textarea
                                onChange={handleTextChange}
                                className="margins text-border"
                                id="postText"
                                name="postText"
                                value={text}
                                rows="2"
                                required
                            />
                            <br />
                            <button
                                className="btn btn-primary bg-pastel-purp button-width"
                                type="submit">
                                Post
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

function MainPage({ posts, userInfo, users, connections }) {
    const [likeCount, setLikeCount] = useState(0);
    const [liked, setLiked] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const handlePostLike = (post_id) => {
        setLiked(!liked);
        if (liked) {
            setLikeCount(likeCount - 1);
        } else {
            setLikeCount(likeCount + 1);
        }
    };

    useEffect(() => {
        if (userInfo) {
            setIsLoading(false);
        }
    }, [userInfo]);

    if (isLoading) {
        return;
    }

    return (
        <div className="container">
            <MyProfileSidebar
                connections={connections}
                posts={posts}
                userInfo={userInfo}
            />
            <div className="row">
                {/* CREATE POST */}
                <CreatePost userInfo={userInfo} />
                {/* FEED */}
            </div>
        </div>
    );
}
export default MainPage;
