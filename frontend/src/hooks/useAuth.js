import React, { useEffect, useState } from 'react'

const useAuth = () => {
    const [auth, setAuth] = useState(null);
    const [pending, setPending] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {

        fetch('/api/v1/auth/valid',{
            method:'POST',
            headers:{
                Authorization: 'Bearer ' + "token"
            },
            body:{
                refreshToken:'refresh token'
            }
        
        }).then(res=>{
            setPending(false);
            setAuth(res.status === 200 ? true : false);
        }).catch(err=>{
            setError(err)
        })
    }, [])
    return {auth, pending,error}
}

export default useAuth