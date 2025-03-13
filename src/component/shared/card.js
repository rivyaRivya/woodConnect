// Card.js
import React from 'react';
import './card.css';

const Card = ({ image, title, description, price }) => {
    return (
        <div className="card">
            <img src={image} alt={title} className="card-image" />
            <div className="card-body">
                <h3 className="card-title">{title}</h3>
                <p className="card-description">{description}</p>
                {/*<button className="card-button">View</button>*/}
            </div>
        </div>
    );
};

export default Card;
