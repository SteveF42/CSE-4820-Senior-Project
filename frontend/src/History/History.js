import React, { useEffect, useState } from 'react'
import MainSearch from '../components/MainSearch'
import NavBar from '../components/NavBar'
import './History.css'
import { CardRows } from '../components/CardRows'

const History = () => {
  const [load, setLoad] = useState(true)
  const delay = 100; //ms
  useEffect(() => {
    setLoad(false)
  }, [])

  return (
    <div>
      <NavBar />

      <div className='history-search-container'>
        <MainSearch className='history-search' />
      </div>
      <div className='history-container'>
        <h1>Your History</h1>
        <div className={`history-information`}>
          <CardRows date={'February 2023'} totalDelay={0}/>
          <CardRows date={'February 2023'} totalDelay={200}/>
        </div>
      </div>
    </div>
  )
}

export default History