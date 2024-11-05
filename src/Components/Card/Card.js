import React from 'react';
import './Card.css';


const TagIcon = ({ priority }) => {
  const tagIcons = {
    0: (
      <img src='/Images/No-priority.svg' alt='At1'/>
    ),
    1: (
      <img src='/Images/Img - Low Priority.svg' alt='At3'/>
    ),
    2: (
      <img src='/Images/Img - Medium Priority.svg' alt='At2'/>
    ),
    3: (
      <img src='/Images/Img - High Priority.svg' alt='At4'/>
    ),
    4: (
      <img src='/Images/SVG - Urgent Priority colour.svg' alt='At5'/>
    ),
  };

  return tagIcons[priority] || null;
};

export default function Card({ cardDetails }) {
  const { id, userObj, title, priority, tag } = cardDetails;
  const { name, available } = userObj;

  return (
    <div className="card-container">
      <div className="card-id-wrapper">
        <div className="card-id">{id}</div>
        <div className="card-profile">
          <div className="card-profile-initial">{name[0]}{name[1]}</div>
          <div className={available ? "card-profile-initial-available card-profile-initial-available-true" : "card-profile-initial-available"} />
        </div>
      </div>
      <div className="card-title">{title}</div>
      <div className="card-tag">
        <TagIcon priority={priority} />
        {tag.map((tagItem, index) => (
          <div key={index} className="card-tag-box">
            <div className="card-tag-title">{tagItem}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
