import { useEffect, useState } from "react";
import React from 'react';
// import SignUpForm from './components/SignUpForm';
import Nav from './Nav';
import "./App.css";

function App() {

  const [users, setUsers] = useState([]);

  const GetUserData = async () => {
    const usersUrl = "http://localhost:8000/api/users";
    const response = await fetch(usersUrl);
    if (response.ok) {
      const data = await response.json();
      setUsers(data.manufacturers);
    }
  }

  useEffect(() => {
    GetUserData()
  },[])

  return (
    <div>
      {/* <SignUpForm /> */}
      <Nav/>
    </div>
  );
}

export default App;
