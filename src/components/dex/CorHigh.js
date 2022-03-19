import React, { useEffect, useState } from "react"
import '@grapecity/wijmo.styles/wijmo.css';
import * as wjInput from '@grapecity/wijmo.react.input'
import { getCoronetPokemon } from "../management/DexManager"
import { DexData } from "./DexData"

export const CoronetHighlands = () => {
    const [CoronetPoke, setCoronetPoke] = useState([])
    const [selectPoke, setSelectPoke] = useState({})
    const [checkedPoke, setCheckedPoke] = useState(false)

    useEffect(
        () => {
            getCoronetPokemon().then(data => setCoronetPoke(data))
        },
        [])

    const handleUserSelect = (evt) => {
        const view = CoronetPoke.find(info => {
            return (info.id === parseInt(evt.target.value))
        })
        setSelectPoke(view)
    }

    const pokeDataPost = () => {
        return (
            <>
                {selectPoke?.id ? <> <DexData selectPoke={selectPoke} /></>: <h2>Who's that pokemon?</h2>}
            </>
        )
    }

    return (
        <>
            <form className="coro">
                <h3 className="coro-pokename">
                    <select value={CoronetPoke} id={CoronetPoke.id} className="coro-names" onChange={
                        () => {
                            if (window.confirm('Duke, go away')== true) {
                                handleUserSelect()
                            }
                        }}>
                        <option value="" >Select a Pokemon</option>
                        {
                            CoronetPoke.map(coronet => {
                                return <option key={coronet.id} value={coronet.id}>
                                    {coronet.name}
                                </option>
                            })
                        }
                    </select>

                </h3>
            </form>
            {/* <form>
            <div className="container-fluid">
            <div className="row">
                <div className="col-xs-5">
                    <wjInput.ListBox displayMemberPath={CoronetPoke} checkedMemberPath="selected" selectedItem={handleUserSelect} itemsSource={CoronetPoke.map(coronet => {
                                return (
                                    `${coronet.name}`
                                )
                            })} itemChecked={setCheckedPoke}>
                    </wjInput.ListBox>
                </div>
                <div className="col-xs-7">
                    <p>
                        <b>Pocket Monsters:</b>
                    </p>
                    <ul>
                        
        
                    </ul>
                </div>
            </div>
        </div>
            </form> */}
            <img className="hiddenPoke" style={{ width: "520px", height: "300px", display: (selectPoke?.id ? 'none' : 'block') }} src={require("../images/hisui/pokeball-pre.png")} />
            <div>{pokeDataPost()}</div>

        </>

    )
}