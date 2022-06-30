import * as React from "react"
import { useState } from "react"
import "./RegistrationForm.css"
import { Link } from "react-router-dom"

export default function RegistrationForm() {
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState({})
    const [form, setForm] = useState({
        email: "",
        username: "",
        first_name: "",
        last_name: "",
        password: "",
        confirm_password: ""
    })

    const handleOnInputChange = (event) => {
        if (event.target.name === "email") {
            if (event.target.value.indexOf("@") < 1) {
                setErrors((e) => ({ ...e, email: "Please enter a valid email." }))
            } else {
                setErrors((e) => ({ ...e, email: null }))
            }
        }
        if (event.target.name === "password") {
            if (event.target.value !== form.confirm_password) {
                setErrors((e) => ({ ...e, confirm_password: "Password do not match." }))
            } else {
                setErrors((e) => ({ ...e, confirm_password: null }))
            }
        }
        if (event.target.name === "confirm_password") {
            if (event.target.value !== form.password) {
                setErrors((e) => ({ ...e, confirm_password: "Password do not match." }))
            } else {
                setErrors((e) => ({ ...e, confirm_password: null }))
            }
        }

        setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
    }
    
    return (
        <div className="registration-form">
            <div className="card">
                <h2>Register</h2>
                <br />
                <div className="form">
                    <div className="input-field">
                        <label htmlFor="Email">Email</label>
                        <input type="email" name="email" placeholder="user@gmail.com" value={form.email} onChange={handleOnInputChange}/>
                        {(errors.email !== null && form.email !== "") ? <span className="error">Please enter a valid email.</span> : null}
                    </div>
                    <div className="input-field">
                        <label htmlFor="Username">Username</label>
                        <input type="text" name="username" placeholder="username" value={form.username} onChange={handleOnInputChange}/>
                    </div>
                    <div className="split-input-field">
                        <div className="input-field">
                            <input type="text" name="firstName" placeholder="First Name" value={form.first_name} onChange={handleOnInputChange}/>
                        </div><div className="input-field">
                            <input type="text" name="lastName" placeholder="Last Name" value={form.last_name} onChange={handleOnInputChange}/>
                        </div>
                    </div>
                    <div className="input-field">
                        <label htmlFor="Password">Password</label>
                        <input type="password" name="password" placeholder="password" value={form.password} onChange={handleOnInputChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="Password">Confirm Password</label>
                        <input type="password" name="confirm_password" placeholder="password" value={form.confirm_password} onChange={handleOnInputChange}/>
                        {(errors.confirm_password !== null && form.confirm_password !== "")  ? <span className="error">Password do not match.</span> : null}
                    </div>
                    <input id="submit" type="submit" value="Create Account" className="login-btn" />
                </div>
                <div className="footer">
                    <p>Already have an account? Sign in
                        <Link className="here-link" to="/login"> here.</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}