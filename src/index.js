import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter } from "react-router-dom"
import { ShinyDex } from "./components/ShinyDex.js"
import "./index.css"

ReactDOM.render(
    <BrowserRouter>
        <ShinyDex />
    </BrowserRouter>,
    document.getElementById("root")
)
