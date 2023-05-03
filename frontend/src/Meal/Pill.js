import React from 'react';
import './Pill.css'

export const Pill = ({ calories, label }) => {
  return (
    <div className='meal-pill'>
      <div className='top-pill'>
        <h3>{calories}</h3>
      </div>

      <div className='bottom-pill'>
        <h4>{label}</h4>
      </div>
    </div>
  );
};
