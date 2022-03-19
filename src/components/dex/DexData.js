import React, { useState, useEffect } from "react"
import "./Dex.css"

export const DexData = ({selectPoke}) => {
    
    return (
        <>
        <div className="pokeInfo">
            <section className="pokeData">
                <div>{selectPoke.pokemon_kind}</div>
                <div>{selectPoke.name}</div>
                <div>{selectPoke.description}</div>
                <div>{selectPoke.standard_height}</div>
                <div>{selectPoke.standard_alpha_height}</div>
                <div>{selectPoke.standard_weight}</div>
                <div>{selectPoke.standard_alpha_weight}</div>
                <div>{selectPoke.poke_types.map(type => {
                    return (
                        <div>{type.poketype}</div>
                    )
                })}</div>
                <div>{selectPoke.poke_items.map(item => {
                    return (
                        <div>{item.name}</div>
                    )
                })}</div>
            

            </section>
        </div>
        </>
    )
















}