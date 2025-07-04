import { useContext } from 'react';
import { AuthContext } from '../App';

export const Logout = () => {
    let { setAuthContext } = useContext(AuthContext);
    return (
        <div>
            <span>
                want to logout?
            </span>
            <button onClick={() => {
                localStorage.removeItem('loggedUser')
                setAuthContext({isAuth: false, loggedInAs: '', token: '', username: ''})
            }}>Logout</button>
        </div>
    )
}