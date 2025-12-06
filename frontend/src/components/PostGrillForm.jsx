import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import './PostGrillForm.css';
import StyledInput from './StyledInput'; 
import addPhotoIcon from '../assets/addPhotoIcon.svg';

export default function PostGrillForm() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    grillName: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
        alert("You must be logged in to post a grill!");
        return;
    }

    try {
        const response = await fetch('http://localhost:5001/api/grills', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: formData.grillName,
                description: formData.description,
                createdBy: user._id,
                // TODO:  HANDLE IMAGE UPLOAD
            }),
        });

        const data = await response.json();

        if (response.ok) {
            alert("Grill posted successfully!");
            navigate('/profile');
        } else {
            alert(data.message || "Failed to post grill");
        }
    } catch (error) {
        console.error("Error posting grill:", error);
        alert("Server error. Please try again later.");
    }
  };

  return (
    <div className="post-grill-container">
      <div className="post-grill-rectangle">
        
        <form onSubmit={handleSubmit} className="post-grill-content">
            
            <StyledInput
                type="text" 
                name="grillName" 
                value={formData.grillName} 
                onChange={handleChange} 
                placeholder="Grill name"
                required 
            />

            <StyledInput
                type="text" 
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                placeholder="Description"
                required 
            />

            <div className="upload-section" onClick={() => alert("Image upload coming soon!")}>
                <img src={addPhotoIcon} alt="Add" className="upload-icon-img" />
                <span className="upload-text">Upload photo</span>
            </div>

            <button type="submit" className="post-grill-submit-btn">
              Post this grill!
            </button>

        </form>

      </div>
    </div>
  );
}