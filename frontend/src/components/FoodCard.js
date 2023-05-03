import React, { useEffect, useState } from 'react'
import './FoodCard.css'
import { useNavigate } from 'react-router-dom'
import StarButton from './StarButton/StarButton'
import useAuth from '../hooks/useAuth'
import axios from 'axios'

const FoodCard = ({ title, calCount, img, className, id, clicked = false, ...props }) => {
  const navigate = useNavigate()
  const [isClicked, setIsClicked] = useState(clicked);
  
  useEffect(() => {
    let favIDArr = window.localStorage.getItem('favorites')?.split(',')
    if(favIDArr && favIDArr.includes(id)){
      setIsClicked(true);
    }
  }, [])



  //adds item to user history if they are logged in
  const favoritesRequest = async (method) => {
    const accessToken = window.localStorage.getItem('accessToken')
    if (!accessToken) return null;

    let favIDArr = window.localStorage.getItem('favorites')?.split(',')
    try {
      const headers = {
        headers: {
          Authorization: 'bearer ' + accessToken
        }
      }

      if (method === 'post') {

        const res = await axios.post('/api/v1/favorite', { recipeID: id }, headers)
        favIDArr.push(id)
        window.localStorage.setItem('favorites',favIDArr);
        return res
      }
      else if (method === 'delete') {
        const res = await axios.delete('/api/v1/favorite', {
          headers: {
            Authorization: 'bearer ' + accessToken
          },
          data: {
            recipeID: id
          }
        })
        const idx = favIDArr.indexOf(id)
        if(idx > -1){
          favIDArr.splice(idx,1)
          window.localStorage.setItem('favorites',favIDArr)
        }
          
        return res
      }

      return null
    } catch (e) {
      console.log(e)
    }
  }

  const visitRecipe = (id) => {
    return (event) => {
      const recipeID = id
      console.log(recipeID)
      navigate(`/recipe/${recipeID}`)
    }
  }

  const addToFav = () => {
    const newClicked = !isClicked;
    setIsClicked(newClicked);
    favoritesRequest(newClicked ? 'post' : 'delete').then(res => {
      if (!res) {
        setIsClicked(false);
        return
      }

    })
  }

  return (
    <div className={`food-card-container expand-card ${className}`} {...props}>
      <StarButton starred={isClicked} onClick={addToFav} style={{ marginRight: '0.3rem' }} />

      <div style={{ display: 'flex', alignItems: 'center' }} onClick={visitRecipe(id)}>
        <div className='food-card-img' >
          <img src={img}></img>
        </div>
        <div className='food-card-details'>
          <h2>{title}</h2>
          <span>{calCount} Cal</span>
        </div>
      </div>
    </div>

  )
}

export default FoodCard