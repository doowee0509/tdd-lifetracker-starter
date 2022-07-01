import * as React from "react"
import { useState } from "react"
import "./LoginForm.css"
import { Link, useNavigate } from "react-router-dom"
import apiClient from "../../services/apiClient"
import { useAuthContext } from "../../contexts/auth"

export default function LoginForm(props) {
    const [isLoading, setIsLoading] = useState(false)
    const {user, setUser, error, setError} = useAuthContext()

    const [form, setForm] = useState({
        email: "",
        password: "",
    })
    const navigate = useNavigate()

    React.useEffect(() => {
        // if user is already logged in,
        // redirect them to the home page
        
        if (user?.email) {
            navigate("/activity")
        }
    }, [user, navigate])

    const handleOnInputChange = (event) => {
        if (event.target.name === "email") {
            if (event.target.value.indexOf("@") < 1) {
                setError((e) => ({ ...e, email: "Please enter a valid email." }))
            } else {
                setError((e) => ({ ...e, email: null }))
            }
        }

        setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError((e) => ({ ...e, form: null }))
    
        const {data, error} = await apiClient.loginUser({
            email: form.email,
            password: form.password,
        })
        
        if (error) setError((e) => ({ ...e, form: error }))

        if (data?.user) {
            apiClient.setToken(data.token)
            setUser(data.user)
        }
        setIsLoading(false)
    }
    
    return (
        <div className="login-form">
            <div className="card">
                <h2>Login</h2>
                {(error?.form?.includes("AxiosError")) ? <span className="error">Invalid email/password</span> : null}
                {(props.link) ? <span className="error">You must be logged in to access that page</span> : null}
                <br />
                <div className="form">
                    <div className="input-field">
                        <label htmlFor="Email">Email</label>
                        <input type="email" name="email" placeholder="user@gmail.com" value={form.email} onChange={handleOnInputChange}/>
                        {(error?.email !== null && form.email !== "") ? <span className="error">Please enter a valid email.</span> : null}
                    </div>
                    <div className="input-field">
                        <label htmlFor="Password">Password</label>
                        <input type="password" name="password" placeholder="password" value={form.password} onChange={handleOnInputChange}/>
                    </div>
                    <button className="login-btn" disabled={isLoading} onClick={handleOnSubmit}>
                        {isLoading ? "Loading..." : "Login"}
                    </button>
                </div>
                <div className="footer">
                    <p>Don't have an account? Sign up
                        <Link className="here-link" to="/register"> here.</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}