import React from 'react';
import './featurecard.css';

const FeatureCard = (props) => {
  return (
    <>
      <div className="featureCard" >
        <div className="internalBox" style={{ backgroundImage: `url(${props.featureImage})` , height: '${props.height}'}}>
          <h3 className='featureH2'>{props.featureName}</h3>
          <div className="internalestBox">
            <p className="ourP" style={{color: "black",fontWeight: "bold",fontFamily: "monospace"}}>{props.featureDescription}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default FeatureCard;
