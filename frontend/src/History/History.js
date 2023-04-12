import React, { useEffect, useState } from 'react'
import MainSearch from '../components/MainSearch'
import NavBar from '../components/NavBar'
import './History.css'
import { CardRows } from '../components/CardRows'
import useFetch from '../hooks/useFetch'
import axios from 'axios'

const History = () => {
  const [load, setLoad] = useState(true)
  const [history, setHistory] = useState([])
  const accessToken = window.localStorage.getItem('accessToken')

  const delay = 0.15; //ms
  useEffect(() => {
    axios.get('/api/v1/history', { headers: { Authorization: 'bearer ' + accessToken } }).then(res => {
      console.log(res.data)

      const recipeDates = [{}]
      let currentMonthYear = [null, null];
      let index = -1;
      for (let i of res.data.history) {
        let tempDate = new Date(i.lastModified)
        if (currentMonthYear[0] != tempDate.getMonth() || currentMonthYear[1] != tempDate.getFullYear()) {
          currentMonthYear[0] = tempDate.getMonth()
          currentMonthYear[1] = tempDate.getFullYear()
          index++;
          recipeDates[index] = {
            date: tempDate,
            recipes: []
          }
        }
        
        recipeDates[index].recipes.unshift(i.recipe)
      }
      console.log(recipeDates)
      setHistory(recipeDates)
    })
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
          {history.map((x, i) => {
            const delay = 0.2
            return (
              <CardRows key={i} date={x.date} recipes={x.recipes} totalDelay={i * delay} />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default History