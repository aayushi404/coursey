import { useState } from "react";
import { Form, useParams, Link, redirect } from "react-router-dom"

export const signUpAction = async ({ request, params }) => {
    let formData = await request.formData();
    let body = {
        firstname: formData.get('firstname'),
        lastname: formData.get('lastname'),
        email: formData.get('email'),
        password: formData.get('password')
    };
    let response = await fetch(`http://0.0.0.0:3000/api/v1/${params.authr}/signUp`, {
        method: "POST",
        mode:'cors',
        headers:{'content-type':'application/json'},
        body: JSON.stringify(body),
        credentials:"include"
    });
    let responseData = await response.json();
    console.log(response.status)
    console.log(responseData.message)
    if (response.status === 200) {
        // Redirect to login page on success
        return redirect(`/login/${params.authr}`);
    } else {
        // Handle error (e.g., show an alert or redirect back to signup)
        alert(responseData.message);
        return redirect(`/signUp/${params.authr}`);
    }
}

export const SignUp = () => {
    let params = useParams();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname , setLastname] = useState("")
    return (
        <div>
            <Form action={`/signUp/${params.authr}`} method="post">
                <label htmlFor="firstname">FirstName: </label>
                <input
                    type="text" id="firstname" name="firstname" placeholder="Enter Your First Name" autoFocus
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                
                />
                <label htmlFor="lastname">Lastname: </label>
                <input
                    type="text" id="lastname" name="lastname" placeholder="Enter Your Last Name" 
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                
                />
                <label htmlFor="email">Email</label>
                <input
                    type="text" id="email" name="email" placeholder="abc@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" placeholder="12***89"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Submit</button>
            </Form>
            <span>Already have an account?<Link to={`/login/${params.authr}`}>SignUp</Link></span>
        </div>
    )
}