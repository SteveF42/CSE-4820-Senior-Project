import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import MainSearch from '../components/MainSearch'
import './Recipe.css'
import FoodCard from '../components/FoodCard'
import { Pagination } from '@mui/material'
import { useSearchParams } from 'react-router-dom'
import { motion as m } from 'framer-motion'
import axios from 'axios'

const Recipe = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const itemsPerPage = 12;
  const ingredients = searchParams.get('ingredients')
  const [pageNum, setPageNum] = useState(1)
  const [pageCount, setPageCount] = useState(1)

  const [recipeCards, setRecipeCards] = useState([])

  useEffect(() => {
    setPageNum(1)
    fetchData(0).then((items) => {
      setRecipeCards([items])
    })
  }, [searchParams])

  const fetchData = async (index) => {
    console.log(index, 'fetching data')
    const URL = `/api/v1/recipe/search?ingredients=${ingredients}&count=${itemsPerPage}&skip=${(index) * itemsPerPage}`
    const res = await axios.get(URL)
    setPageCount(Math.ceil(res.data.maxCount / itemsPerPage))
    const foodCards = initializeCards(res.data)
    return foodCards
  }

  const initializeCards = (data) => {
    const recipeArr = []
    const delay = 200
    data.menu.forEach((x, i) => {
      recipeArr.push(
        <m.div key={x._id} initial={{ opacity: 0, x: 100, filter: 'blur(3px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0)', transition: { duration: 0.5, delay: i * 0.03 } }}
          transition={{ duration: 0.3, delay: 0.8, opacity: 0 }}>
          <FoodCard style={{ width: 'auto' }} calCount={x.nutrients?.calories} img={x.image} title={x.title} id={x._id} />
        </m.div>
      )
    })
    return recipeArr
  }

  const changePage = (event, value) => {
    setPageNum(value)
    if (recipeCards[value - 1] == undefined) {
      fetchData(value - 1).then(items => {
        recipeCards[value - 1] = items
        setRecipeCards([...recipeCards])
      })
    } else {
      console.log('reading cache')
    }
  }


  return (
    <div>
      <NavBar />
      <div className='recipe-container'>
        <MainSearch className='recipe-search' />

        <div className='recipe-information'>
          <h1 className='recipe-title'>DYSH for you</h1>

          <div className='display-recipe-card'>
            <div className='recipe-grid'>
              {recipeCards[pageNum - 1]}
            </div>
            <div className='pagination-stuff'>
              <Pagination size='large' color='primary' count={pageCount} onChange={changePage} page={pageNum} />
            </div>
          </div>
        </div>

      </div>
    </div >
  )
}



export default Recipe