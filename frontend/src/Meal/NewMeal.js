import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import './NewMeal.css'
import { useParams } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useFetch from '../hooks/useFetch'
import star from './reviewStar.png'
import { Pill } from './Pill'
import axios from 'axios'


const NewMeal = () => {
  const { recipeId } = useParams()
  const { auth, error: authError, pending } = useAuth()
  const { data, error, isPending } = useFetch(`/api/v1/recipe/search?recipeID=${recipeId}`)
  const recipe = !isPending ? data.menu[0] : null

  const starCount = []
  for (let j = 0; j < recipe?.ratings?.toFixed(0); j++) {
    starCount.push(<img key={j} src={star}></img>)
  }
  //adds item to user history if they are logged in
  useEffect(() => {
    if (auth?.status === 200) {
      const accessToken = window.localStorage.getItem('accessToken')
      try {

        axios.post('/api/v1/history', { recipeID: recipeId }, {
          headers: {
            Authorization: 'bearer ' + accessToken
          }
        })
      } catch (e) {
        console.log(e)
      }
    }
  }, [auth])


  return (
    <div className='meal-container'>
      <NavBar />

      <div className='meal-content'>
        <div className='meal-top'>
          <div className='meal-image'>
            <img src={recipe?.image}></img>
          </div>

          <div className='meal-title'>
            <div>
              <h2>{recipe?.category}</h2>
              <h1>{recipe?.title}</h1>

              <div className='meal-rating'>
                {starCount}
                {recipe?.ratings &&
                  <label>{recipe?.ratings.toFixed(0)} out of 5</label>
                }
              </div>
            </div>
          </div>
        </div>


        <div className='meal-bottom'>
          <div className='meal-phone'>
            <div>
              <span className="dot dot1"></span>
              <span className="dot dot2"></span>
              <h1>What you'll need</h1>
              <ul>
                {recipe?.ingredients.map((x, i) => {
                  return (<li key={i}>{x}</li>)
                })}
              </ul>
            </div>
          </div>
          <div className='meal-bottom-inner'>
            <h1>Meal Description: </h1>
            <div className='nutritional-info'>
              <Pill calories={recipe?.nutrients.calories.split(' ')[0]} label={'Calories'} />
              <Pill calories={recipe?.nutrients.fatContent.split(' ')[0]} label={'Fat'} />
              <Pill calories={recipe?.nutrients.proteinContent.split(' ')[0]} label={'Protein'} />
              <Pill calories={recipe?.nutrients.carbohydrateContent.split(' ')[0]} label={'Carbs'} />
              <Pill calories={recipe?.nutrients.sugarContent.split(' ')[0]} label={'Sugar'} />
              <Pill calories={recipe?.nutrients.sodiumContent.split(' ')[0]} label={'Sodium'} />
            </div>

            <h1>Method: </h1>
            <div className='meal-ingredients'>
              <ol>
                {recipe?.instructions_list.map((x, i) => {
                  return (<h2 key={i} style={{ fontWeight: '200' }}><li>{x}</li></h2>)
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default NewMeal