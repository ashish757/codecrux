import React from 'react';
import './Card.css';
import { Link } from 'react-router-dom';

interface CardProps {
  image?: string;
  title: string;
  description: string;
  tags: string[];
  buttonText: string;
  link: string | null;
}

const Card: React.FC<CardProps> = ({
  image,
  title,
  description,
  tags,
  buttonText = "Learn More",
  link
}) => {
  return (
    <div className="card">
      {image && (
        <div className="card-image">
          <img src={image} alt={title} />
        </div>
      )}
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
        <div className="card-tags">
          {tags.map((tag, index) => (
            <span key={index} className="card-tag">
              {tag}
            </span>
          ))}
        </div>
        {
          link ? (
                  <Link to={link} className="card-link">
                  <button className="card-button">
                    {buttonText}
                  </button>
                </Link>
                ) : (
                  <button className="card-button">
                    {buttonText}
                  </button>
                )
        }
        
  
      </div>
    </div>
  );
};

export default Card;
