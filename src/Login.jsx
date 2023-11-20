import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { useNavigate } from "react-router-dom";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigateTo = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("https://react-aut-test-backend.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include', // Add this line

      });

      if (response.ok) {
         navigateTo("/Dashboard");
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <p className="login">Login form </p>
      <div className="form">
        <input
          placeholder="Enter Your email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="Enter Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="loginbtn" onClick={handleLogin}>
          LOGIN
        </button>
      </div>
    </>
  );
}

export default App;
