// import {NavLink} from 'react-router-dom';
import { useEffect, useState} from 'react';
import { useNavigate, NavLink, Link} from 'react-router-dom';
import "./Nav.css";


function Nav({props}) {
  const navigate = useNavigate();
  const [filteredUsers, setFilteredUsers] = useState([])

  async function handleLogout(event) {
    event.preventDefault();
    const url = "http://localhost:8000/token"
    const fetchConfig = {
        method: "delete",
    };
    const response = await fetch(url,fetchConfig);
    if (response.ok){
      navigate("/login")
    }
  }

  async function handleChangeSearch(event) {
    const search = event.target.value
    const newFilter = props.users.filter((value) => {
      return value.username.toLowerCase.includes(search.toLowerCase);
    });
    if (search === "") {
      setFilteredUsers([]);
    } else {
      setFilteredUsers(newFilter)
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-pastel-blue">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <a className="navbar-brand ps-4" href="index.html">Art Oasis</a>

      <div className="container-fluid">
        <form className="d-flex" role="search">
          <input onChange={handleChangeSearch} className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
          <button className="btn btn-outline-light" type="submit">Search</button>
        </form>
        {filteredUsers.length !== 0 &&(
        <div className="dataResult">
          {filteredUsers.slice(0, 15).users.map((user,key) => {
            return (
              <a href={"/api/users/" + user.username} className="dataItem" target="_blank" rel='noreferrer'>
                <p>{user.username}</p>
              </a>
            );
            })}
        </div>
        )}
      </div>

      <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
        <ul className="navbar-nav me-auto mt-3 mt-lg-0">
          <li className="nav-item px-2">
            <NavLink className="nav-link" aria-current="page" to="/home">Home</NavLink>
          </li>

          <li className="nav-item px-2">
            <NavLink className="nav-link" aria-current="page" to="/connections">Connections</NavLink>
          </li>

          <li className="nav-item px-2">
            <NavLink className="nav-link" aria-current="page" to="/messages">Messages</NavLink>
          </li>

          <li className="nav-item px-2">
            <NavLink className="nav-link" aria-current="page" to="/profile">Profile</NavLink>
          </li>

          <div className="d-flex justify-content-between">

            <li className="nav-item px-2">
              <button className="btn btn-outline-light">
                Signup<NavLink to="/login"></NavLink>
              </button>
            </li>

            <li className="nav-item px-2">
              <button className="btn btn-outline-light">
                Login<NavLink aria-current="page" to="/login"></NavLink>
              </button>
            </li>

            <li className="nav-item px-2">
              <button onClick={handleLogout} className="btn btn-outline-light">Logout</button>
            </li>

          </div>
          </ul>
      </div>
    </nav>
  );
}

export default Nav;
