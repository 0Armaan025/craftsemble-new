import React from 'react';
import { Link } from 'react-router-dom';
import './continuebutton.css';
import { useState, useEffect } from "react";
import { getUserData } from '../../../userUtils';

const ContinueButton = () => {
  
  const [userExists, setUserExists] = useState(false);

  useEffect(() => {
    
    getUserData(setUserExists).then((doesUserExist) => {
      setUserExists(doesUserExist);
    });
  }, []);

  return (
    <>
      <div className="continueButton">
        <Link to={userExists ? '/become-an-artisan' : '/hanko-auth'}><input type="button" className='continueBtn' value="Continue"/></Link>
      </div>
    </>
  )
}

export default ContinueButton;
