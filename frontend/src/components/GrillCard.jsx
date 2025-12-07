import React from 'react';
import './GrillCard.css'; 
import placeholderImg from '../assets/placeholderGrill.svg'; 
import likedMic from '../assets/likedMic.svg';
import unlikedMic from '../assets/unlikedMic.svg';

export default function GrillCard({ grill, userId, pimpName, onLike, onClick }) {
  const isLiked = grill.likedBy?.includes(userId);

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  return (
    <div className="grill-card" onClick={onClick}>
      <div className="card-top-info">
        Pimp: {pimpName}
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
        
        <div className="likes-wrapper">
            <div className="grill-stats-row">
                <img 
                    src={isLiked ? likedMic : unlikedMic} 
                    alt="Like" 
                    className="like-icon"
                    onClick={(e) => {
                        e.stopPropagation();
                        onLike(grill._id);
                    }}
                />
            </div>
            <div className="like-number">{grill.likes || 0}</div>
        </div>

        <p className="grill-description">
          {truncateText(grill.description, 100)}
        </p>
      </div>
    </div>
  );
}