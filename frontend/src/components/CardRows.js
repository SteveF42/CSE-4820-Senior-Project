import React, { useEffect, useState } from 'react';
import FoodCard from './FoodCard';
import { motion as m } from 'framer-motion'

export const CardRows = ({ date, recipes, totalDelay, ...props }) => {
  let delay = 0.095; //ms
  const [cards, setCards] = useState([])
  const [load, setLoad] = useState(true);

  const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  useEffect(() => {
    const foodCards = recipes.map((x, i) => {

      return (
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
          <FoodCard key={x?._id} recipe={x} id={x?._id} />
        </m.div>
      )
    });
    setCards([...foodCards])
  }, []);


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
        transition: {
          duration: 0.4,
          delay: totalDelay
        }
      }}>
      <h3 style={{ textAlign: 'center' }}>
        {`${months[date?.getMonth()]} ${date?.getFullYear()}`}
      </h3>
      <div className='history-row'>
        <div className='history-row-inner'>
          {cards}
        </div>
      </div>
    </m.div>
  );
};
