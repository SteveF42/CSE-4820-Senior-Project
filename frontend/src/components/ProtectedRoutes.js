
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'


const ProtectedRoutes = () => {
    const location = useLocation()
    const { auth, pending, error} = useAuth(location.pathname)

    if (!pending) {
        return auth?.status == 200 ? <Outlet /> : <Navigate to='/register' replace/>
    }
}

export default ProtectedRoutes