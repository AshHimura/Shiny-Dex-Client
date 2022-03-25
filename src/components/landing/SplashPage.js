import React, { useRef } from "react"
import { Link, useHistory } from "react-router-dom"
import "./SplashPage.css"
import flute from "../music/flute.mp3"

export const SplashPage = () => {
    const wind = useRef()
    const history = useHistory()

    const toTheDex = () => {
        history.push('/dexSelect')
    }

    const toSocials = () => {
        history.push('/socials')
    }

    const playS = () => {
        wind.current = new Audio(flute)
        wind.current.play()
        wind.current.volume = 0.45
        wind.current.loop = false
    }

    return (
        <>
            <div className="contained">
        <button className="btn_social" onClick={()=> {playS(); toSocials()}}>
                    Socials
                </button>
<br></br>
<br></br>
<br></br>
        <button className="btn_dex" onClick={()=> {playS(); toTheDex()}}>
                    ShinyDex
                </button>
            </div>
        </>
    )
}