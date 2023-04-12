import React, { useEffect, useState } from 'react'
import { CardRows } from '../components/CardRows'
import MainSearch from '../components/MainSearch';
import NavBar from '../components/NavBar';


const Favorites = () => {
  return (
    <div>
      <NavBar />

      <div className='history-search-container'>
        <MainSearch className='history-search' />
      </div>
      <div className='history-container'>
        <h1>Your Favorites</h1>
        <div className={`history-information`}>
        </div>
      </div>
    </div>
  )
}

export default Favorites