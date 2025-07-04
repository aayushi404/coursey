import { useContext, useState } from "react"
import { AuthContext } from "../../App"
import { useNavigate } from "react-router-dom";

export const AddCourse = () => {
    let navigate = useNavigate()
    const [{ title, description, duration, price }, setFormState] = useState({
        title:'', description:'', price:0 , duration:0
    })
    const { token } = useContext(AuthContext);
    async function handleSubmit(e) {
        e.preventDefault()
        const body = { title, description, duration, price };
        try {
            let response = await fetch('http://localhost:3000/api/v1/course', {
                method: 'POST',
                headers: {
                    'content-type': "application/json",
                    'autherization': `Bearer ${token}`
                },
                mode: 'cors',
                body: JSON.stringify(body)
            })
            if (!response.ok) throw Error('server Error');
            if (response.status === 200) navigate('/admin')
        } catch (err) {
            alert(err.message)
            navigate('/admin')
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title:</label>
                <input
                    type="text" id="title" name="title" placeholder="Enter Title of the course"
                    autoFocus
                    value={title}
                    onChange={(e) => setFormState((prev) => ({...prev, title: e.target.value}))}
                />
                <label htmlFor="description">Description:</label>
                <input
                    type="text" id="description" name="description" placeholder="Enter description of the course"
                    value={description}
                    onChange={(e) => setFormState((prev) => ({...prev, description: e.target.value}))}
                />
                <label htmlFor="duration">Duration:
                <input
                    type="number" id="duration" name="duration" min='1' max='12'
                    value={duration}
                    onChange={(e) => setFormState((prev) => ({...prev, duration: e.target.value}))}
                />Months
                </label>
                <label htmlFor="price">Price:
                <input
                    type="number" id="price" name="price" 
                    value={price}
                    onChange={(e) => setFormState((prev) => ({...prev, price: e.target.value}))}
                />Rs
                </label> 
            </form>
        </div>
    )
}