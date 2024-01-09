import NavBar from '../components/NavBar'
import "./Home.css"
import homeMeal from './home-meal.png'
import { YellowButton } from '../components/dyshButton'
import { useNavigate } from 'react-router-dom'
import { motion as m } from 'framer-motion'

const Home = () => {
    const navigate = useNavigate();
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
    const startCooking = (e) => {
        navigate('/recipe')
    }


    return (
        <div className='home-container'>
            <NavBar />
            <div className='home-content'>
                <m.div animate={animate(0)} initial={initial}>
                    <h1>Welcome to D Y S H .</h1>
                    <h3>Saving food starts from your fridge. With <strong>DYSH</strong>, you can transform your fridge into a culinary treasure trove. You have the ingredients, we know the meal.</h3>
                </m.div>
                <m.div animate={animate(1)} initial={initial}>
                    <YellowButton onClick={startCooking} className='home-button' size='large' variant='contained' style={{ 'borderRadius': '20px' }} sx={{ backgroundColor: '#AFD4E9' }}>Let's start cooking</YellowButton>
                </m.div>
                <m.div animate={animate(2)} initial={initial} className='home-food'>
                    <img src={homeMeal}></img>
                </m.div>
            </div>
        </div>
    )
}

export default Home;