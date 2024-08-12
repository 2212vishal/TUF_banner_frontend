import React, { useState } from 'react';
import { ImCross } from "react-icons/im";

function Loginform({ setShowLoginForm, setIsLoggedIn }) {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        console.log(data.token);
        localStorage.setItem('username', data.username); // Store username in localStorage
        setIsLoggedIn(true); // Update parent component's state to indicate logged in
        setShowLoginForm(false); // Close login form
      } else {
        console.error("Login failed:", await response.json());
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="relative flex flex-col gap-2 bg-lightgray border rounded p-2 w-96">
      <button
        className="absolute top-2 right-2"
        onClick={() => setShowLoginForm(false)}
      >
        <ImCross className="w-[20px] h-[20px] text-gray-600" />
      </button>
      <div className="flex flex-col gap-2 p-2">
        <h2 className="font-bold text-2xl">Admin Login</h2>
        <div className="flex justify-between">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={loginData.username}
            onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
            required
            className="border rounded p-1"
          />
        </div>
        <div className="flex justify-between">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            required
            className="border rounded p-1"
          />
        </div>
        <button className="bg-blue-500 p-2 border rounded" onClick={handleLogin}>Login</button>
      </div>
      <div className="flex flex-col items-center border rounded border-black">
        <p>***used this for login***</p>
        <p>UserName: vishal</p>
        <p>Password: vishal123</p>

      </div>
    </div>
  );
}

export default Loginform;
