import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import './MyGrills.css';
import placeholderImg from '../assets/placeholderGrill.svg'; 
import likedMic from '../assets/likedMic.svg';
import unlikedMic from '../assets/unlikedMic.svg';

import GrillModal from './GrillModal';

export default function MyGrills() {
  const { user } = useAuth();
  const username = user?.username || 'Guest';
  const navigate = useNavigate();
  
  const [myGrills, setMyGrills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGrill, setSelectedGrill] = useState(null);

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };
  

  useEffect(() => {
    const fetchMyGrills = async () => {
        if (!user?._id) return;
        try {
            const response = await fetch(`http://localhost:5001/api/grills/user/${user._id}`);
            const data = await response.json();
            if (response.ok) setMyGrills(data);
        } catch (error) {
            console.error("Error fetching grills:", error);
        } finally {
            setLoading(false);
        }
    };
    fetchMyGrills();
  }, [user]);

  const handleLike = async (grillId) => {
    if (!user) return; 
    try {
        const response = await fetch(`http://localhost:5001/api/grills/${grillId}/like`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: user._id }), 
        });

        if (response.ok) {
            const updatedGrill = await response.json();
            
            setMyGrills(prevGrills => 
                prevGrills.map(grill => 
                    grill._id === grillId ? updatedGrill : grill
                )
            );
            
            if (selectedGrill && selectedGrill._id === grillId) {
                setSelectedGrill(prev => ({...prev, ...updatedGrill, createdBy: prev.createdBy}));
            }
        } else {
            const data = await response.json();
            alert(data.message || "Something went wrong");
        }
    } catch (error) {
        console.error("Error updating like:", error);
    }
  };

  const handleEdit = (grill) => {
    navigate(`/edit-grill/${grill._id}`);
  };

  const handleDelete = async (grillId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this grill?");
    if (!confirmDelete) return;

    try {
        const response = await fetch(`http://localhost:5001/api/grills/${grillId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: user._id })
        });

        if (response.ok) {
            setMyGrills(prev => prev.filter(g => g._id !== grillId));
            setSelectedGrill(null);
            alert("Grill deleted successfully.");
        } else {
            alert("Failed to delete grill.");
        }
    } catch (error) {
        console.error("Error deleting grill:", error);
    }
  };

  return (
    <div className="my-grills-wrapper">
      <div className="my-grills-header">
        <h2>My Grills</h2>
      </div>

      <div className="grills-grid">
        {!loading && myGrills.length > 0 ? (
          myGrills.map((grill) => {
            const isLiked = grill.likedBy?.includes(user._id);

            return (
              <div 
                key={grill._id} 
                className="grill-card"
                onClick={() => setSelectedGrill(grill)}
              >
                <div className="card-top-info">
                  Pimp: {username}
                </div>

                <div className="grill-image-container">
                  <img 
                      src={grill.image || placeholderImg} 
                      alt={grill.name} 
                      className="grill-img"
                  />
                </div>

                <div className="card-content">
                  <h3 className="grill-name">{grill.name}</h3>
                  <div className="grill-stats-row">
                    <img 
                        src={isLiked ? likedMic : unlikedMic} 
                        alt="Like" 
                        onClick={(e) => {
                            e.stopPropagation();
                            handleLike(grill._id);
                        }}
                    />
                    <div className="like-number">{grill.likes || 0}</div>
                    
                  </div>
                  
                  <p className="grill-description">
                    {truncateText(grill.description, 100)}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="no-grills-text">
            {loading ? "Se încarcă..." : "Nu ai postat niciun grătar încă."}
          </p>
        )}
      </div>

      {selectedGrill && (
        <GrillModal 
            grill={selectedGrill}
            user={user}
            onClose={() => setSelectedGrill(null)}
            onLike={handleLike}
            onEdit={handleEdit}
            onDelete={handleDelete}
        />
      )}

    </div>
  );
}