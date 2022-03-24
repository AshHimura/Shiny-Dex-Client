import React from "react"
import { Route, Switch } from "react-router-dom"
import { CoronetHighlands } from "./dex/CorHigh"
import { HisuiRegion } from "./dex/Hisui"
import { MapSelect } from "./dex/MapSelect"
import { GenRoute } from "./GenRoute"
import { SplashPage } from "./landing/SplashPage"
import { NavBar } from "./nav/NavBar"
import { PostList } from "./post/PostList"
import { UpdatePost } from "./post/UpdatePost"
import { PostForm } from "./post/CreatePost"
import { CobaltCoastlands } from "./dex/CobCoast"
import { AlabasterIcelands } from "./dex/AlaIce"
import { CrimsonMirelands } from "./dex/CrimMire"
import { ObsidianFieldlands } from "./dex/ObsField"

export const ApplicationViews = () => {
    return <>
        <main >
            <Route exact path="/">
                <SplashPage />
            </Route>

            <Switch>

                <Route exact path="/socials">
                    <NavBar />
                    <PostList />
                </Route>

                <Route exact path="/dexSelect">
                    <NavBar />
                    <MapSelect />
                </Route>

                <Route exact path="/dexSelect/Coronet">
                    <NavBar />
                    <CoronetHighlands />
                </Route>
                
                <Route exact path="/dexSelect/Cobalt">
                    <NavBar />
                    <CobaltCoastlands />
                </Route>
                
                <Route exact path="/dexSelect/Alabaster">
                    <NavBar />
                    <AlabasterIcelands />
                </Route>
                
                <Route exact path="/dexSelect/Crimson">
                    <NavBar />
                    <CrimsonMirelands />
                </Route>
                
                <Route exact path="/dexSelect/Obsidian">
                    <NavBar />
                    <ObsidianFieldlands />
                </Route>

                <Route exact path="/dexSelect/Hisui">
                    <NavBar />
                    <HisuiRegion />
                </Route>

                <Route exact path="/socials">
                    <NavBar />
                    <PostList />
                </Route>

                <Route exact path="/socials/create">
                    <NavBar />
                    <PostForm />
                </Route>

                <Route exact path="/socials/:postId(\d+)/update">
                    <NavBar />
                    <UpdatePost />
                </Route>

            </Switch>

            <GenRoute />


        </main>
    </>
}
