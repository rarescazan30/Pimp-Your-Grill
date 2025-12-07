import React from 'react';
import './GrillModal.css';
import placeholderImg from '../assets/placeholderGrill.svg'; 
import likedMic from '../assets/likedMic.svg';
import unlikedMic from '../assets/unlikedMic.svg';

export default function GrillModal({ grill, user, onClose, onLike, onEdit, onDelete }) {
  if (!grill) return null;

  const isLiked = grill.likedBy?.includes(user?._id);
  const likeCount = grill.likes || 0;

  const isOwner = user?._id === grill.createdBy?._id || user?._id === grill.createdBy;
  const isAdmin = user?.isAdmin === true;
  
  const canModify = isOwner || isAdmin;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        <button className="close-btn" onClick={onClose}>X</button>

        <div className="modal-left-col">
            <img 
                src={grill.image || placeholderImg} 
                alt={grill.name} 
                className="modal-img"
            />
        </div>

        <div className="modal-right-col">
            <h2 className="modal-title">{grill.name}</h2>
            
            <div className="modal-pimp-container">
                <span className="pimp-label">Pimp:</span>
                <span className="pimp-username">{grill.createdBy?.username || "Guest"}</span>
            </div>
            
            <div className="grill-stats-row" style={{ marginTop: '20px' }}>
                <img 
                    src={isLiked ? likedMic : unlikedMic} 
                    alt="Like" 
                    className="like-icon-in-modal"
                    style={{width: '80px', height: '60px'}}
                    onClick={(e) => {
                        e.stopPropagation();
                        onLike(grill._id); 
                    }}
                />
                <span className="like-number" style={{fontSize: '28px'}}>
                    {likeCount}
                </span>
                <h2 className="mici-label">
                    {likeCount === 1 ? "Mic" : "Mici"}
                </h2>
            </div>

            {canModify && (
                <div className="modal-actions-row">
                    <button className="action-btn edit-btn" onClick={() => onEdit(grill)}>
                        Edit Post
                    </button>
                    <button className="action-btn delete-btn" onClick={() => onDelete(grill._id)}>
                        Remove Post
                    </button>
                </div>
            )}

            <div className="modal-description-box">
                <p>{grill.description}</p>
            </div>
        </div>

      </div>
    </div>
  );
}