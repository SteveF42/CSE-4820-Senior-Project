import { Alert, TextField } from '@mui/material'
import React, { useState } from 'react'
import './Register.css'
import lady from './happyLady.png'
import { Link, useNavigate } from 'react-router-dom'
import { LoginButton } from '../components/Buttons'
import axios from 'axios'
import { logIn } from '../hooks/useAuth'
import {motion as m } from 'framer-motion'


const Login = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [error, setError] = useState(false)
    const [errorText, setErrorText] = useState('')
    const navigate = useNavigate();
    const styleProps = { style: { height: '2.3rem', fontSize: '1.7rem', marginTop: '1rem' } }

    const registerUser = async (e) => {
        setHasSubmitted(true);
        const body = {
            username: name,
            email: email,
            password: password
        }

        try {

            const res = await axios.post('/api/v1/auth/register', body);
            logIn(res.data.accessToken, res.data.refreshToken)
            navigate('/')
        } catch (e) {
            setError(true)
            setErrorText(e.message)
        }
    }

    const animationStart = (e) => {
        document.getElementById('animated-left-side').classList.remove('left-side-hide')
    }

    return (
        <div className='register-container'>
            <m.div id='animated-left-side' className='register-left-side left-side-hide' animate={{className:'left-side-hide'}} onAnimationEnd={animationStart}>
                <div className='dysh-logo'>
                    <Link className='item-link' to='/'>D Y S H</Link>
                </div>

                <div className='left-form-information'>
                    <div style={{ display: error ? 'block' : 'none', width: '100%' }}>
                        <Alert severity='error' onClose={() => { setError(false) }}>{errorText}</Alert>
                    </div>
                    <div className='register-title'>
                        <h1>Create an Account</h1>
                        <p>Lets get started on making your best meals yet.</p>
                    </div>

                    <form className='register-form'>
                        <TextField className='form-input' inputProps={styleProps} placeholder='Name' variant='standard' onChange={(e) => { setName(e.target.value); setHasSubmitted(false) }}></TextField>
                        <TextField className='form-input' inputProps={styleProps} placeholder='Email' variant='standard' onChange={(e) => { setEmail(e.target.value); setHasSubmitted(false) }}></TextField>
                        <TextField className='form-input' inputProps={styleProps} placeholder='Password' variant='standard' type='password' onChange={(e) => { setPassword(e.target.value); setHasSubmitted(false) }}></TextField>
                        <label>
                            Already have an account? login <Link to='/login'> here </Link>
                        </label>

                        <div className='button-group'>
                            <LoginButton variant='contained' sx={{ height: '3rem' }} className='register-button' fullWidth={true} onClick={registerUser} disabled={hasSubmitted}>Register</LoginButton>
                        </div>

                    </form>
                </div>

            </m.div>

            <div className='register-right-side'>
                <div className='register-img'>
                    <img src={lady}></img>
                </div>
            </div>
        </div>
    )
}

export default Login