import React, {useState, useEffect} from 'react'
import "./Modal.css"
import { getCaughtInstance, updateCaught } from './components/management/CatchManager'

export function Modal({ closeModal, createCatch, caughtObj, modalCheck, setModalCheck }) {
    const [checked, setChecked] = useState(false)

    const [choosingPoke, setChoosingPoke] = useState({
    })

    useEffect(() => {
        getCaughtInstance(caughtObj?.id).then(postCheck => setChoosingPoke({
            is_alpha: postCheck.is_alpha
        }))
    },[caughtObj?.id])

    const handleCheck = (evt) => {
        setModalCheck(!modalCheck)
        // const copy = {...caughtObj}
        // copy["is_alpha"] = evt.target.checked
        // updateCaught(copy, caughtObj.id)
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
            <input type="checkbox" name="alpha_modalCheck" value={choosingPoke.is_alpha} onChange={handleCheck} checked={modalCheck} />
            </div>

            <div className="footer">
                <button onClick={createCatch}>Confirm</button>
                <button onClick={() => closeModal(false)} id="cancelBtn">Not Yet</button>
            </div>
        </div>
    </div>
   

    </>
    
    )
}

export default Modal
