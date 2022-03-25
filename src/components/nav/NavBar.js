import React from "react"
import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const history = useHistory()
    return (
        <ul className="navbar">
            <Link to="/socials" className="navbar-social"> Socials </Link>
            <Link to="/dexSelect" className="navbar-shinedex"> ShinyDex </Link>

            {
                (localStorage.getItem("arc_token") !== null) ?
                    <li className="nav-item">
                        <button className="nav-link fakeLink"
                            onClick={() => {
                                localStorage.removeItem("arc_token")
                                localStorage.removeItem("user_id")
                                history.push({ pathname: "/" })
                            }}
                        >Logout</button>
                    </li> :
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </>
            }        </ul>
    )
}