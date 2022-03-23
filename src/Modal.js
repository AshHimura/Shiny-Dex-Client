import React from 'react'
import { DexData } from './components/dex/DexData';
import "./Modal.css"

function Modal({ closeModal, createCatch }) {

    return <div className="modalBackground">
        <div className="modalContainer">
            <div className="title">
                <h1>You sure buddy?</h1>
            </div>
            <div className="body">
                <p>Has this shiny been captured?</p>
            </div>
            <div className="footer">
                <button onClick={() => {createCatch(); <DexData />  }}>Confirm</button>
                <button onClick={() => closeModal(false)} id="cancelBtn">Not Yet</button>
            </div>
        </div>
    </div>

}

export default Modal
