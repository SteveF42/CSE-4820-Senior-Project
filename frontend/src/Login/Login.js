import { Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './Login.css'
import lady from './happyLady.png'
import { Link } from 'react-router-dom'

const Login = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showLeft, setShowLeft] = useState(false)
    const styleProps = { style: { height: '2.3rem', fontSize: '1.7rem',marginTop:'1rem'} }

    useEffect(() => {
      setShowLeft(true);
    }, [])
    

    return (
        <div className='register-container'>
            <div className={showLeft ? 'register-left-side' : 'register-left-side left-side-hide'}>
                <div className='dysh-logo'>
                    <Link className='item-link' to='/'>D Y S H</Link>
                </div>

                <div className='left-form-information'>
                    <div className='register-title'>
                        <h1>Create an Account</h1>
                        <p>Lets get started on making your best meals yet.</p>
                    </div>

                    <form onSubmit="#" className='register-form'>
                        <TextField className='form-input' inputProps={styleProps} placeholder='Name' variant='standard' onChange={(e) => setName(e.target.value)}></TextField>
                        <TextField className='form-input' inputProps={styleProps} placeholder='Email' variant='standard' onChange={(e) => setEmail(e.target.value)}></TextField>
                        <TextField className='form-input' inputProps={styleProps} placeholder='Password' variant='standard' onChange={(e) => setPassword(e.target.value)}></TextField>
                        <label>
                            Already have an account? login <Link> here </Link>
                        </label>

                        <div className='button-group'>
                            <Button variant='contained' sx={{ height: '3rem', background: '#41597E' }} className='register-button' fullWidth='true'>Register</Button>
                        </div>

                    </form>
                </div>

            </div>

            <div className='register-right-side'>
                <div className='register-img'>
                    <img src={lady}></img>
                </div>
            </div>
        </div>
    )
}

export default Login