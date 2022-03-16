import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { ShinyDex } from "./components/ShinyDex.js"
import "./index.css"

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <ShinyDex />
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
)
