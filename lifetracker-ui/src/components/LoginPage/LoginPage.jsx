import * as React from "react"
import { useState, useEffect } from "react"
import { Link , useNavigate, useLocation} from "react-router-dom"
import LoginForm from "../LoginForm/LoginForm"
import Redirect from "react"


export default function LoginPage(props){
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (props.auth) {
            const link = location?.state?.link ? location?.state?.link : "/activity"
            navigate(link)
        }
    }, [props.auth, navigate])

    return (
        <LoginForm auth={props.auth} setAuth={props.setAuth} link={location?.state?.link}/>
    )
}