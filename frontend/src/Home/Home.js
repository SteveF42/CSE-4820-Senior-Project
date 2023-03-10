import React from 'react'
import NavBar from '../components/NavBar'
import './Home.css'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import chicken from './chicken.png'

const Home = () => {
  return (
    <div>
      <NavBar />

      <div className='page-content-home'>
        <div className='search-area'>
          <TextField sx={{width:'100%'}} id="outlined-basic" label="Search Recipes" variant='outlined' />
        </div>
        <div className='text-area'>
          <h1>Welcome to <b>D Y S H</b></h1>
          <p>
            With <b>DYSH</b>, you can transform your fridge into a culinary treasure trove.
            You have the ingredients, we know the meal.
          </p>
        </div>
        <Button variant='contained' style={{ 'borderRadius': '20px' }} sx={{ backgroundColor: '#FFA439' }}>Let's start cooking</Button>
        <img src={chicken}></img>
      </div>
    </div>
  )
}

export default Home