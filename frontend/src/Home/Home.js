import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import './Home.css'
import chicken from './chicken.png'
import { YellowButton } from '../components/dyshButton'
import MainSearch from '../components/MainSearch';
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoad(true)
    return ()=>{
      setLoad(false)
    }
  }, [])

  const startCooking = (e) => {
    navigate('/recipe')
  }

  return (
    <div className='home-container'>
      <NavBar />

      <div className='page-content-home'>
        <div className={`search-area home-delay ${load ? 'show' : 'hidden'}`}>
          <MainSearch />
        </div>
        <div className={`text-area home-delay ${load ? 'show' : 'hidden'}`}>
          <h1>Welcome to <b>D Y S H</b></h1>
          <p>
            With <b>DYSH</b>, you can transform your fridge into a culinary treasure trove.
            You have the ingredients, we know the meal.
          </p>
        </div>
        <div className={`home-delay ${load ? 'show' : 'hidden'}`}>
          <YellowButton onClick={startCooking} size='large' variant='contained' style={{ 'borderRadius': '20px' }} sx={{ backgroundColor: '#FFA439' }}>Let's start cooking</YellowButton>
        </div>
        <div className={`img-container home-delay ${load ? 'show' : 'hidden'}`}>
          <img src={chicken}></img>
        </div>
      </div>
    </div >
  )
}

export default Home