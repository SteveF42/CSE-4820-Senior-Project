import React from 'react'
import './FoodCard.css'

const FoodCard = ({title,calCount,img,className,...props}) => {
  return (
    <div className={`food-card-container ${className}`} {...props}>
        <div className='food-card-img'>
            <img src={img}></img>
        </div>
        <div className='food-card-details'>
            <h2>{title}</h2>
            <span>{calCount} Cal</span>
        </div>
    </div>
  )
}

export default FoodCard