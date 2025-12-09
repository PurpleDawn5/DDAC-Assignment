import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate(); 

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login submitted");
    
    localStorage.setItem('isAuthenticated', 'true');
    
    navigate('/');
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('isAuthenticated', 'true');
    navigate('/');
  };

  return (
    <div className="wrapper">
      <div className="card-switch">
        <label className="switch">
          <input type="checkbox" className="toggle" />
          <span className="slider"></span>
          <span className="card-side"></span>
          
          <div className="flip-card__inner" onClick={(e) => e.stopPropagation()}>
            
            {/* FRONT SIDE: LOGIN */}
            <div className="flip-card__front">
              <div className="title">Log in</div>
              <form className="flip-card__form" onSubmit={handleLogin}>
                <input className="flip-card__input" name="email" placeholder="Email" type="email" required />
                <input className="flip-card__input" name="password" placeholder="Password" type="password" required />
                <button className="flip-card__btn">Let's go!</button>
              </form>
            </div>

            {/* BACK SIDE: SIGN UP */}
            <div className="flip-card__back">
              <div className="title">Sign up</div>
              <form className="flip-card__form" onSubmit={handleSignup}>
                <input className="flip-card__input" name="name" placeholder="Name" type="text" required />
                <input className="flip-card__input" name="email" placeholder="Email" type="email" required />
                <input className="flip-card__input" name="password" placeholder="Password" type="password" required />
                <button className="flip-card__btn">Confirm!</button>
              </form>
            </div>

          </div>
        </label>
      </div>
    </div>
  );
};

export default Login;