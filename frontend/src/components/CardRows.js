import React, { useEffect, useState } from 'react';
import FoodCard from './FoodCard';
import chicken from './plate.png';
import { motion as m } from 'framer-motion'

export const CardRows = ({ date, recipes, totalDelay, ...props }) => {
  let delay = 0.095; //ms
  const cards = [];
  const [load, setLoad] = useState(true);

  useEffect(() => {
    setLoad(false);
  }, []);

  for (let i = 0; i < 6; i++) {
    cards.push(
      <m.div
        key={i}
        initial={{
          x: '100%',
          filter: 'blur(5px)',
          opacity: 0,
        }}
        animate={{
          x: '0%',
          filter: 'blur(0)',
          opacity: 1,
          transition: {
            duration: 0.5,
            delay: (delay * i) + totalDelay,
          },
        }}
      >
        <FoodCard className={`history-row-item`} img={chicken} calCount='232' title="Chicken Risotto" />
      </m.div>
    );
  }

  return (
    <m.div className='history-date'
      initial={{
        y: -10,
        filter: 'blur(5px)',
        opacity: 0,
      }}
      animate={{
        y: 0,
        filter: 'blur(0)',
        opacity: 1,
        transition:{
          duration:0.4,
          delay:totalDelay
        }
      }}>
        <h3 style={{ textAlign: 'center' }}>
          {date}
        </h3>
        <div className='history-row'>
          {cards}
        </div>
    </m.div>
  );
};
