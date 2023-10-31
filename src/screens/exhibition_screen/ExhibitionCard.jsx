import React from 'react';
import { Link } from 'react-router-dom';
import './exhibitioncard.css';

const ExhibitionCard = ({ imageUrl, title, isCollaborate, artist , projectId}) => {
  const handleMoreDetails = () => {
    
  };

  const handleCollaborate = () => {
    
  };

  return (
    <div className="exhibition-card">
      <div className="card-image">
        <img src={imageUrl} alt={title} />
      </div>
      <div className="card-details">
        <h3 className="card-title" style={{fontSize: "18px"}}>{title}</h3>
        <p className="card-artist" style={{fontSize: "15px"}}>By: {artist}</p>
      </div>
      <div className="card-buttons">
        <Link to={`/project-details/${projectId}`} style={{ textDecoration: "none" }}>
          <center>
          <button className="more-details-button">More Details</button>
          </center>
        </Link>
       
      </div>
    </div>
  );
}

export default ExhibitionCard;
