import React, { useState } from 'react';
import './ForgotPasswordForm.css';
import StyledInput from './StyledInput'; 
import mailIcon from '../assets/mail.svg';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:5001/api/users/forgot-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        
        const data = await response.json();
        alert(data.message);
        
    } catch (error) {
        alert("Error sending request.");
    }
  };

  return (
    <div className="forgot-container">
      <div className="forgot-rectangle">
        <form onSubmit={handleSubmit} className="forgot-form-content">
            <div className="forgot-header">
                <h2>Resetare parolă</h2>
            </div>
            
            <StyledInput
                type="email" 
                name="email" 
                value={email} 
                onChange={handleChange} 
                placeholder="E-mail"
                icon={mailIcon}
                required 
            />

            <button type="submit" className="forgot-submit-btn">
              Send Link
            </button>
        </form>
      </div>
    </div>
  );
}