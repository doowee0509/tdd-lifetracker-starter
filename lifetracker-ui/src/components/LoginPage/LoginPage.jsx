import * as React from "react"
import { useState, useEffect } from "react"
import { Link , useNavigate} from "react-router-dom"
import LoginForm from "../LoginForm/LoginForm"
import Redirect from "react"


export default function LoginPage(){
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/activity")
        }
    }, [isLoggedIn, navigate])
    return (
        <LoginForm/>
    )
}