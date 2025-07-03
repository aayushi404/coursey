import { useState, useContext } from "react";
import { Form, useParams, Link, redirect } from "react-router-dom"
import { AuthContext } from "../App";

/*export const action = async ({ request, params }) => {
    let formData = await request.formData();
    let { setAuthState } = useContext(AuthContext);
    let body = { email: formData.get('email'), password: formData.get('password') };
    let response = await fetch(`http://0.0.0.0:3000/api/v1/${params.authr}/login`, {
        method: "POST",
        mode:'cors',
        headers:{'content-type':'application/json'},
        body: JSON.stringify(body),
        credentials:"include"
    });
    let responseData = await response.json();
    if (response.status !== 200) {
        alert(responseData.message);
        return redirect(`/login/${params.authr}`);
    }
    const loggeduser = { 'token': responseData.token, loggedInAs: params.authr, isAuth: true, username: responseData.username };
    localStorage.setItem("loggedUser", JSON.stringify(loggeduser));
    setAuthState(loggeduser)
    return redirect(`/${params.authr}`);
}
*/
export const Login = () => {
    const { setAuthState, username } = useContext(AuthContext); // Access the context
    const params = useParams();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (event) => {
        event.preventDefault();

        let response = await fetch(`http://localhost:3000/api/v1/${params.authr}/login`, {
            method: "POST",
            mode: "cors",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ email, password }),
            credentials: "include",
        });
        let responseData = await response.json();
        console.log(responseData);
        if (response.status === 200) {
            const loggedUser = {
                token: responseData.token,
                loggedInAs: params.authr,
                isAuth: true,
                username: responseData.username,
            };
            localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
            setAuthState(loggedUser);
            console.log(username);
            window.location.href = `/${params.authr}`;
        } else {
            alert(responseData.message);
        }
    };

    return (
        <div>
            <form onSubmit={handleLogin}>
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    placeholder="abc@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
            <span>New user? <Link to={`/signUp/${params.authr}`}>signUp</Link></span>
        </div>
    );
};