import * as React from "react"
import "./Navbar.css"
import { Link } from "react-router-dom"
import NavLinks from "../NavLinks/NavLinks"

export default function Navbar(props) {
    return (
        <nav className="navbar">
            <div className="content">
                <Logo />
                <NavLinks auth={props.auth} setAuth={props.setAuth}/>
            </div>
        </nav>
    )
}

export function Logo(){
    return(
        <div className="logo">
            <Link to="/"><img className="logo-img" src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/wfsonfv0p92plryzwijf" alt="Logo Picture" /></Link>
        </div>
    )
}
