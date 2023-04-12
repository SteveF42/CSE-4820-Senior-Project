import React, { useEffect } from 'react'
import MainSearch from '../components/MainSearch'
import NavBar from '../components/NavBar'
import useFetch from '../hooks/useFetch'
import './Meal.css'
import star from './reviewStar.png'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import useAuth from '../hooks/useAuth'

const Meal = () => {
    const { recipeId } = useParams()
    const { auth, error: authError, pending } = useAuth()

    //adds item to user history if they are logged in
    useEffect(() => {
        if (auth?.status === 200) {
            const accessToken = window.localStorage.getItem('accessToken')
            try {

                axios.post('/api/v1/history', { recipeID: recipeId }, {
                    headers: {
                        Authorization: 'bearer ' + accessToken
                    }
                })
            }catch(e){
                console.log(e)
            }
        }
    }, [auth])



    const { data, error, isPending } = useFetch(`/api/v1/recipe/search?recipeID=${recipeId}`)
    const recipe = !isPending ? data.menu[0] : null

    const starCount = []
    for (let j = 0; j < recipe?.ratings?.toFixed(0); j++) {
        starCount.push(<img key={j} src={star}></img>)
    }

    return (
        <div>
            <NavBar />
            <div className='container-grid'>
                <div className='meal-left-side'>
                    <div className='meal-search-area'>
                        <div className="meal-search" >
                            <MainSearch />
                        </div>
                    </div>
                    <div className='meal-details'>
                        <div className='meal-title'>
                            <label>{recipe?.category}</label>
                            <h1>{recipe?.title}</h1>

                            <div className='meal-rating'>
                                {starCount}
                                {recipe?.ratings &&
                                    <label>{recipe?.ratings.toFixed(0)} out of 5</label>
                                }
                            </div>
                        </div>

                        <div className='meal-image'>
                            <img src={recipe?.image}></img>
                        </div>
                    </div>
                    <div className='meal-cooking-instructions'>
                        <h1>Method</h1>
                        <ol>
                            {recipe?.instructions_list.map((x, i) => {
                                return (<li key={i}>{x}</li>)
                            })}
                        </ol>
                    </div>
                </div>
                <div className='meal-right-side '>
                    <div className='meal-ingredients'>
                        <h1>What you'll need...</h1>
                        <ul>
                            {recipe?.ingredients.map((x, i) => {
                                return (<li key={i}>{x}</li>)
                            })}
                        </ul>
                    </div>
                    <div className='neutritional-Facts'>
                        <h1>Neutritional Facts</h1>
                        <ul>
                            {
                                !isPending && Object.keys(recipe?.nutrients).map((x, i) => {
                                    return (<li key={i}>{x}: {recipe?.nutrients[x]}</li>)
                                })
                            }
                        </ul>
                    </div>

                    <div className='bottom-info'>
                        <span style={{ display: 'block' }}>Cooking time: {recipe?.totla_time}</span>
                        <span style={{ display: 'block' }}>Serving size: {recipe?.yields}</span>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Meal