import React, { useEffect, useState } from 'react'
import axios from 'axios'

// if the current key is invalid it refreshes the token
const refreshKey = async (refreshToken) => {
    try {
        const res = await axios.post('/api/v1/auth/refresh', {
            refreshToken: refreshToken
        })

        if (res.status === 200) {

            window.localStorage.setItem('refreshToken', res.data.refreshToken)
            window.localStorage.setItem('accessToken', res.data.accessToken)
            return res
        }
        return null
    } catch (e) {
        return e.response
    }
}
//attempts to verify current access key
const checkKey = async () => {
    const refreshToken = window.localStorage.getItem('refreshToken')
    const accessToken = window.localStorage.getItem('accessToken')
    try {
        const isValid = await axios.post('/api/v1/auth/valid', {
            refreshToken: refreshToken,
        }, {
            headers: {
                Authorization: 'Bearer ' + accessToken
            }
        });

        //if key is valid return it otherwise attempt to refresh the key
        if (isValid.status === 200) {
            return isValid
        } else {
            return await refreshKey(refreshToken)
        }

    } catch (e) {
        const refresh = await refreshKey(refreshToken)
        return refresh
    }
}

//remoes all items from localstorage and invalidates refresh token, accessToken will expire through time but it also cleared from localstorage
export const logOut = () => {

    const refreshToken = window.localStorage.getItem('refreshToken')
    const accessToken = window.localStorage.getItem('accessToken')

    window.localStorage.removeItem('accessToken')
    window.localStorage.removeItem('refreshToken')
    window.localStorage.removeItem('verified')

    try {
        axios.post('api/v1/auth/logout',
            {
                refreshToken: refreshToken
            },
            {
                headers: {
                    Authorization: 'Bearer ' + accessToken
                }
            }
        )
    }catch(e){
        console.log(e)
    }
}

const useAuth = (args) => {
    const [auth, setAuth] = useState(null);
    const [pending, setPending] = useState(true);
    const [error, setError] = useState(null);

    // runs when the URL changes within the protected routes section
    useEffect(() => {
        checkKey().then(res => {
            console.log(res)
            setPending(false)
            setAuth(res);

            if (res.status === 200) {
                window.localStorage.setItem('verified', true)
            }
        })
    }, [args])
    return { auth, pending, error }
}

export default useAuth