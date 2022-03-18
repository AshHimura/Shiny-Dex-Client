import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getPokemon } from "../management/DexManager";

export const HisuiRegion = () => {
    const [AllPokemon, setAllPokemon] = useState([])

    useEffect (
        () => {
            getAllPokemon().then(data => setAllPokemon(data))
        }, [])

        return (
            <>
            <div>

            <section className="hisui">
                <h3 className="hisui-pokename">
                    {
                    AllPokemon.map(pokemon => {
                        return <div key={pokemon.id}>
                            {pokemon.name}
                        </div>
                    })
                    }
                </h3>
            </section>

            </div>

            </>









        )
}