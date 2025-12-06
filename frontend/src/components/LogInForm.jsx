import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import './LoginForm.css';
import StyledInput from './StyledInput'; 
import { useAuth } from '../AuthContext';
import mailIcon from '../assets/mail.svg';
import lockIcon from '../assets/lock.svg';

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const result = await login(formData.email, formData.password);

    if (result.success) {
        console.log("Login Successful!");
        navigate('/');
    } else {
        alert("Login failed: " + result.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-rectangle">
        
        <form onSubmit={handleSubmit} className="login-form-content">
            <div className="login-header">
            <h2>
                  Bine ai revenit<br />
                  mare grătangiu!
                </h2>
            </div>
            
            <StyledInput
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="E-mail"
                icon={mailIcon}
                required 
            />

            <StyledInput
                type="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                placeholder="Password"
                icon={lockIcon}
                required 
            />

            <button type="submit" className="login-submit-btn">
              Log In
            </button>

            <div className="form-footer">
              <Link to="/forgot-password" className="forgot-password-link">
                Forgot password?
              </Link>
              
              <span className="signup-prompt">
                No account? Press here to<Link to="/register" className="signup-link">sign up</Link>
              </span>
            </div>

        </form>

      </div>
    </div>
  );
}