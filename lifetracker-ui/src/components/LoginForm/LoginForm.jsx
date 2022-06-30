import * as React from "react"
import { useState } from "react"
import "./LoginForm.css"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

export default function LoginForm(props) {
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const [form, setForm] = useState({
        email: "",
        password: "",
    })
    const navigate = useNavigate()


    const handleOnInputChange = (event) => {
        if (event.target.name === "email") {
            if (event.target.value.indexOf("@") < 1) {
                setErrors((e) => ({ ...e, email: "Please enter a valid email." }))
            } else {
                setErrors((e) => ({ ...e, email: null }))
            }
        }

        setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setErrors((e) => ({ ...e, form: null }))
    
        try {
            const res = await axios.post(`http://localhost:3001/auth/login`, form)
            if (res?.data) {
                setIsLoading(false)
                props.setAuth(true)
                navigate("/activity")
            } else {
                setErrors((e) => ({ ...e, form: "Invalid username/password combination" }))
                setIsLoading(false)
            }
        } catch (err) {
            const message = err?.response?.data?.error?.message
            setErrors((e) => ({ ...e, form: message ? String(message) : String(err) }))
            console.log(errors)
            setIsLoading(false)
        }
    }
    
    return (
        <div className="login-form">
            <div className="card">
                <h2>Login</h2>
                {(errors.form?.includes("AxiosError")) ? <span className="error">Invalid email/password</span> : null}
                {(props.link) ? <span className="error">You must be logged in to access that page</span> : null}
                <br />
                <div className="form">
                    <div className="input-field">
                        <label htmlFor="Email">Email</label>
                        <input type="email" name="email" placeholder="user@gmail.com" value={form.email} onChange={handleOnInputChange}/>
                        {(errors.email !== null && form.email !== "") ? <span className="error">Please enter a valid email.</span> : null}
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