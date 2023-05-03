import React, { useState } from 'react'
import { Alert, TextField } from '@mui/material'
import { LoginButton } from '../components/Buttons'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { logIn } from '../hooks/useAuth'

const Login = () => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()
  const styleProps = { style: { height: '2.3rem', fontSize: '1.7rem', marginTop: '1rem' } }

  //sends request to log a user in
  const signIn = async (e) => {
    setHasSubmitted(true);
    const body = {
      email: name,
      password: password
    }
    try {
      const req = await axios.post('/api/v1/auth/login', body)
      axios.get('/api/v1/favorite', { headers: { Authorization: 'bearer ' + req.data.accessToken } }).then(res => {
        //store the id of the users favorites
        const idArr = res.data.favorite.map(x => x.recipe._id);
        window.localStorage.setItem('favorites', idArr);
      })
      if (req.status === 200) {
        logIn(req.data.accessToken, req.data.refreshToken)
        navigate('/')
      }
    } catch (e) {
      setError(true)
      setErrorMessage(e.message)
      console.log(e)
    }
  }

  return (
    <div className='login'>
      <div className='login-container'>
        <h1 className='login-title'><Link to='/' style={{ textDecoration: 'none', color: 'black' }}>D Y S H</Link></h1>

        <div className='login-information'>
          <h1>Sign In</h1>
          <div style={{ display: error ? 'block' : 'none', width: '100%' }}>
            <Alert severity='error' onClose={() => { setError(false) }}>{errorMessage}</Alert>
          </div>
          <div className='login-input-group'>
            <TextField autoComplete='false' className='login-form-input' inputProps={styleProps} placeholder='Username/email' variant='standard' onChange={(e) => { setName(e.target.value); setHasSubmitted(false) }}></TextField>
            <TextField autoComplete='false' className='login-form-input' inputProps={styleProps} placeholder='Password' variant='standard' type='password' onChange={(e) => { setPassword(e.target.value); setHasSubmitted(false) }}></TextField>
          </div>

          <LoginButton variant='contained' disabled={hasSubmitted} className='login-submit-button' sx={{ width: '100%', height: '2.5rem', marginTop: '2rem' }} onClick={signIn}>Sign in</LoginButton>
        </div>
      </div>
    </div>
  )
}

export default Login