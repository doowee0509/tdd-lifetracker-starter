import * as React from "react"
import { useState } from "react"
import "./LoginForm.css"
import { Link } from "react-router-dom"

export default function LoginForm() {
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const [form, setForm] = useState({
        email: "",
        password: "",
    })

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

    const handleOnSubmit = () => {
        
    }
    return (
        <div className="login-form">
            <div className="card">
                <h2>Login</h2>
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
                    <input id="submit" type="submit" value="Login" className="login-btn" />
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