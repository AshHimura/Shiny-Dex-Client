import React, { useState, useEffect } from "react"
import { getCapturedPokemon, getCaughtInstance, updateCaught } from "../management/CatchManager"
import "./Dex.css"

export const DexData = ({ confirmSelectedPoke, caughtObj }) => {
    const [isCaught, setIsCaught] = useState([])
    const [checked, setChecked] = useState(false)

    const [choosingPoke, setChoosingPoke] = useState({
    })

    useEffect(() => {
        getCaughtInstance(caughtObj?.id).then(postCheck => setChoosingPoke({
            is_alpha: postCheck.is_alpha
        }))
    },[caughtObj?.id])

    const handleChange = (evt) => {
        const copy = {...caughtObj, pokemon: caughtObj.pokemon.id, user: caughtObj.user.id}
        copy["is_alpha"] = evt.target.checked
        updateCaught(copy, caughtObj.id)
        setChecked(!checked)       
    }

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
                    <div className="pokeData-kind">{confirmSelectedPoke.pokemon_kind}</div>
                    <div className="pokeData-name">{confirmSelectedPoke.name}</div>
                    <div className="pokeData-description">{confirmSelectedPoke.description}</div>
                    <div className="pokeData-height">{confirmSelectedPoke.standard_height} Ft.</div>
                    <div className="pokeData-aHeight">{confirmSelectedPoke.standard_alpha_height}Ft.</div>
                    <div className="pokeData-weight">{confirmSelectedPoke.standard_weight} Lbs.</div>
                    <div className="pokeData-aWeight">{confirmSelectedPoke.standard_alpha_weight} Lbs.</div>
                    <div className="pokeData-typeDiv">{confirmSelectedPoke.poke_types.map(type => {
                        return (
                            <div className="pokeData-type">{type.poketype}</div>
                        )
                    })}</div>
                    <div className="pokeData-itemDiv">{confirmSelectedPoke.poke_items.map(item => {
                        return (
                            <div className="pokeData-item">{item.name}</div>
                        )
                    })}</div>
                    <div className="pokeData-imageDiv">
                        <img className="pokeData-img" src={`http://localhost:8000${caughtObj.pokemon.poke_img}`}></img>
                    </div>
                </section>

                <div className="pokeData-AlphaDiv">
            <label className="pokeData-AlphaLabel">Alpha?</label>
            <input className="pokeData-AlphaCheck" 
            type="checkbox" 
            name="alpha_dexCheck" 
            onChange={(D)=> {handleChange(D); window.alert("Noice! Congrats on your shiny Alpha pokemon!")}} 
            checked={checked} disabled={caughtObj.alpha === true}  />
            </div>

            </div>
        </>
    } else {
        return null
    }
}