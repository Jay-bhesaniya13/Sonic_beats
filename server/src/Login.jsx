import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {

  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div class="login-box">
      <h2>Login</h2>
      <form action="" method="get">
      <input type="text" placeholder="Username" name="username" />
      <input type="password" placeholder="Password" name="password" />
      <button type="submit">Login</button>
      <button onClick={handleRegisterClick}>Don't have an account? Register</button>
      </form>
    </div>
  );
}

export default Login;
