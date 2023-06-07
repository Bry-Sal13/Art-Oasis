import { useEffect, useState } from "react";
import { useNavigate, NavLink, useParams } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";
import "./Nav.css";

function Nav({ users, token, setUserInfo, getUser, setUser }) {
  const { username } = useParams();
  const navigate = useNavigate();
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { logout } = useToken();
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
    setLoggedIn(false);
    setUserInfo("");
    navigate("/login");
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
      return user.display_name.toLowerCase().includes(searchTerm.toLowerCase());
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
        <NavLink className="navbar-brand ms-3" aria-current="page" to="/">
          Art Oasis
        </NavLink>
      )}
      {loggedIn !== false && (
        <NavLink className="navbar-brand ms-3" aria-current="page" to="/home">
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
            type="submit"
          >
            Search
          </button>
        </form>
        {filteredUsers.length !== 0 && (
          <div className="dataResult">
            {filteredUsers.slice(0, 10).map((user) => {
              return (
                <div className="search-result-margins " key={user.user_id}>
                  <div className="dataItem d-flex flex-row align-items-center justify-content-around flex-wrap">
                    <NavLink onClick={() => handleGetUser(user)}>
                      <img
                        className="left-align "
                        src={user.profile_picture}
                        alt="Profile"
                        style={{ width: "48px", height: "48px" }}
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
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse right-align"
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav ms-auto mt-3 mt-lg-0 pe-4">
          {loggedIn !== false && (
            <>
              <li className="nav-item px-2">
                <NavLink className="nav-link" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>

              <li className="nav-item px-2">
                <NavLink
                  className="nav-link"
                  aria-current="page"
                  to="/connections"
                >
                  Connections
                </NavLink>
              </li>

              <li className="nav-item px-2">
                <NavLink
                  className="nav-link"
                  aria-current="page"
                  to="/profiles/me"
                >
                  Profile
                </NavLink>
              </li>
            </>
          )}

          <div className="d-flex justify-content-between">
            {/* if token is not valid show */}
            {loggedIn === false && (
              <>
                <li className="nav-item px-2">
                  <NavLink
                    className="nav-link"
                    aria-current="page"
                    to="/signup"
                  >
                    Signup
                  </NavLink>
                </li>

                <li className="nav-item px-2">
                  <NavLink className="nav-link" aria-current="page" to="/login">
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
                  className="btn btn-outline-light"
                >
                  Logout
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
