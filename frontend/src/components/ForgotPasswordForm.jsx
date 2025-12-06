import React, { useState } from 'react';
import './ForgotPasswordForm.css';
import StyledInput from './StyledInput'; 

import mailIcon from '../assets/mail.svg';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Reset Password Email Sent to:', email);
    // TODO : Password reset logic
  };

  return (
    <div className="forgot-container">
      <div className="forgot-rectangle">
        
        <form onSubmit={handleSubmit} className="forgot-form-content">
            <div className="forgot-header">
                <h2>
                  Forgot password
                </h2>
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
              Send
            </button>

        </form>

      </div>
    </div>
  );
}