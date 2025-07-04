import { useContext, useEffect } from "react"
import { Outlet } from "react-router-dom";
import { AuthContext } from '../../App';
import { Header } from '../../components/header.jsx';
import { Footer } from '../../components/footer.jsx';

export const AdminDashboard = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
   ) 
}