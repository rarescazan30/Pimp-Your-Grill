import React, { useEffect, useState } from 'react';
import { useAuth } from '../AuthContext';
import SearchBar from '../components/SearchBar';
import GrillCard from '../components/GrillCard';
import GrillModal from '../components/GrillModal';
import HeroNoText from '../components/HeroNoText';
import { useNavigate } from 'react-router-dom';
import './BestGrills.css';

export default function BestGrills() {
  const { user } = useAuth();
  const [allGrills, setAllGrills] = useState([]);
  const [topGrills, setTopGrills] = useState([]);
  const [selectedGrill, setSelectedGrill] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const searchParam = searchTerm ? `&search=${searchTerm}` : '';

        const resAll = await fetch(`http://localhost:5001/api/grills?sort=date${searchParam}`);
        const dataAll = await resAll.json();
        setAllGrills(dataAll);

        const resTop = await fetch(`http://localhost:5001/api/grills?sort=likes`);
        const dataTop = await resTop.json();
        setTopGrills(dataTop.slice(0, 3)); 

      } catch (err) {
        console.error(err);
      }
    };
    const timeoutId = setTimeout(() => {
        fetchData();
    }, 500);

    return () => clearTimeout(timeoutId);

  }, [searchTerm]);

  const handleLike = async (grillId) => {
    if (!user) {
        alert("Login to like!");
        return;
    }
    try {
        const res = await fetch(`http://localhost:5001/api/grills/${grillId}/like`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: user._id }), 
        });
        if (res.ok) {
            const updatedGrill = await res.json();
            const updateList = (list) => list.map(g => g._id === grillId ? {...g, ...updatedGrill, createdBy: g.createdBy} : g);
            setAllGrills(prev => updateList(prev));
            setTopGrills(prev => updateList(prev));
            
            if (selectedGrill && selectedGrill._id === grillId) {
                setSelectedGrill(prev => ({...prev, ...updatedGrill, createdBy: prev.createdBy}));
            }
        } else {
            const data = await res.json();
            alert(data.message || "Something went wrong");
        }
    } catch (err) { console.error(err); }
  };
  const handleEdit = (grill) => {
    navigate(`/edit-grill/${grill._id}`);
  };
  const handleDelete = async (grillId) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
        const response = await fetch(`http://localhost:5001/api/grills/${grillId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: user._id })
        });

        if (response.ok) {
            setAllGrills(prev => prev.filter(g => g._id !== grillId));
            setTopGrills(prev => prev.filter(g => g._id !== grillId));
            setSelectedGrill(null);
            alert("Grill deleted successfully.");
        } else {
            const data = await response.json();
            alert(data.message || "Failed to delete.");
        }
    } catch (error) {
        console.error("Error deleting:", error);
    }
  };


  return (
    <div className="best-grills-page">
      
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 0 }}>
        <HeroNoText />
      </div>
      <div style={{ position: 'relative', zIndex: 10 }}>
        <SearchBar
            value = {searchTerm}
            onChange = {setSearchTerm}
            />
      </div>

      <div className="sections-row">
        
        <div className="grills-section pimps-section">
          <h2 className="section-title">Grills for Pimps</h2>
          <div className="grills-grid grid-two-cols">
            {allGrills.map(grill => (
              <GrillCard 
                  key={grill._id} 
                  grill={grill} 
                  userId={user?._id}
                  pimpName={grill.createdBy?.username || "Unknown"}
                  onLike={handleLike}
                  onClick={() => setSelectedGrill(grill)}
              />
            ))}
          </div>
        </div>

        <div className="grills-section best-section">
          <h2 className="section-title">THE BEST GRILLS</h2>
          <div className="grills-grid grid-one-col">
            {topGrills.map(grill => (
              <GrillCard 
                  key={grill._id} 
                  grill={grill} 
                  userId={user?._id}
                  pimpName={grill.createdBy?.username || "Unknown"}
                  onLike={handleLike}
                  onClick={() => setSelectedGrill(grill)}
              />
            ))}
          </div>
        </div>

      </div>

      {selectedGrill && (
        <GrillModal 
            grill={selectedGrill}
            user={user}
            onClose={() => setSelectedGrill(null)}
            onLike={handleLike}
            onEdit= {handleEdit}
            onDelete={handleDelete}
        />
      )}
    </div>
  );
}