import React, { useEffect, useState } from "react";
import { getAllPokemon, getAllItems, getAllTypes, getAllRegions, addPokemon } from "../management/DexManager";

export const PokeGenerator = () => {
    const [regions, setRegions] = useState([])
    const [types, setTypes] = useState([])
    const [items, setItems] = useState([])
    const [pkmn, setPkmn] = useState([])
    const [selectedRegions, setSelectedRegions] = useState([])
    const [selectedTypes, setSelectedTypes] = useState([])
    const [selectedItems, setSelectedItems] = useState([])
    const [selectedShiny, setSelectedShiny] = useState(false)
    const [selectedAlpha, setSelectedAlpha] = useState(false)

    const [poke, setPoke] = useState({
        name: "",
        pokemon_kind: "",
        description: "",
        standard_height: "",
        standard_alpha_height: "",
        standard_weight: "",
        standard_alpha_weight: "",
        is_shiny: false,
        is_alpha: false,
        home_regions: [],
        poke_types: [],
        poke_items: []
    })

    useEffect(() => {
        getAllRegions().then(regions => setRegions(regions))
    }, [])
    useEffect(() => {
        getAllTypes().then(types => setTypes(types))
    }, [])
    useEffect(() => {
        getAllItems().then(items => setItems(items))
    }, [])
    useEffect(() => {
        getAllPokemon().then(pokemon => setPkmn(pokemon))
    }, [])

        const changePokemonState = (domEvent) => {
            const copy = { ...poke }
            if (domEvent.target.name === "home_regions") { 
                if (domEvent.target.checked === true){
                    const copyregions = [ ...selectedRegions ]
                    copyregions.push(parseInt(domEvent.target.value))
                    setSelectedRegions(copyregions) 
                }else if (domEvent.target.checked === false){
                    const copyregions = [ ...selectedRegions ]
                    const regionIndex = copyregions.indexOf(parseInt(domEvent.target.value))
                    copyregions.splice(regionIndex, 1) 
                    setSelectedRegions(copyregions)
                }
            }
            else if (domEvent.target.name === "poke_items") { 
                if (domEvent.target.checked === true){
                    const copyitems = [ ...selectedItems ]
                    copyitems.push(parseInt(domEvent.target.value))
                    setSelectedItems(copyitems) 
                }else if (domEvent.target.checked === false){
                    const copyitems = [ ...selectedItems ]
                    const itemIndex = copyitems.indexOf(parseInt(domEvent.target.value))
                    copyitems.splice(itemIndex, 1) 
                    setSelectedItems(copyitems)
                }
            }
            else if (domEvent.target.name === "poke_types") { 
                if (domEvent.target.checked === true){
                    const copytypes = [ ...selectedTypes ]
                    copytypes.push(parseInt(domEvent.target.value))
                    setSelectedTypes(copytypes) 
                }else if (domEvent.target.checked === false){
                    const copytypes = [ ...selectedTypes ]
                    const typeIndex = copytypes.indexOf(parseInt(domEvent.target.value))
                    copytypes.splice(typeIndex, 1) 
                    setSelectedTypes(copytypes)
                }
            }
            else if (domEvent.target.name === "is_shiny") {
            setSelectedShiny(!selectedShiny)
            }
            else if (domEvent.target.name === "is_alpha") {
            setSelectedAlpha(!selectedAlpha)
            }
            else {
                let ki = domEvent.target.name
            copy[ki] = domEvent.target.value
            setPoke(copy)
                }
        }



        return (
            <>


                <h2 className="newpkmn_title">Add a pokemon to the hisui dex!</h2>

                <form className="pokePostForm">
                    <label>Name:</label><input name="name" value={poke.name} onChange={changePokemonState} />
                    <br></br>
                    <label>Pokemon Kind:</label><input name="pokemon_kind" value={poke.pokemon_kind} onChange={changePokemonState} />
                    <br></br>
                    <label>Description:</label><textarea name="description" value={poke.description} onChange={changePokemonState} />
                    <br></br>
                    <label>Standard Height:</label><input name="standard_height" value={poke.standard_height} onChange={changePokemonState} />
                    <br></br>
                    <label>Standard Alpha Height:</label><input name="standard_alpha_height" value={poke.standard_alpha_height} onChange={changePokemonState} />
                    <br></br>
                    <label>Standard Weight:</label><input name="standard_weight" value={poke.standard_weight} onChange={changePokemonState} />
                    <br></br>
                    <label>Standard Alpha Weight:</label><input name="standard_alpha_weight" value={poke.standard_alpha_weight} onChange={changePokemonState} />
                    <br></br>
                    <label>Shiny?</label><input type="checkbox" name="is_shiny" value={poke.is_shiny} onChange={changePokemonState} checked={selectedShiny} />
                    <br></br>
                    <label>Alpha?</label><input type="checkbox" name="is_alpha" value={poke.is_alpha} onChange={changePokemonState} checked={selectedAlpha}/>
                    <br></br>

                    <label>Region:</label>
                    {regions.map((region) => {
                        return (
                            <div>
                                <input onChange={changePokemonState} type="checkbox" name="home_regions" key={`region--${region.id}`} value={region.id}></input>
                                {region.name}
                            </div>
                        )
                    })
                    }
                    <br></br>
                    <br></br>

                    <div className="horizontal">
                        <label htmlFor="poketype">Type:
                            {
                                types.map((type) => {
                                    return (
                                        <div>

                                        <input onChange={changePokemonState} type="checkbox" name="poke_types" key={`type--${type.id}`} value={type.id}></input>
                                            {type.poketype}
                                        </div>
                                    )
                                })
                            }
                            </label>
                    </div>


                    {/* <select name="poke_types" multiple onChange={changePokemonState} value={poke.poke_types}>{types.map(type => (
                    <option value={type.id}>{type.poketype}</option>
                ))}</select> */}

                    <br></br>
                    <br></br>

                    <label>Item:
                        {items.map(item => {
                            return (
                                <div>
                                <input onChange={changePokemonState} type="checkbox" name="poke_items" key={`item--${item.id}`} value={item.id}></input>
                                {item.name}
                                </div>
                            )
                        })
                    }
                            </label>
                </form>

                <button type="submit"
                    onClick={evt => {
                        // Prevent form from being submitted
                        evt.preventDefault()

                        const pokemon = {
                            name: poke.name,
                            pokemon_kind: poke.pokemon_kind,
                            description: poke.description,
                            standard_height: poke.standard_height,
                            standard_alpha_height: poke.standard_alpha_height,
                            standard_weight: poke.standard_weight,
                            standard_alpha_weight: poke.standard_alpha_weight,
                            is_shiny: selectedShiny,
                            is_alpha: selectedAlpha,
                            home_regions: selectedRegions,
                            poke_types: selectedTypes,
                            poke_items: selectedItems
                        }

                        // Send POST request to your API
                        addPokemon(pokemon)
                            .then(res => res.json())
                            .then((data) => history.go(`/PokeGenerator`))
                    }}
                    className="btn btn-primary">Save Item</button>

                    <h3>Check out what pokemon are already in the dex!</h3>
                    {
                        pkmn.map(pokemon => {
                            return <div key={pokemon.id}>{pokemon.name}</div>
                        })}
            </>
        )
    }
