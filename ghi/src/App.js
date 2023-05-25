import { useEffect, useState } from "react";
import React from 'react';
import SignUpForm from './components/SignUpForm';
import ErrorNotification from "./ErrorNotification";
import "./App.css";

function App() {
  const [launchInfo, setLaunchInfo] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getData() {
      let url = "http://localhost:8000/api/users";
      console.log("fastapi url: ", url);
      let response = await fetch(url);
      console.log("------- hello? -------");
      let data = await response.json();

      try {
        let data = await response.json();

        if (response.ok) {
          console.log("got launch data!");
          setLaunchInfo(data.launch_details);
        } else {
          console.log("drat! something happened");
          setError(data.message);
        }
      } catch (error) {
        console.log("Error parsing JSON:", error);
        setError("Error parsing response");
      }
    }
    getData();
  }, []);

  return (
    <div>
      <SignUpForm />
    </div>
  );
}

export default App;
