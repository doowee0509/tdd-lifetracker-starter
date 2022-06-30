import * as React from "react"
import "./NavLinks.css"
import { Link, useNavigate} from "react-router-dom"

export default function NavLinks() {
    const bool = true;
    const navigate = useNavigate()
    
    const handleOnLogout = () => {
        navigate("/")
    }
    return (
            <ul className="nav-links">
                <Link to="/activity"><li>Activity</li></Link>
                <Link to="/exercise"><li>Exercise</li></Link>
                <Link to="/nutrition"><li>Nutrition</li></Link>
                <Link to="/sleep"><li>Sleep</li></Link>
                {bool ? <Link className="navbar-btn" to="/login"><li>Login</li></Link> : null}
                {bool ? null : <li className="navbar-btn" onClick={()=> handleOnLogout}>Logout</li>}
                {bool ? <Link className="navbar-btn" to="/register"><li>Register</li></Link> : null}
            </ul>
    )
}