import React, { useRef } from "react"
import { Link, useHistory } from "react-router-dom"
import "./SplashPage.css"

export const SplashPage = () => {

    const history = useHistory()

    const toTheDex = () => {
        history.push('/dexSelect')
    }

    const toSocials = () => {
        history.push('/socials')
    }

    return (
        <>
            <div className="contained">
        <button className="btn_social" onClick={toSocials}>
                    Socials
                </button>

        <button className="btn_dex" onClick={toTheDex}>
                    ShinyDex
                </button>
            </div>
        </>
    )
}