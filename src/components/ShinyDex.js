import React, {useState} from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"


export const ShinyDex = () => {
    // const [token, setTokenState] = useState(localStorage.getItem('arc_token'))

    // const setToken = (newToken) => {
    //     localStorage.setItem('arc_token', newToken)
    //     setTokenState(newToken)
    //   }
    
      return <>
        <Route render={() => {
            if (localStorage.getItem("arc_token")) {
                return <>
                    <Route>
                        <ApplicationViews />
                    </Route>
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route exact path="/login">
           
            <Login />
        </Route>

        <Route exact path="/register">
            
            <Register />
        </Route>

    </>
}
