import React from 'react'
import FoodCard from '../components/FoodCard'
import MainSearch from '../components/MainSearch'
import NavBar from '../components/NavBar'
import './History.css'

const CardRows = ({ date, recipes }) => {

    return (
        <div className='card-row'>
            <span>
                {date}
            </span>
            <div className='row-recipes'>
                
            </div>
        </div>
    )
}


const History = () => {
    return (
        <div>
            <NavBar />
            <div className='history-search-container'>
                <MainSearch className='history-search' />
            </div>

            <div className='history-container'>
                <h1>Your History</h1>
                <div className='history-row'>

                </div>
            </div>
        </div>
    )
}

export default History