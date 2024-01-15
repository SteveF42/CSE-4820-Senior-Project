import React, { useState } from 'react'
import './RegisterV2.css'
import food from './food.png'
import { Alert, TextField } from '@mui/material'
import './Register.css'
import { Link, useNavigate } from 'react-router-dom'
import { LoginButton } from '../components/Buttons'
import axios from 'axios'
import { logIn } from '../hooks/useAuth'

const RegisterV2 = () => {
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



    return (
        <div className='register-page'>
            {/* <div className='dysh-logo' style={{fontSize:'2rem'}}>
                <Link className='item-link' to='/'>D Y S H</Link>
            </div> */}
            <div className='register-left'>
                <div className='bg-shape bg-blue' style={{ right: -50, top: -40, width: '100%' }}></div>
                <div className='bg-shape bg-other-blue' style={{ bottom: -40, left: -30, width: '100%' }}></div>
                <Link to='/' style={{ textDecoration: 'none', color: 'black' }}>
                    <h1>D Y S H .</h1>
                </Link>
                <h3 style={{ fontWeight: 400 }}>Unlock your fridge.</h3>
                <div style={{ width: '100%' }}>
                    <img src={food}></img>
                </div>
            </div>
            <div className='register-right'>

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
            </div>
        </div>
    )
}

export default RegisterV2