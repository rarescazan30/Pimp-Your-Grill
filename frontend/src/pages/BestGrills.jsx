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
  const [isMobile, setIsMobile] = useState(false);
  
  const [pimpIndex, setPimpIndex] = useState(0);
  const [bestIndex, setBestIndex] = useState(0);

  const navigate = useNavigate();
  const itemsPerScreen = 2; 

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const handler = (e) => {
      setIsMobile(e.matches);
      if (!e.matches) {
        setPimpIndex(0);
        setBestIndex(0);
      }
    };
    setIsMobile(mq.matches);
    if (mq.addEventListener) {
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    } else {
      mq.addListener(handler);
      return () => mq.removeListener(handler);
    }
  }, []);

  useEffect(() => {
    setPimpIndex(0);
    setBestIndex(0);

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
    const timeoutId = setTimeout(fetchData, 500);
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
      const res = await fetch(`http://localhost:5001/api/grills/${grillId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user._id }),
      });
      if (res.ok) {
        setAllGrills(prev => prev.filter(g => g._id !== grillId));
        setTopGrills(prev => prev.filter(g => g._id !== grillId));
        setSelectedGrill(null);
        setPimpIndex(0);
        setBestIndex(0);
      } else {
        const data = await res.json();
        alert(data.message || "Failed to delete.");
      }
    } catch (err) { console.error(err); }
  };

  const prevPimp = () => setPimpIndex(i => Math.max(0, i - 1));
  const nextPimp = () => setPimpIndex(i => i < allGrills.length - itemsPerScreen ? i + 1 : i);

  const prevBest = () => setBestIndex(i => Math.max(0, i - 1));
  const nextBest = () => setBestIndex(i => i < topGrills.length - itemsPerScreen ? i + 1 : i);

  const getCarouselStyles = (list, index) => {
    if (!isMobile) return { track: {}, slide: {} };

    if (list.length === 0) return { track: {}, slide: {} };

    const trackWidth = list.length * (100 / itemsPerScreen);
    const movePerc = index * (100 / list.length);

    return {
      track: {
        width: `${trackWidth}%`,
        transform: `translateX(-${movePerc}%)`,
        transition: 'transform 0.3s ease-out',
        display: 'flex',
        gap: '0' 
      },
      slide: {
        width: `${100 / list.length}%`
      }
    };
  };

  const pimpStyles = getCarouselStyles(allGrills, pimpIndex);
  const bestStyles = getCarouselStyles(topGrills, bestIndex);

  return (
    <div className="best-grills-page">
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 0 }}>
        <HeroNoText />
      </div>

      <div style={{ position: 'relative', zIndex: 10 }}>
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
      </div>

      <div className="sections-row">

        <div className="grills-section pimps-section">
          <h2 className="section-title">Grills for Pimps</h2>

          {isMobile && allGrills.length > itemsPerScreen && (
            <>
              <button 
                className="carousel-arrow left" 
                onClick={prevPimp} 
                disabled={pimpIndex === 0}
              >‹</button>
              <button 
                className="carousel-arrow right" 
                onClick={nextPimp} 
                disabled={pimpIndex >= allGrills.length - itemsPerScreen}
              >›</button>
            </>
          )}

          <div className="grills-viewport">
            {allGrills.length > 0 ? (
                <div className="grills-grid grid-two-cols" style={pimpStyles.track}>
                {allGrills.map(grill => (
                    <div key={grill._id} className="carousel-slide-wrapper" style={pimpStyles.slide}>
                        <GrillCard
                        grill={grill}
                        userId={user?._id}
                        pimpName={grill.createdBy?.username || "Unknown"}
                        onLike={handleLike}
                        onClick={() => setSelectedGrill(grill)}
                        />
                    </div>
                ))}
                </div>
            ) : (
                <p style={{color: 'white', fontFamily: 'Montserrat', fontSize: '18px', marginTop: '20px'}}>
                    No grills found.
                </p>
            )}
          </div>
        </div>

        <div className="grills-section best-section">
          <h2 className="section-title">THE BEST GRILLS</h2>
          
          {isMobile && topGrills.length > itemsPerScreen && (
            <>
              <button 
                className="carousel-arrow left" 
                onClick={prevBest} 
                disabled={bestIndex === 0}
              >‹</button>
              <button 
                className="carousel-arrow right" 
                onClick={nextBest} 
                disabled={bestIndex >= topGrills.length - itemsPerScreen}
              >›</button>
            </>
          )}

          <div className="grills-viewport">
            <div className="grills-grid grid-one-col" style={bestStyles.track}>
              {topGrills.map(grill => (
                <div key={grill._id} className="carousel-slide-wrapper" style={bestStyles.slide}>
                    <GrillCard
                      grill={grill}
                      userId={user?._id}
                      pimpName={grill.createdBy?.username || "Unknown"}
                      onLike={handleLike}
                      onClick={() => setSelectedGrill(grill)}
                    />
                </div>
              ))}
            </div>
          </div>
        </div>

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