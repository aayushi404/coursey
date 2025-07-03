import { useContext, useEffect } from "react"
import { AuthContext } from '../../App';

export const AdminDashboard = () => {
    let { username } = useContext(AuthContext);
    useEffect(async () => {
        try {
            let response = await fetch('http://localhost:3000/api/v1/course')
            if (!response.ok) throw Error();
            console.log(response)
        } catch (err) {
            return err
        }
    },[])
    return (
        <h1>Hii, {username}</h1>
    )
}