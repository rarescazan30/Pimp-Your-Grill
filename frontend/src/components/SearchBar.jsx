import React from 'react';
import './SearchBar.css';
import searchIcon from '../assets/SearchIcon.svg'; 

export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar-container">
      <div className="search-input-wrapper">
        <input 
          type="text" 
          className="search-input" 
          placeholder="Search for a grill..." 
          
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <img src={searchIcon} alt="Search" className="search-icon" />
      </div>
    </div>
  );
}