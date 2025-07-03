import { useContext, useEffect, useState } from "react"
import { AuthContext } from '../../App';
import { Course } from '../../components/courses.jsx';
export const UserDashboard= () => {
    let { username } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await fetch('http://localhost:3000/api/v1/course');
                if (!response.ok) throw new Error('Failed to fetch data');
                const data = await response.json();
                setData(data)
                console.log(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false)
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1>Hii, {username}</h1>
            {loading && 'loading...'}
            {error && error.message}
            {data && (
                <div>
                    {data.map((course) => {
                        <Course course={ course } />
                    })}
                </div>
            )}
        </div>
    )
}