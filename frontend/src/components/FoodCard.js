import React from 'react'
import './FoodCard.css'
import { useNavigate } from 'react-router-dom'

const FoodCard = ({title,calCount,img,className,id,...props}) => {
  const navigate = useNavigate()

  const visitRecipe = (id) => {
    return (event) => {
      const recipeID = id
      console.log(recipeID)
      navigate(`/recipe/${recipeID}`)
    }
  }
  
  return (
    <div onClick={visitRecipe(id)} className={`food-card-container expand-card ${className}`} {...props}>
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