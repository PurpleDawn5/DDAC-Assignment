import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import './Login.css';
import { AuthAPI } from '../api/authServices';

const Login = () => {
  const navigate = useNavigate();
  
  // State for Login Form
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // State for Register Form
  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    licenseNumber: ''
  });

  const [loading, setLoading] = useState(false);

  // Handle Input Changes for Login
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  // Handle Input Changes for Register
  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  // --- LOGIN LOGIC ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Call Backend
      const response = await AuthAPI.login(loginData);

      // 2. Save Data for the rest of the app to use
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('agentId', response.agentId);
      localStorage.setItem('agentName', response.agentName);
      
      message.success('Welcome back!');
      navigate('/');
    } catch (error: any) {
      console.error("Login failed", error);
      // Show error message (from backend or generic)
      const errorMsg = error.response?.data?.message || "Login failed. Check credentials.";
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // --- SIGNUP LOGIC ---
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Call Backend
      await AuthAPI.register(registerData);
      
      message.success('Account created! Please log in.');
      
    } catch (error: any) {
      console.error("Signup failed", error);
      const errorMsg = error.response?.data?.message || "Registration failed.";
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wrapper">
      <div className="card-switch">
        <label className="switch">
          {/* This checkbox controls the flip */}
          <input type="checkbox" className="toggle" />
          <span className="slider"></span>
          <span className="card-side"></span>
          
          <div className="flip-card__inner" onClick={(e) => e.stopPropagation()}>
            
            {/* FRONT: LOGIN */}
            <div className="flip-card__front">
              <div className="title">Log in</div>
              <form className="flip-card__form" onSubmit={handleLogin}>
                <input 
                  className="flip-card__input" 
                  name="email" 
                  placeholder="Email" 
                  type="email" 
                  value={loginData.email}
                  onChange={handleLoginChange}
                  required 
                />
                <input 
                  className="flip-card__input" 
                  name="password" 
                  placeholder="Password" 
                  type="password" 
                  value={loginData.password}
                  onChange={handleLoginChange}
                  required 
                />
                <button className="flip-card__btn" disabled={loading}>
                  {loading ? 'Logging in...' : "Let's go!"}
                </button>
              </form>
            </div>

            {/* BACK: SIGN UP */}
            <div className="flip-card__back">
              <div className="title">Sign up</div>
              <form className="flip-card__form" onSubmit={handleSignup}>
                <input 
                  className="flip-card__input" 
                  name="firstName" 
                  placeholder="First Name" 
                  type="text" 
                  value={registerData.firstName}
                  onChange={handleRegisterChange}
                  required 
                />
                <input 
                  className="flip-card__input" 
                  name="lastName" 
                  placeholder="Last Name" 
                  type="text" 
                  value={registerData.lastName}
                  onChange={handleRegisterChange}
                  required 
                />
                <input 
                  className="flip-card__input" 
                  name="phoneNumber" 
                  placeholder="Phone Number" 
                  type="tel" 
                  value={registerData.phoneNumber}
                  onChange={handleRegisterChange}
                  required
                />
                <input 
                  className="flip-card__input" 
                  name="licenseNumber" 
                  placeholder="License Number (e.g. A-12345)" 
                  type="text" 
                  value={registerData.licenseNumber}
                  onChange={handleRegisterChange}
                  required
                />
                <input 
                  className="flip-card__input" 
                  name="email" 
                  placeholder="Email" 
                  type="email" 
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  required 
                />
                <input 
                  className="flip-card__input" 
                  name="password" 
                  placeholder="Password" 
                  type="password" 
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  required 
                />
                <button className="flip-card__btn" disabled={loading}>
                  {loading ? 'Processing...' : 'Confirm!'}
                </button>
              </form>
            </div>
          </div>
        </label>
      </div>
    </div>
  );
};

export default Login;