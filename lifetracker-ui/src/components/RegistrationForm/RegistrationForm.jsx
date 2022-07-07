import * as React from "react"
import { useState } from "react"
import "./RegistrationForm.css"
import { Link, useNavigate } from "react-router-dom"
import apiClient from "../../services/apiClient"
import { useAuthContext } from "../../contexts/auth"

export default function RegistrationForm() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const {user, setUser, error, setError} = useAuthContext()
    const [form, setForm] = useState({
        email: "",
        username: "",
        first_name: "",
        last_name: "",
        password: "",
        confirm_password: ""
    })

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
        if (event.target.name === "password") {
            if (event.target.value !== form.confirm_password) {
                setError((e) => ({ ...e, confirm_password: "Password do not match." }))
            } else {
                setError((e) => ({ ...e, confirm_password: null }))
            }
        }
        if (event.target.name === "confirm_password") {
            if (event.target.value !== form.password) {
                setError((e) => ({ ...e, confirm_password: "Password do not match." }))
            } else {
                setError((e) => ({ ...e, confirm_password: null }))
            }
        }

        setForm((f) => ({ ...f, [event.target.name]: event.target.value }))
    }
    
    const handleOnSubmit = async () => {
        setIsLoading(true)
        setError((e) => ({ ...e, form: null }))
        
        if (form.passwordConfirm === "") {
            return
        }

        const {data, error} = await apiClient.signupUser({
                    first_name: form.first_name,
                    last_name: form.last_name,
                    email: form.email,
                    password: form.password,
                    username: form.username
                })
                
        if (error) setError((e) => ({ ...e, form: error }))
        if (data?.user) {
            apiClient.setToken(data.token)
            setUser(data?.user)
            navigate("/activity")
        }
        
        setIsLoading(false)
        // try {
        //     const res = await axios.post("http://localhost:3001/auth/register", {
        //         first_name: form.first_name,
        //         last_name: form.last_name,
        //         email: form.email,
        //         password: form.password,
        //         username: form.username
        //     })
    
        //     if (res?.data?.user) {
        //         setIsLoading(false)
        //         props.setAuth(true)
        //         navigate("/activity")
        //     } else {
        //         setError((e) => ({ ...e, form: "Something went wrong with registration" }))
        //         setIsLoading(false)
        //     }
        // } catch (err) {
        //     const message = err?.response?.data?.error?.message
        //     setError((e) => ({ ...e, form: message ? String(message) : String(err) }))
        //     setIsLoading(false)
        // }
    }

    return (
        <div className="registration-form">
            <div className="card">
                <h2>Register</h2>
                {(error?.form) ? <span className="error">{error?.form}</span> : null}
                <br />
                <div className="form">
                    <div className="input-field">
                        <label htmlFor="Email">Email</label>
                        <input type="email" name="email" placeholder="user@gmail.com" value={form.email} onChange={handleOnInputChange}/>
                        {(error?.email !== null && form.email !== "") ? <span className="error">Please enter a valid email.</span> : null}
                    </div>
                    <div className="input-field">
                        <label htmlFor="Username">Username</label>
                        <input type="text" name="username" placeholder="username" value={form.username} onChange={handleOnInputChange}/>
                    </div>
                    <div className="split-input-field">
                        <div className="input-field">
                            <input type="text" name="first_name" placeholder="First Name" value={form.first_name} onChange={handleOnInputChange}/>
                        </div><div className="input-field">
                            <input type="text" name="last_name" placeholder="Last Name" value={form.last_name} onChange={handleOnInputChange}/>
                        </div>
                    </div>
                    <div className="input-field">
                        <label htmlFor="Password">Password</label>
                        <input type="password" name="password" placeholder="password" value={form.password} onChange={handleOnInputChange}/>
                    </div>
                    <div className="input-field">
                        <label htmlFor="Password">Confirm Password</label>
                        <input type="password" name="confirm_password" placeholder="password" value={form.confirm_password} onChange={handleOnInputChange}/>
                        {(error?.confirm_password !== null && form.confirm_password !== "")  ? <span className="error">Password do not match.</span> : null}
                    </div>
                    <button className="login-btn" disabled={isLoading} onClick={handleOnSubmit}>
                        {isLoading ? "Loading..." : "Register"}
                    </button>
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