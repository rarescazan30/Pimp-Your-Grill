import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import GrillCard from '../components/GrillCard';
import GrillModal from './GrillModal';
import './MyGrills.css';

export default function MyGrills() {
  const { user } = useAuth();
  const username = user?.username || 'Guest';
  const navigate = useNavigate();

  const [myGrills, setMyGrills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGrill, setSelectedGrill] = useState(null);
  
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemsPerScreen = 2; 

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 600;
      setIsMobile(mobile);
      if (!mobile) setCurrentIndex(0);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchMyGrills = async () => {
      if (!user?._id) return;
      try {
        const response = await fetch(`http://localhost:5001/api/grills/user/${user._id}`);
        const data = await response.json();
        if (response.ok) setMyGrills(data);
      } catch (error) {
        console.error(error);
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
        setMyGrills(prev => prev.map(g => g._id === grillId ? updatedGrill : g));
        if (selectedGrill?._id === grillId) setSelectedGrill(prev => ({ ...prev, ...updatedGrill }));
      } else {
        const data = await response.json();
        alert(data.message || "Something went wrong");
      }
    } catch (error) { console.error(error); }
  };

  const handleDelete = async (grillId) => {
    if (!window.confirm("Are you sure you want to delete this grill?")) return;
    try {
      const response = await fetch(`http://localhost:5001/api/grills/${grillId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user._id })
      });
      if (response.ok) {
        setMyGrills(prev => prev.filter(g => g._id !== grillId));
        setSelectedGrill(null);
        if (currentIndex > 0 && currentIndex >= myGrills.length - itemsPerScreen) {
             setCurrentIndex(Math.max(0, currentIndex - 1));
        }
      }
    } catch (error) { console.error(error); }
  };

  const next = () => {
    if (currentIndex < myGrills.length - itemsPerScreen) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const trackStyle = isMobile ? {
    width: `${myGrills.length * (100 / itemsPerScreen)}%`,
    transform: `translateX(-${currentIndex * (100 / myGrills.length)}%)`,
    transition: 'transform 0.3s ease-out'
  } : {};

  const slideStyle = isMobile ? {
    width: `${100 / myGrills.length}%`
  } : {};

  return (
    <div className="my-grills-wrapper">
      <div className="my-grills-header"><h2>My Grills</h2></div>

      {isMobile && myGrills.length > itemsPerScreen && (
        <>
          <button 
            className="carousel-arrow left" 
            onClick={prev} 
            disabled={currentIndex === 0}
          >‹</button>
          <button 
            className="carousel-arrow right" 
            onClick={next} 
            disabled={currentIndex >= myGrills.length - itemsPerScreen}
          >›</button>
        </>
      )}

      <div className="grills-viewport">
        <div 
          className="grills-grid"
          style={trackStyle}
        >
          {!loading && myGrills.length > 0
            ? myGrills.map(grill => (
              <div key={grill._id} className="grill-card-wrapper" style={slideStyle}>
                <GrillCard
                  grill={grill}
                  userId={user._id}
                  pimpName={username}
                  onLike={handleLike}
                  onClick={() => setSelectedGrill(grill)}
                />
              </div>
            ))
            : <p className="no-grills-text">{loading ? "Se încarcă..." : "Nu ai postat niciun grătar încă."}</p>
          }
        </div>
      </div>

      {selectedGrill && (
        <GrillModal
          grill={selectedGrill}
          user={user}
          onClose={() => setSelectedGrill(null)}
          onLike={handleLike}
          onEdit={(g) => navigate(`/edit-grill/${g._id}`)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}