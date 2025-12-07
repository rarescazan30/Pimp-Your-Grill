import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import './PostGrillForm.css';
import StyledInput from './StyledInput'; 
import addPhotoIcon from '../assets/addPhotoIcon.svg';

export default function EditGrillForm() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    grillName: '',
    description: '',
    image: ''
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGrill = async () => {
        try {
            const response = await fetch(`http://localhost:5001/api/grills/${id}`);
            const data = await response.json();
            
            if (response.ok) {
                setFormData({
                    grillName: data.name,
                    description: data.description,
                    image: data.image || ''
                });
            } else {
                alert("Could not load grill details.");
                navigate('/profile');
            }
        } catch (error) {
            console.error("Error loading grill:", error);
        } finally {
            setLoading(false);
        }
    };

    fetchGrill();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileProcess = (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
        alert("Please upload an image file.");
        return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        setFormData(prev => ({ ...prev, image: reader.result }));
    };
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFileProcess(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => e.preventDefault();
  const handleFileSelect = (e) => handleFileProcess(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) return;

    try {
        const response = await fetch(`http://localhost:5001/api/grills/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: formData.grillName,
                description: formData.description,
                image: formData.image,
                userId: user._id
            }),
        });

        if (response.ok) {
            alert("Grill updated successfully!");
            navigate('/profile');
        } else {
            const data = await response.json();
            alert(data.message || "Failed to update grill");
        }
    } catch (error) {
        console.error("Error updating grill:", error);
        alert("Server error.");
    }
  };

  if (loading) return <div style={{color:'white', textAlign:'center', marginTop:'200px'}}>Loading...</div>;

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

            <input 
                type="file" 
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }} 
                onChange={handleFileSelect}
            />

            <div 
                className="upload-section" 
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current.click()}
            >
                {formData.image ? (
                    <span className="upload-text" style={{color: '#90EE90'}}>New Image Ready! ✓</span>
                ) : (
                    <>
                        <img src={addPhotoIcon} alt="Add" className="upload-icon-img" />
                        <span className="upload-text">Change photo</span>
                    </>
                )}
            </div>

            <button type="submit" className="post-grill-submit-btn">
              Update Grill
            </button>

        </form>

      </div>
    </div>
  );
}