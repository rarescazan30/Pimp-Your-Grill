import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgotPasswordForm.css';

export default function EmailVerifiedMessage() {
  const navigate = useNavigate();

  return (
    <div className="forgot-container">
      <div className="forgot-rectangle" style={{ height: '400px' }}>
        
        <div className="forgot-form-content">
            <div className="forgot-header">
                <h2>
                  Email Verified!
                </h2>
                <p style={{color: 'white', marginTop: '10px', fontSize: '18px', fontFamily: 'Montserrat'}}>
                    Contul tău a fost activat cu succes.
                </p>
            </div>
            
            <button 
                className="forgot-submit-btn" 
                onClick={() => navigate('/login')}
                style={{marginTop: '20px'}}
            >
              Go to Login
            </button>
        </div>

      </div>
    </div>
  );
}