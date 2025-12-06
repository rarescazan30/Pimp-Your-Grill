import React, { useState } from 'react';
import './RegisterForm.css';
import StyledInput from './StyledInput'; 
import { useNavigate } from 'react-router-dom';
import personIcon from '../assets/person.svg';
import phoneIcon from '../assets/phone.svg';
import mailIcon from '../assets/mail.svg';
import lockIcon from '../assets/lock.svg';
import { useAuth } from '../AuthContext';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    username: '',
    telephone: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
    const navigate = useNavigate();
    const { register } = useAuth();

    const handleChange = (e) => {
      const { name, value } = e.target;
      if (name === 'telephone') {
        if (value === '' || /^[0-9\b]+$/.test(value)) {
          setFormData(prevState => ({ ...prevState, [name]: value }));
        }
      } else {
        setFormData(prevState => ({ ...prevState, [name]: value }));
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (formData.password !== formData.confirmPassword) {
          alert("Passwords do not match!");
          return;
      }
  
      const fullName = formData.username.trim();
      const nameParts = fullName.split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' ') || ''; 
  
      const dataToSend = {
          username: fullName,
          email: formData.email,
          password: formData.password,
          telephone: formData.telephone,
          name: firstName,
          surname: lastName,
          age: null
      };
  
      const result = await register(dataToSend);
  
      if (result.success) {
          alert(result.message);
          navigate('/login');
      } else {
          alert("Registration failed: " + result.message);
      }
    };

  return (
    <div className="container">
      <div className="rectangle">
        
        <form onSubmit={handleSubmit} className="form-content">
            <div className="register-header">
                <h2>
                  Gata să devii șef pe grătare?
                </h2>
            </div>
            
            <StyledInput
                type="text" 
                name="username" 
                value={formData.username} 
                onChange={handleChange} 
                placeholder="Full name"
                icon={personIcon}
                required 
            />

            <StyledInput
                type="tel" 
                name="telephone" 
                value={formData.telephone} 
                onChange={handleChange} 
                placeholder="Telephone"
                maxLength="10"
                icon={phoneIcon}
                required
            />

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

            <StyledInput
                type="password" 
                name="confirmPassword" 
                value={formData.confirmPassword} 
                onChange={handleChange} 
                placeholder="Confirm password"
                icon={lockIcon}
                required 
            />
            <button type="submit" className="new-submit-btn">
            Sign Up
            </button>
        </form>

      </div>
    </div>
  );
}