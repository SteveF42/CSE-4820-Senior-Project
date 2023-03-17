import React from 'react'
import MainSearch from '../components/MainSearch'
import NavBar from '../components/NavBar'

const Meal = () => {
    return (
        <div>
            <NavBar />
            <div className='meal-search-area'>
                <MainSearch />
            </div>

            <div className='meal-details'>
                <div className='meal-title'>
                    <label>Main Course</label>
                    <h1>Seafood Pasta with White Wine</h1>

                    <div className='meal-rating'>
                        <label>4 out of 5</label>
                    </div>
                </div>

                <div className='meal-image'>
                    <img></img>
                </div>
            </div>
            <div className='right-menu'>
                <div className='meal-ingredients'>
                    <h1>What You'll need</h1>
                    <li>
                        <ul>ingredient</ul>
                        <ul>ingredient</ul>
                        <ul>ingredient</ul>
                        <ul>ingredient</ul>
                        <ul>ingredient</ul>
                    </li>
                </div>
                <div className='neutritional-Facts'>
                    <h1>Neutritional Facts</h1>
                    <ul>
                        <li>Fat</li>
                        <li>Calorie</li>
                        <li>Other</li>
                        <li>Other</li>
                        <li>Other</li>
                        <li>Other</li>
                        <li>Other</li>
                    </ul>
                </div>

                <div className='bottom-info'>
                    <p>something something fjsu es lore iuam siueh kskcvue</p>
                </div>
            </div>
        </div>
    )
}

export default Meal