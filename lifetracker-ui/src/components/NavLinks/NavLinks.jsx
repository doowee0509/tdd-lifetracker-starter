import * as React from "react"
import "./NavLinks.css"
import { Link, useNavigate} from "react-router-dom"
import { useAuthContext } from "../../contexts/auth"


export default function NavLinks(props) {
    const navigate = useNavigate()
    const {user} = useAuthContext()
    
    return (
            <ul className="nav-links">
                <Link to="/activity"><li>Activity</li></Link>
                <Link to="/exercise"><li>Exercise</li></Link>
                <Link to="/nutrition"><li>Nutrition</li></Link>
                <Link to="/sleep"><li>Sleep</li></Link>
                {user?.email ? null : <Link className="navbar-btn" to="/login"><li>Login</li></Link>}
                {user?.email ? <li className="navbar-btn" onClick={props.handleLogout}>Logout</li> : null}
                {user?.email ? null : <Link className="navbar-btn" to="/register"><li>Register</li></Link>}
            </ul>
    )
}