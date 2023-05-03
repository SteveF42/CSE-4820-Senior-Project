import React, { useEffect, useState } from 'react'
import MainSearch from '../components/MainSearch';
import NavBar from '../components/NavBar';
import { motion as m } from 'framer-motion'
import axios from 'axios';
import FoodCard from '../components/FoodCard';


const Favorites = () => {
  const [history, setHistory] = useState([])
  const accessToken = window.localStorage.getItem('accessToken')


  const delay = 0.15; //ms
  useEffect(() => {
    axios.get('/api/v1/favorite', { headers: { Authorization: 'bearer ' + accessToken } }).then(res => {
      console.log(res)

      //store the id of the users favorites
      const idArr = res.data.favorite.map(x=>x.recipe._id);
      window.localStorage.setItem('favorites',idArr);
      initializeCards(res.data)
    })
  }, [])

  const initializeCards = (data) => {
    const recipeArr = []
    const delay = 200
    data.favorite.forEach((x, i) => {
      recipeArr.push(
        <m.div key={x.recipe._id} initial={{ opacity: 0, x: 100, filter: 'blur(3px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0)', transition: { duration: 0.5, delay: i * 0.03 } }}
          transition={{ duration: 0.3, delay: 0.8, opacity: 0 }}>
          <FoodCard style={{ width: 'auto' }} calCount={x?.recipe?.nutrients?.calories} img={x?.recipe?.image} title={x?.recipe.title} id={x?.recipe._id} clicked={true}/>
        </m.div>
      )
    })

    setHistory(recipeArr)
    return recipeArr
  }

  return (
    <div>
      <NavBar />

      <div className='history-search-container'>
        <MainSearch className='history-search' />
      </div>
      <div className='history-container'>
        <h1>Your Favorites</h1>
        <div className={`history-information`} style={{display:'grid', gap:'1rem'}}>
          {history}
        </div>
      </div>
    </div>
  )
}

export default Favorites