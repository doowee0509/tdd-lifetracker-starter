import * as React from "react"
import { useState, useEffect } from "react"
import { Link , useNavigate} from "react-router-dom"
import RegistrationForm from "../RegistrationForm/RegistrationForm"
import Redirect from "react"


export default function RegistrationPage(props){
    const navigate = useNavigate()

    useEffect(() => {
        if (props.auth) {
            navigate("/activity")
        }
    }, [props.auth, navigate])
    return (
        <RegistrationForm  auth={props.auth} setAuth={props.setAuth}/>
    )
}