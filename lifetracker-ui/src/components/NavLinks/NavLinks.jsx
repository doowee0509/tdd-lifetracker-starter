import * as React from "react"
import "./NavLinks.css"
import { Link, useNavigate} from "react-router-dom"

export default function NavLinks(props) {
    console.log(props)
    const navigate = useNavigate()
    
    const handleOnLogout = () => {
        props.setAuth(false)
        navigate("/")
    }
    return (
            <ul className="nav-links">
                <Link to="/activity"><li>Activity</li></Link>
                <Link to="/exercise"><li>Exercise</li></Link>
                <Link to="/nutrition"><li>Nutrition</li></Link>
                <Link to="/sleep"><li>Sleep</li></Link>
                {!props.auth ? <Link className="navbar-btn" to="/login"><li>Login</li></Link> : null}
                {!props.auth ? null : <li className="navbar-btn" onClick={handleOnLogout}>Logout</li>}
                {!props.auth ? <Link className="navbar-btn" to="/register"><li>Register</li></Link> : null}
            </ul>
    )
}