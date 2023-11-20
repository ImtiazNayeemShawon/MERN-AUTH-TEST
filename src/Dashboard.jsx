import React, { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigateTo = useNavigate();
  const [data, setData] = useState();
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("https://react-aut-test-backend.onrender.com/get", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        setData(data?.data);
        if (!response.ok) {
          navigateTo("/");
          console.log("Invalid Token Login again");
        }
      } catch (error) {
        console.error("Login error:", error);
      }
    };
    getData();
  }, []);
  const handleLogout = async () => {
    try {
      const response = await fetch("https://react-aut-test-backend.onrender.com/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Add this line
      });

      if (response.ok) {
        // If the logout was successful, reload the page
        window.location.reload();
      } else {
        // Handle logout failure
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div>
      <div>
        <a href="" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <p className="dashboard">Dashboard</p>
        <p>username:{data?.username}</p>
        <p>password:{data?.password}</p>
      </div>
      <button className="logoutbtn" onClick={handleLogout}>
        LOGOUT
      </button>
    </div>
  );
}
