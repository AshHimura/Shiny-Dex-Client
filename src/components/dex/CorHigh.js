import React, { useEffect, useState } from "react"
import { getCoronetPokemon } from "../management/DexManager"
import { DexData } from "./DexData"
import { getCapturedPokemon } from "../management/CatchManager"
import Modal from "../../Modal"
import { addCaughtPokemon } from '../management/CatchManager'

export const CoronetHighlands = () => {

    //CoronetPoke state holds array of all pokemon in the region from useEffect fetch
    const [CoronetPoke, setCoronetPoke] = useState([])

    //caughtTable state holds array of all pokemon already caught, set in useEffect
    const [caughtTable, setCaughtTable] = useState([])

    //sets caughtObj as an object for grabbing instance of caught Pokemon obj
    const [caughtObj, setCaughtObj] = useState({})

    //confirmSelectedPoke holds object of selected pokemon in list, set in handleUserSelect
    const [confirmSelectedPoke, setConfirmSelectedPoke] = useState({})

    //modalState - if false, Modal will not appear
    const [openModal, setOpenModal] = useState(false)

    const [modalCheck, setModalCheck] = useState(false)

    //catchPokemon - empty object to set new pokemon in caughtTable array. Method will be passed to
    const [catchPokemon, setCatchPokemon] = useState({
        is_shiny: false,
        is_alpha: false,
        user: parseInt(localStorage.getItem('user_id')),
        pokemon: confirmSelectedPoke.id
    })

    useEffect(
        () => {
            getCoronetPokemon().then(data => setCoronetPoke(data))
                .then(getCapturedPokemon().then(data => setCaughtTable(data)))
        },
        [])

    const handleFindCatch = (evt) => {
        const pokeTable = caughtTable.find(mon => mon.pokemon.id === parseInt(evt.target.value))
        console.log(pokeTable)
        setCaughtObj(pokeTable)
    }
    
    const resetCatch = (pkmn) => {
        getCapturedPokemon().then(data => {
            setCaughtTable(data)
            const pokeTable = data.find(mon => mon.pokemon.id === pkmn.pokemon)
            setCaughtObj(pokeTable)
        })
        
    }

    const handleUserSelect = (evt) => {
        const view = CoronetPoke.find(info => {
            return (info.id === parseInt(evt.target.value))
        })
        setConfirmSelectedPoke(view)
    }

    const compareAndStop = (evt) => {
        if (parseInt(evt.target.value) === caughtObj?.pokemon?.id) {
            return (
                <>
                    <DexData confirmSelectedPoke={confirmSelectedPoke} caughtObj={caughtObj} />  </>
            )
        } else {
            setOpenModal(true)

            return (
                <>
                    <img className="hiddenPoke" style={{ width: "520px", height: "300px", display: (confirmSelectedPoke?.id === caughtObj?.pokemon?.id ? 'none' : 'block') }} src={require("../images/hisui/pokeball-pre.png")} />
                    <h3>Who's That Pokemon???</h3>
                </>
            )
        }
    }

    const createCatch = () => {
        const capture = {
            is_shiny: catchPokemon.is_shiny,
            is_alpha: modalCheck,
            user: catchPokemon.user,
            pokemon: confirmSelectedPoke.id
        }

        addCaughtPokemon(capture)
            .then((functionResponse) => resetCatch(functionResponse))

        setOpenModal(false)

        return (
            <>
                <DexData confirmSelectedPoke={confirmSelectedPoke} caughtObj={caughtObj} />  </>
        )
    }
    
    return (
        <>
            {caughtObj?.pokemon?.id !== confirmSelectedPoke.id ?
                (openModal ? <Modal closeModal={setOpenModal} createCatch={createCatch} compareAndStop={compareAndStop} 
                    modalCheck={modalCheck} setModalCheck={setModalCheck} /> : null) : <>
                    <DexData confirmSelectedPoke={confirmSelectedPoke} caughtObj={caughtObj} />  </>}
            <form className="coro">
                <h3 className="coro-pokename">
                    <select value={confirmSelectedPoke.id} id={CoronetPoke.id} className="coro-names" onChange={(e) => { handleFindCatch(e); handleUserSelect(e); compareAndStop(e); }}>
                        <option value="" >Select a Pokemon</option>
                        {
                            CoronetPoke.map(coronet => {
                                return <option className="coroPokemon" key={coronet.id} value={coronet.id}>
                                    {coronet.name}
                                </option>
                            })
                        }
                    </select>

                </h3>
            </form>

            <img className="hiddenPoke" style={{ width: "520px", height: "300px", display: (caughtObj?.pokemon?.id ? 'none' : 'block') }} src={require("../images/hisui/pokeball-pre.png")} />

            <h3 style={{ display: (caughtObj?.pokemon?.id ? 'none' : 'block') }}>Who's that pokemon??</h3>


        </>
    )
}