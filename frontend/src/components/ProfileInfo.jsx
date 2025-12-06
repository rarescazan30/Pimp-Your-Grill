import React from 'react';
import { useAuth } from '../AuthContext';
// 👇 1. Import useNavigate
import { useNavigate } from 'react-router-dom';
import StyledInput from './StyledInput';
import './ProfileInfo.css';

import personIcon from '../assets/person.svg';
import mailIcon from '../assets/mail.svg';
import phoneIcon from '../assets/phone.svg';

export default function ProfileInfo() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const username = user?.username || '';
  const email = user?.email || '';
  const rawTelephone = user?.telephone || ''; 
  
  const formatPhoneNumber = (phoneNumber) => {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    
    if (cleaned.length === 10) {
      return cleaned.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
    }
    
    return phoneNumber;
  };
  const telephone = formatPhoneNumber(rawTelephone);

  return (
    <div className="profile-top-section">
      
      <div className="profile-rectangle">
        <div className="profile-content">
          
          <div className="read-only-input-wrapper">
            <StyledInput
                type="text"
                name="username"
                value={username}
                placeholder="Username"
                icon={personIcon}
                readOnly
            />
          </div>

          <div className="read-only-input-wrapper">
            <StyledInput
                type="email"
                name="email"
                value={email}
                placeholder="Email"
                icon={mailIcon}
                readOnly
            />
          </div>

          <div className="read-only-input-wrapper">
            <StyledInput
                type="tel"
                name="telephone"
                value={telephone}
                placeholder="Phone number"
                icon={phoneIcon}
                readOnly
            />
          </div>

        </div>
      </div>

      <div className="post-action-container">
        <button 
            className="post-grill-btn"
            onClick={() => navigate('/post-grill')}
        >
          Post a grill
        </button>
      </div>

    </div>
  );
}