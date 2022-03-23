import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { getCapturedPokemon } from "../management/CatchManager"
import "./Dex.css"

export const DexData = ({ confirmSelectedPoke, caughtObj }) => {
    const [isCaught, setIsCaught] = useState([])


    //caughtObj prop passed into dependency array so that setIsCaught state will populate/render/activate with useEffect. Pokemon data will not display othewise
    useEffect(
        () => {
            getCapturedPokemon().then(data => {
                const caughtPoke = data.filter(pokeData => {
                    return (pokeData.pokemon.id === caughtObj?.pokemon?.id && parseInt(localStorage.getItem("user_id"))=== pokeData.user.id)
                })
                setIsCaught(caughtPoke)
            })
        },[caughtObj])


    if (isCaught.length > 0) {
        return <>
            <div className="pokeInfo">
                <section className="pokeData">
                    <div>{confirmSelectedPoke.pokemon_kind}</div>
                    <div>{confirmSelectedPoke.name}</div>
                    <div>{confirmSelectedPoke.description}</div>
                    <div>{confirmSelectedPoke.standard_height}</div>
                    <div>{confirmSelectedPoke.standard_alpha_height}</div>
                    <div>{confirmSelectedPoke.standard_weight}</div>
                    <div>{confirmSelectedPoke.standard_alpha_weight}</div>
                    <div>{confirmSelectedPoke.poke_types.map(type => {
                        return (
                            <div>{type.poketype}</div>
                        )
                    })}</div>
                    <div>{confirmSelectedPoke.poke_items.map(item => {
                        return (
                            <div>{item.name}</div>
                        )
                    })}</div>


                </section>
            </div>
        </>
    } else {
        return null
    }
}