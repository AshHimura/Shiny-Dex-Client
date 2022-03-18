import React from "react"
import { Route, Switch } from "react-router-dom"
import { CoronetHighlands } from "./dex/CorHigh"
import { HisuiRegion } from "./dex/Hisui"
import { MapSelect } from "./dex/MapSelect"
import { GenRoute } from "./GenRoute"
import { SplashPage } from "./landing/SplashPage"
import { NavBar } from "./nav/NavBar"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            backgroundColor: "lightgoldenrodyellow"
        }}>
            <Route exact path="/">
                <SplashPage />
            </Route>

            <Switch>
            <Route exact path="/dexSelect">
            <NavBar />
                <MapSelect />
            </Route>

            <Route exact path="/dexSelect/Coronet">
            <NavBar />
                <CoronetHighlands />
            </Route>

            <Route exact path="/dexSelect/Hisui">
            <NavBar />
                <HisuiRegion />
            </Route>
            
            <Route exact path="/socials">
                <MapSelect />
            </Route>

            </Switch>

            <GenRoute />


        </main>
    </>
}
