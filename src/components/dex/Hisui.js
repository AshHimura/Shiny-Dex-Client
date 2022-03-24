import React, { useEffect, useState } from "react"
import { DexData } from "./DexData"
import { getCapturedPokemon } from "../management/CatchManager"
import Modal from "../../Modal"
import { addCaughtPokemon } from '../management/CatchManager'

export const HisuiRegion = () => {
    const loggedUser = parseInt(localStorage.getItem("user_id"))
    //HisuiPoke state holds array of all pokemon in the region from useEffect fetch
    const [HisuiPoke, setHisuiPoke] = useState([])

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
            getAllPokemon().then(data => setHisuiPoke(data))
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
        const view = HisuiPoke.find(info => {
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
            <form className="coro">
                <h3 className="coro-pokename">
                    <select value={confirmSelectedPoke.id} id={HisuiPoke.id} className="coro-names" onChange={(e) => { handleFindCatch(e); handleUserSelect(e); compareAndStop(e); }}>
                        <option value="" >Select a Pokemon</option>
                        {
                            HisuiPoke.map(hisui => {
                                return <option className="coroPokemon" key={hisui.id} value={hisui.id}>
                                    {hisui.name}
                                </option>
                            })
                        }
                    </select>

                </h3>
            </form>

            <img className="hiddenPoke" 
            style={{ width: "520px", height: "300px", 
            display: (confirmSelectedPoke?.id && 
                loggedUser === caughtObj?.user?.user ? 'none' : 'block') }} src={require("../images/hisui/pokeball-pre.png")} />

            <h3 style={{ display: (confirmSelectedPoke?.id && 
                loggedUser === caughtObj?.user?.user ? 'none' : 'block') }}>Who's that pokemon??</h3>


        </>
    )
}