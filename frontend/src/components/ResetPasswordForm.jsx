import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ForgotPasswordForm.css';
import StyledInput from './StyledInput'; 
import lockIcon from '../assets/lock.svg';

export default function ResetPasswordForm() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    try {
        const response = await fetch('http://localhost:5001/api/users/reset-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, newPassword: password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            alert(data.message);
            navigate('/login');
        } else {
            alert(data.message);
        }
    } catch (error) {
        alert("Server error");
    }
  };

  return (
    <div className="forgot-container">
      <div className="forgot-rectangle">
        <form onSubmit={handleSubmit} className="forgot-form-content">
            <div className="forgot-header">
                <h2>Set New Password</h2>
            </div>
            
            <StyledInput
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="New Password"
                icon={lockIcon}
                required
            />
             <StyledInput
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                icon={lockIcon}
                required
            />

            <button type="submit" className="forgot-submit-btn">
              Update Password
            </button>
        </form>
      </div>
    </div>
  );
}