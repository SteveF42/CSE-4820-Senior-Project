import NavBar from '../components/NavBar'
import './HomeOLD.css'
import chicken from './chicken.png'
import { YellowButton } from '../components/dyshButton'
import MainSearch from '../components/MainSearch';
import { useNavigate } from 'react-router-dom'
import { motion as m } from 'framer-motion'

const HomeOLD = () => {
  const navigate = useNavigate();

  const startCooking = (e) => {
    navigate('/recipe')
  }

  const animate = (s) => {

    const val = {
      y: '0%',
        filter: 'blur(0)',
          opacity: 1,
            transition: {
        duration: 0.5,
          delay: 0.08 * s
      }
    }
    return val
  }
  const initial = {
    y: '-10%',
    filter: 'blur(5px)',
    opacity: 0,
  }

  return (
    <div className='home-container'>
      <NavBar />

      <div className='page-content-home'>
        <m.div className={`search-area home-delay`} initial={initial}
          animate={animate(0)}>
          <MainSearch />
        </m.div>
        <m.div className={`text-area home-delay`}
          initial={initial}
          animate={animate(1)}>
          <h1>Welcome to <b>D Y S H .</b></h1>
          <p>
            With <b>DYSH</b>, you can transform your fridge into a culinary treasure trove.
            You have the ingredients, we know the meal.
          </p>
        </m.div>
        <m.div className={`home-delay`} initial={initial} animate={animate(2)}>
          <YellowButton onClick={startCooking} size='large' variant='contained' style={{ 'borderRadius': '20px' }} sx={{ backgroundColor: '#FFA439' }}>Let's start cooking</YellowButton>
        </m.div>
        <m.div className={`img-container home-delay`} initial={initial} animate={animate(3)}>
          <img src={chicken}></img>
        </m.div>
      </div>
    </div>
  )
}

export default HomeOLD