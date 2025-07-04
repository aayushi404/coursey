import { useContext, useEffect } from "react"
import { Outlet } from "react-router-dom";
import { AuthContext } from '../../App';
import Header from '../../components/header'
import Footer from '../../components/footer'

export const AdminDashboard = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
   ) 
}