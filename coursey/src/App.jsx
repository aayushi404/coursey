import { createContext, useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
export const AuthContext = createContext();
const loggedIn = JSON.parse(localStorage.getItem('loggedUser'));
function App() {
    const [{ token, loggedInAs, isAuth, username }, setAuthState] = useState(loggedIn || {
        token: '', loggedInAs: '', isAuth: false, username: ''
    });
    return (
        <AuthContext.Provider value={{token, loggedInAs, isAuth, username, setAuthState}}>
            <Outlet />
        </AuthContext.Provider>
    )
}

export default App
