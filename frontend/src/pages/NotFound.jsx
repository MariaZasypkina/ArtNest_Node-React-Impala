import React from 'react';
import './NotFound.css';
import palette404 from '../assets/images/ArtNest_Image1.webp';

const NotFound = () => {
    return (
        <div className="not-found">
            <img 
                src={palette404} 
                alt="404 Not Found" 
                className="not-found-image" 
            />
            <h1 className="not-found-title">404</h1>
            <p className="not-found-text">Oops! The page you’re looking for doesn’t exist.</p>
            <a href="/" className="not-found-link">Go Back Home</a>
        </div>
    );
};

export default NotFound;
