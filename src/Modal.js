import React, {useState, useEffect} from 'react'
import "./Modal.css"
import { getCaughtInstance, updateCaught } from './components/management/CatchManager'
import { useParams } from 'react-router-dom'

export function Modal({ closeModal, createCatch }) {
    const [checked, setChecked] = useState(false)
    const { caughtId } = useParams()

    const [choosingPoke, setChoosingPoke] = useState({
        isAlpha: false
    })

    useEffect(() => {
        getCaughtInstance(caughtId).then(postCheck => setChoosingPoke({
            isAlpha: postCheck.isAlpha
        }))
    },[caughtId])

    const handleChange = (domEvent) => {
        domEvent.preventDefault()
        setChecked(!checked)
        const copy = {...choosingPoke}
        let ki = domEvent.target.checked
        copy[ki] = domEvent.target.value
        setChoosingPoke(copy)
    }

    const setChange = (domEvent) => {
        domEvent.preventDefault()

        const catchPoke = {
            isAlpha: choosingPoke.isAlpha
        }

        updateCaught(catchPoke, caughtId)
    }

    return (
    <>
    <div className="modalBackground">
        <div className="modalContainer">
            <div className="title">
                <h1>SHINY CONFIRMATION</h1>
            </div>
            <div className="body">
                <p>Has this shiny been captured?</p>
            </div>

            <div>
            <label>Is this pokemon an Alpha too?</label>
            <input type="checkbox" name="alpha_modalCheck" value={choosingPoke.isAlpha} onChange={()=> {handleChange(); setChange()}} checked={checked} />
            </div>

            <div className="footer">
                <button onClick={() => {createCatch();   }}>Confirm</button>
                <button onClick={() => closeModal(false)} id="cancelBtn">Not Yet</button>
            </div>
        </div>
    </div>
   

    </>
    
    )
}

export default Modal
