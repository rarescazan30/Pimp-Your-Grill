import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import './MyGrills.css';
import placeholderImg from '../assets/placeholderGrill.svg'; 

// 👇 Import your new icons
import likedMic from '../assets/likedMic.svg';
import unlikedMic from '../assets/unlikedMic.svg';

export default function MyGrills() {
  const { user } = useAuth();
  const username = user?.username || 'Guest';
  
  const [myGrills, setMyGrills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyGrills = async () => {
        if (!user?._id) return;

        try {
            const response = await fetch(`http://localhost:5001/api/grills/user/${user._id}`);
            const data = await response.json();
            
            if (response.ok) {
                setMyGrills(data);
            }
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
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: user._id }), 
        });

        if (response.ok) {
            const updatedGrill = await response.json();
            
            setMyGrills(prevGrills => 
                prevGrills.map(grill => 
                    grill._id === grillId ? updatedGrill : grill
                )
            );
        } else {
            const data = await response.json();
            alert(data.message || "Something went wrong");
        }
    } catch (error) {
        console.error("Error updating like:", error);
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
              <div key={grill._id} className="grill-card">
                
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
                        className="like-icon"
                        onClick={() => handleLike(grill._id)}
                    />
                    <span className="like-number">{grill.likes || 0}</span>
                  </div>

                  <p className="grill-description">
                    {grill.description}
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
    </div>
  );
}