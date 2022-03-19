import React from "react"
import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const history = useHistory()
    return (
        <ul className="navbar">
            <Link to="/socials" className="navbar-item">Socials</Link>
            <Link to="/dexSelect" className="navbar-item">ShinyDex</Link>

            {
                (localStorage.getItem("arc_token") !== null) ?
                    <li className="nav-item">
                        <button className="nav-link fakeLink"
                            onClick={() => {
                                localStorage.removeItem("arc_token")
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

// import React, { useRef } from "react"
// import { Link, useHistory } from "react-router-dom"
// import "./NavBar.css"
// import Logo from "./hisui-sym.jpeg"

// export const NavBar = ({ token, setToken }) => {
//     const history = useHistory()
//     const navbar = useRef()
//     const hamburger = useRef()

//     const showMobileNavbar = () => {
//         hamburger.current.classList.toggle('is-active')
//         navbar.current.classList.toggle('is-active')
//     }

//     return (
//         <nav className="navbar is-success mb-3" role="navigation" aria-label="main navigation">
//             <div className="navbar-brand">
//                 <a className="navbar-item" href="/">
//                 <img src={Logo} height="3rem" /> <h1 className="title is-4">Arc Publishing</h1>
//                 </a>

//                 <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={showMobileNavbar} ref={hamburger}>
//                     <span aria-hidden="true"></span>
//                     <span aria-hidden="true"></span>
//                     <span aria-hidden="true"></span>
//                 </a>
//             </div>

//             <div className="navbar-menu" ref={navbar}>
//                 <div className="navbar-start">
//                     {
//                         token
//                             ?
//                             <Link to="/socials" className="navbar-item">Socials</Link>
//                             :
//                             ""
//                     },
//                     {
//                         token
//                             ?
//                             <Link to="/dexSelect" className="navbar-item">ShinyDex</Link>
//                             :
//                             ""
//                     }
//                 </div>

//                 <div className="navbar-end">
//                     <div className="navbar-item">
//                         <div className="buttons">
//                             {
//                                 token
//                                     ?
//                                     <button className="button is-outlined" onClick={() => {
//                                         setToken('')
//                                         history.push('/login')
//                                     }}>Logout</button>
//                                     :
//                                     <>
//                                         <Link to="/register" className="button is-link">Register</Link>
//                                         <Link to="/login" className="button is-outlined">Login</Link>
//                                     </>
//                             }
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </nav>
//     )
// }
