import React, { useEffect, useState } from 'react';
import FoodCard from './FoodCard';
import chicken from './plate.png';

export const CardRows = ({ date, recipes, totalDelay, ...props }) => {
  let delay = 100; //ms
  const cards = [];
  const [load, setLoad] = useState(true);

  useEffect(() => {
    setLoad(false);
  }, []);

  for (let i = 0; i < 6; i++) {
    cards.push(
      <div key={i} style={{ transitionDelay: ((delay * i) + totalDelay) + 'ms' }} className={`history-row-item ${load ? 'history-hidden' : 'history-show'}`} >
        <FoodCard className={`history-row-item`} img={chicken} calCount='232' title="Chicken Risotto" />
      </div>
    );
  }

  return (
    <div className={`history-date ${load ? 'hidden' : 'show'}`} style={{ transitionDelay: `${totalDelay}ms` }}>
      <h3 style={{ textAlign: 'center' }}>
        {date}
      </h3>
      <div className='history-row'>
        {cards}
      </div>
    </div>
  );
};
