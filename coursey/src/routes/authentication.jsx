import { useContext, useEffect } from "react"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { AuthContext } from "../App";
export const Authentication = () => {
    let { isAuth, loggedInAs } = useContext(AuthContext);
    let navigate = useNavigate();
    useEffect(() => {
        if (isAuth) {
            if (loggedInAs === 'admin') navigate('/admin')
            else navigate('/user')
        }
    },[isAuth])
    
    return (
        <div>
        <h2>Hii! Choose One!</h2>
            <Link to={'/login/admin'} >Admin</Link>
            <br />
            <Link to={'/login/user'}>User</Link>
            <Outlet />
        </div>
    )
}