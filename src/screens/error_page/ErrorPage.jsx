// ErrorPage.js
import React from 'react';
import './errorpage.css'; // Import the CSS file for styling
import Navbar from '../components/navbar/Navbar';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <>
        <Navbar/>
            <div className="error-page">
                <h1>404 - Page Not Found</h1>
                <p>Oops! The page you are looking for doesn't exist.</p>
                <br/>
                <br/>
                <Link to="/" className="linkBtn">Go Back!</Link>
            </div>
        </>
    );
};

export default ErrorPage;
