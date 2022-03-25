import React, { useEffect, useRef, useState } from "react"
import { getCoronetPokemon } from "../management/DexManager"
import { DexData } from "./DexData"
import { getCapturedPokemon } from "../management/CatchManager"
import Modal from "../../Modal"
import { addCaughtPokemon } from '../management/CatchManager'
import battle from "../music/arcBattle.mp3"
import { useLocation } from "react-router-dom"

export const CoronetHighlands = () => {
    const loggedUser = parseInt(localStorage.getItem("user_id"))
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

    const fight = useRef()
    const location = useLocation()

    //catchPokemon - empty object to set new pokemon in caughtTable array. Method will be passed to
    const [catchPokemon, setCatchPokemon] = useState({
        is_shiny: true,
        is_alpha: false,
        user: loggedUser,
        pokemon: confirmSelectedPoke.id
    })

    useEffect(
        () => {
            getCoronetPokemon().then(data => setCoronetPoke(data))
                .then(getCapturedPokemon().then(data => setCaughtTable(data)))
        },
        [])
    
    useEffect(
        () => {
            if (location.pathname === "/dexSelect/Coronet") {
                fight.current = new Audio(battle)
                fight.current.play()
                fight.current.volume = 0.30
                fight.current.loop = false
            }
        }, [])

    useEffect(
        () => {
            if (location.pathname !== "/dexSelect/Coronet") {
                fight.current.pause()
            }
    },[])


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
        const view = CoronetPoke.find(info => {
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