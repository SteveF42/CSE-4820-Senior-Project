import { useEffect, useState } from 'react'
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
            window.localStorage.setItem('verified', Date.now() + 1000 * 60 * 60 * 1)
        }
        return res
    } catch (e) {
        return e.response
    }
}
//attempts to verify current access key
const checkKey = async () => {
    const refreshToken = window.localStorage.getItem('refreshToken')
    const accessToken = window.localStorage.getItem('accessToken')
    const verifiedCache = window.localStorage.getItem('verified')
    if (!refreshToken || !accessToken) {
        return null
    }

    //check cache
    if (parseInt(verifiedCache) >= Date.now()) {
        return {
            status: 200,
            message: 'cache read'
        }
    }

    //if cache is expired
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
            const res = await refreshKey(refreshToken)
            return res
        }

    } catch (e) {
        const res = await refreshKey(refreshToken)
        return res
    }

    return null
}

//remoes all items from localstorage and invalidates refresh token, accessToken will expire through time but it also cleared from localstorage
export const logOut = () => {

    const refreshToken = window.localStorage.getItem('refreshToken')
    const accessToken = window.localStorage.getItem('accessToken')


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
        window.localStorage.clear()
    } catch (e) {
        console.log(e)
    }
}

export const logIn = (accessToken, refreshToken) => {
    window.localStorage.setItem('accessToken', accessToken)
    window.localStorage.setItem('refreshToken', refreshToken)
    window.localStorage.setItem('verified', Date.now() + 1000 * 60 * 60 * 1)
}

const useAuth = (args) => {
    const [auth, setAuth] = useState(null);
    const [pending, setPending] = useState(true);
    const [error, setError] = useState(null);

    // runs when the URL changes within the protected routes section
    useEffect(() => {
        checkKey().then(res => {
            console.log(res)
            setAuth(res);
            setPending(false)

        })
    }, [args])
    return { auth, pending, error }
}

export default useAuth