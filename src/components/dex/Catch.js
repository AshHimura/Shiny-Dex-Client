// import React, {useState, useEffect} from 'react'
// import { useParams } from 'react-router-dom'
// import Modal from '../../Modal'

// export const Catch = () => {
//     const [catchPokemon, setCatchPokemon] = useState({
//         isShiny: false,
//         isAlpha: false,
//         user: 1,
//         pokemon: ,
//     })
    
//     const changeCatchState = (domEvent) => {
//         const copy = { ...catchPokemon}
//         let ki = domEvent.target.clicked
//         copy[ki] = domEvent.target.value
//         setCatchPokemon(copy)
//     }
    
//     import { addCaughtPokemon } from '../management/CatchManager'
//     const createCatch = () => {
//         const capture ={
//             isShiny: catchPokemon.isShiny,
//             isAlpha: catchPokemon.isAlpha,
//             user: catchPokemon.user,
//             pokemon: catchPokemon.pokemon
//         }

//         addCaughtPokemon(capture)
//             .then(res => res.json())
//     }
    
// }

