import React from "react"
import { Route } from "react-router-dom"
import { ItemGen } from "./gen/ItemGen"
import { PokeGenerator } from "./gen/PokeGen"


export const GenRoute = () => {
    return <>
    <Route exact path="/PokeGenerator">
            <h1>Wait, how did you find this?</h1>
        <PokeGenerator/>
    </Route>

    <Route exact path="/ItemGenerator">
        <h1>Wait, how did you find this?</h1>
        <ItemGen/>
    </Route>
    
    
    
    
    
    </>
}