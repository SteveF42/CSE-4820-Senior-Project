import React from 'react'
import NavBar from '../components/NavBar'
import './Home.css'
import Button from '@mui/material/Button'
import chicken from './chicken.png'
import SearchIcon from '@mui/icons-material/Search';
import { TextFieldMain } from '../components/dyshText'
import { YellowButton } from '../components/dyshButton'

const Home = () => {
  return (
    <div className='home-container'>
      <NavBar />

      <div className='page-content-home'>
        <div className='search-area'>
          <TextFieldMain 
            
            sx={{width:'100%'}}
            label={
              <>
                <SearchIcon className='searchLabel' sx={{color:'grey','paddingRight':'8px'}}/>
                Search Recipe
              </>
            }
            />
        </div>
        <div className='text-area'>
          <h1>Welcome to <b>D Y S H</b></h1>
          <p>
            With <b>DYSH</b>, you can transform your fridge into a culinary treasure trove.
            You have the ingredients, we know the meal.
          </p>
        </div>
        <YellowButton variant='contained' style={{ 'borderRadius': '20px' }} sx={{ backgroundColor: '#FFA439' }}>Let's start cooking</YellowButton>
        <div className='img-container'>
          <img src={chicken}></img>
        </div>
      </div>
    </div >
  )
}

export default Home