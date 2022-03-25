import React, { useEffect, useState } from "react"
import { getAlabasterPokemon } from "../management/DexManager"
import { DexData } from "./DexData"
import { getCapturedPokemon } from "../management/CatchManager"
import Modal from "../../Modal"
import { addCaughtPokemon } from '../management/CatchManager'

export const AlabasterIcelands = () => {
    const loggedUser = parseInt(localStorage.getItem("user_id"))
    //AlabasterPoke state holds array of all pokemon in the region from useEffect fetch
    const [AlabasterPoke, setAlabasterPoke] = useState([])

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
        is_shiny: true,
        is_alpha: false,
        user: loggedUser,
        pokemon: confirmSelectedPoke.id
    })

    useEffect(
        () => {
            getAlabasterPokemon().then(data => setAlabasterPoke(data))
                .then(getCapturedPokemon().then(data => setCaughtTable(data)))
        },
        [])

    const handleFindCatch = (evt) => {
        const pokeTable = caughtTable.find(mon => mon.pokemon.id === parseInt(evt.target.value) && loggedUser === mon?.user?.user )
        setCaughtObj(pokeTable)
    }
    
    const resetCatch = () => {
        getCapturedPokemon().then(data => {
            setCaughtTable(data)
            const pokeTable = data.find(mon => mon?.pokemon.id === confirmSelectedPoke.id && loggedUser === mon?.user?.user)
            setCaughtObj(pokeTable)
        })
        
    }

    const handleUserSelect = (evt) => {
        const view = AlabasterPoke.find(info => {
            return (info.id === parseInt(evt.target.value))
        })
        setConfirmSelectedPoke(view)
    }

    const compareAndStop = (evt) => {
        if (parseInt(evt.target.value) === caughtObj?.pokemon?.id && loggedUser === caughtObj?.user?.user) {
            return (
                <>
                    <DexData confirmSelectedPoke={confirmSelectedPoke} caughtObj={caughtObj} />  </>
            )
        } else {
            setOpenModal(true)
        }
    }

    const createCatch = () => {
        const capture = {
            is_shiny: catchPokemon.is_shiny,
            is_alpha: modalCheck,
            user: loggedUser,
            pokemon: confirmSelectedPoke.id
        }

        addCaughtPokemon(capture)
            .then((functionResponse) => resetCatch(functionResponse))

        setOpenModal(false)

    }
    
    return (
        <>
            {caughtObj?.pokemon?.id !== confirmSelectedPoke?.id && 
            loggedUser !== caughtObj?.user?.user ?
                (openModal ? <Modal closeModal={setOpenModal} createCatch={createCatch} compareAndStop={compareAndStop} 
                    modalCheck={modalCheck} setModalCheck={setModalCheck} /> : null) : <>
                    <DexData confirmSelectedPoke={confirmSelectedPoke} caughtObj={caughtObj} />  </>}
            <form className="alas">
                <h3 className="alas-pokename">
                    <select value={confirmSelectedPoke.id} id={AlabasterPoke.id} className="alas-names" onChange={(e) => { handleFindCatch(e); handleUserSelect(e); compareAndStop(e); }}>
                        <option value="" >Select a Pokemon</option>
                        {
                            AlabasterPoke.map(alabaster => {
                                return <option className="alasPokemon" key={alabaster.id} value={alabaster.id}>
                                    {alabaster.name}
                                </option>
                            })
                        }
                    </select>

                </h3>
            </form>

            <div className="whoDat">
            <img className="hiddenPoke" 
            style={{ width: "520px", height: "300px", 
            display: (confirmSelectedPoke?.id && 
                loggedUser === caughtObj?.user?.user ? 'none' : 'block') }} src={require("../images/hisui/pokeball-pre.png")} />

            <h3 style={{ display: (confirmSelectedPoke?.id && 
                loggedUser === caughtObj?.user?.user ? 'none' : 'block') }}>Who's that pokemon??</h3>
                </div>

        </>
    )
}