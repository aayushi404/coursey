import { useState } from "react"
import { Outlet, useParams } from "react-router-dom"

export const AdminCourse = () => {
    let params = useParams()
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = fetch(`http://localhost:3000/api/v1/course/${params.courseId}`)
                if (!response.ok) throw Error("Server Not responded")
                const data = await response.json()
                setData(data)
                setError(null)
            } catch (err) {
                setError(err)
                setData(null)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])
    return (
        <div>
            {loading && 'loading...'}
            {error && error.message}
            {data && (
                <div>
                    <h1>{data.title}</h1>
                    <p>{data.description}</p>
                    <Outlet />
                </div>
            )}
        </div>

    )
}