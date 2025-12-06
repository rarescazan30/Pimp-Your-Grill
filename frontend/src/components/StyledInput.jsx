import React from 'react';
import './StyledInput.css';

const StyledInput = ({ type, name, value, onChange, placeholder, required, maxLength, icon }) => {
  return (
    <div className="styled-input-wrapper">
      {icon && <img src={icon} alt="" className="input-icon" />}
      
      <input 
        className="styled-input" 
        placeholder={placeholder} 
        required={required} 
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
      />
    </div>
  );
}

export default StyledInput;