import { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";
import { useAuthContext } from "@galvanize-inc/jwtdown-for-react";
import "./Nav.css";

function Nav({ users, token, setUserInfo, getUser, setUser }) {
    const navigate = useNavigate();
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const { logout } = useToken();
    const { setToken } = useAuthContext();
    const [loggedIn, setLoggedIn] = useState();

    const checkLoggedIn = async () => {
        if (token) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    };

    async function handleLogout(event) {
        logout();
        const timer = setTimeout(() => {
            setUserInfo("");
            setToken("");
            if (!token) {
                setLoggedIn(false);
                navigate("/login");
            }
        }, 300);
        return () => clearTimeout(timer);
    }

    async function handleSearchChange(event) {
        var term = event.target.value;
        setSearchTerm(term);
    }

    const handleGetUser = async (user) => {
        await getUser(user.username);
        setUser(user);
        if (user) {
            navigate(`/profiles/${user.username}`);
        }
    };

    async function handleSearch(event) {
        event.preventDefault();
        setFilteredUsers([]);
        const newFilter = users.filter((user) => {
            return user.display_name
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
        });
        if (searchTerm === "") {
            setFilteredUsers([]);
        } else {
            setFilteredUsers(newFilter);
        }
    }

    useEffect(() => {
        checkLoggedIn();
    }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-pastel-blue">
            {loggedIn === false && (
                <NavLink
                    className="navbar-brand ms-3"
                    aria-current="page"
                    to="/">
                    Art Oasis
                </NavLink>
            )}
            {loggedIn !== false && (
                <NavLink
                    className="navbar-brand ms-3"
                    aria-current="page"
                    to="/home">
                    Art Oasis
                </NavLink>
            )}

            <div className="search">
                <form onSubmit={handleSearch} role="search">
                    <input
                        onChange={handleSearchChange}
                        className="form-control me-2 d-inline"
                        type="search"
                        id="search"
                        placeholder="Search"
                        aria-label="Search"
                    />
                    <button
                        className="btn btn-outline-light position-absolute"
                        type="submit">
                        Search
                    </button>
                </form>
                {filteredUsers.length !== 0 && (
                    <div className="dataResult">
                        {filteredUsers.slice(0, 10).map((user) => {
                            return (
                                <div
                                    className="search-result-margins "
                                    key={user.user_id}>
                                    <div className="dataItem d-flex flex-row align-items-center justify-content-around flex-wrap">
                                        <NavLink
                                            onClick={() => handleGetUser(user)}>
                                            <img
                                                className="left-align "
                                                src={user.profile_picture}
                                                alt="Profile"
                                                style={{
                                                    width: "48px",
                                                    height: "48px",
                                                }}
                                            />

                                            <p className="text-align-right mb-0">
                                                {user.display_name}
                                            </p>
                                        </NavLink>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div
                className="collapse navbar-collapse right-align"
                id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mt-3 mt-lg-0 pe-4">
                    {loggedIn !== false && (
                        <>
                            <li className="nav-item px-2 nav-btn-hover">
                                <NavLink
                                    className="nav-link"
                                    aria-current="page"
                                    to="/home">
                                    Home
                                </NavLink>
                            </li>

                            <li className="nav-item px-2 d-none nav-btn-hover">
                                <NavLink
                                    className="nav-link"
                                    aria-current="page"
                                    to="/connections">
                                    Connections
                                </NavLink>
                            </li>

                            <li className="nav-item px-2 nav-btn-hover">
                                <NavLink
                                    className="nav-link"
                                    aria-current="page"
                                    to="/profiles/me">
                                    Profile
                                </NavLink>
                            </li>
                        </>
                    )}

                    <div className="d-flex justify-content-between">
                        {/* if token is not valid show */}
                        {loggedIn === false && (
                            <>
                                <li className="nav-item px-2 nav-btn-hover">
                                    <NavLink
                                        className="nav-link"
                                        aria-current="page"
                                        to="/signup">
                                        Signup
                                    </NavLink>
                                </li>

                                <li className="nav-item px-2 nav-btn-hover">
                                    <NavLink
                                        className="nav-link"
                                        aria-current="page"
                                        to="/login">
                                        Login
                                    </NavLink>
                                </li>
                            </>
                        )}

                        {/* if token is valid show */}
                        {loggedIn !== false && (
                            <li className="nav-item px-2">
                                <button
                                    onClick={handleLogout}
                                    className="logout-btn">
                                    <div className="sign">
                                        <svg viewBox="0 0 512 512">
                                            <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                                        </svg>
                                    </div>

                                    <div className="logout-text">Logout</div>
                                </button>
                            </li>
                        )}
                    </div>
                </ul>
            </div>
        </nav>
    );
}

export default Nav;
