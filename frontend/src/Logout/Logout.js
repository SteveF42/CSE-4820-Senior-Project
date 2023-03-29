import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { logOut } from '../hooks/useAuth'

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
      logOut()
      navigate('/',{replace:true})
    
    },[])

    return <></>
}

export default Logout