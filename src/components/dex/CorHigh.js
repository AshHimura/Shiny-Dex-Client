import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getCoronetPokemon } from "../management/DexManager"


export const CoronetHighlands = () => {
    const [CoronetPoke, setCoronetPoke] = useState([])

    useEffect (
        () => {
            getCoronetPokemon().then(data => setCoronetPoke(data))
        },
        [])

        return (
            <>
            <section className="coro">
                <h3 className="coro-pokename">
                    {
                        CoronetPoke.map(coronet => {
                            return <div key={coronet.id}>
                                {coronet.name}
                                </div>
                        })
                    }
                </h3>
            </section>


            </>









        )
}