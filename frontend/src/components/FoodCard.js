import React, { useEffect, useState } from 'react'
import './FoodCard.css'
import { useNavigate } from 'react-router-dom'
import StarButton from './StarButton/StarButton'
import axios from 'axios'
import { LoginButton } from './Buttons'

const FoodCard = ({ recipe, cardNum, ...props }) => {
  const navigate = useNavigate();
  const { title: title, nutrients, image: img, _id: id, y } = recipe || {};
  const { calories: calCount, carbohydrateContent: carbs, fatContent: fat, proteinContent: protein } = nutrients || {}
  const [isClicked, setIsClicked] = useState(false);
  const cardBackGrounds = ['#839B9D', '#8B909E', '#869086']
  const [foreGroundColor, setForeGroundColor] = useState(cardBackGrounds[0])

  useEffect(() => {
    let favIDArr = window.localStorage.getItem('favorites')?.split(',')
    if (favIDArr && favIDArr.includes(id)) {
      setIsClicked(true);
    }
    setForeGroundColor(getRandColor())
  }, [])
  const getRandColor = () => {
    // return cardBackGrounds[0];
    const idx = Math.floor(Math.random() * cardBackGrounds.length)
    return cardBackGrounds[idx]
  }

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
        window.localStorage.setItem('favorites', favIDArr);
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
        if (idx > -1) {
          favIDArr.splice(idx, 1)
          window.localStorage.setItem('favorites', favIDArr)
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
    <div className={`food-card-container expand-card`} {...props}>

      <div className='food-card-inner' style={{ backgroundColor: foreGroundColor }} >
        <div className='food-card-img' >
          <img src={img}></img>
        </div>
        <StarButton starred={isClicked} onClick={addToFav} style={{ marginRight: '0.3rem' }} />
        <div className='food-card-details'>
          <h2>{title}</h2>
          <span>{calCount}</span>
          <span>Carbs: {carbs}</span>
          <span>Protein: {protein}</span>
          <span>Fat: {fat}</span>
        </div>
        <LoginButton style={{ marginTop: 'auto', marginBottom: '10px', width: '70%' }} onClick={visitRecipe(id)}>Lets Cook</LoginButton>
      </div>
    </div>

  )
}

export default FoodCard