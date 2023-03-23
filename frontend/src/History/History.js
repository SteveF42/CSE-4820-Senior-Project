import React, { useEffect, useState } from 'react'
import FoodCard from '../components/FoodCard'
import MainSearch from '../components/MainSearch'
import NavBar from '../components/NavBar'
import chicken from './plate.png'
import './History.css'

const CardRows = ({ date, recipes, totalDelay, ...props }) => {
  let delay = 100; //ms
  const cards = []
  const [load, setLoad] = useState(true)

  useEffect(() => {
    setLoad(false)
  }, [])

  for (let i = 0; i < 6; i++) {
    cards.push(
      <FoodCard style={{ transitionDelay:((delay*i)+totalDelay) +'ms'}} key={i} className={`history-row-item ${load ? 'history-hidden' : 'history-show'}`} img={chicken} calCount='232' title="Chicken Risotto" />
    )
  }

  return (
    <div className={`history-date ${load ? 'hidden' : 'show'}`} {...props}>
      <h3 style={{ textAlign: 'center' }}>
        {date}
      </h3>
      <div className='history-row'>
        {cards}
      </div>
    </div>
  )
}


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
          <CardRows date={'February 2023'} style={{ transitionDelay: '0ms' }} />
          <CardRows date={'February 2023'} style={{ transitionDelay: '200ms' }} totalDelay={200}/>
        </div>
      </div>
    </div>
  )
}

export default History