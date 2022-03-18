import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { addItem, getAllItems } from "../management/DexManager"


export const ItemGen = () => {
    const [currentItem, setCurrentItem] = useState({
        name: ""
    })
    const [itemList, setItemList] = useState([])
    const history = useHistory({forceRefresh:true})

    useEffect(() => {
        getAllItems().then(items => setItemList(items))
    },[])

    const changeItemState = (domEvent) => {
        domEvent.preventDefault()
        const copy = { ...currentItem }
        let ki = domEvent.target.name
        copy[ki] = domEvent.target.value
        setCurrentItem(copy)
    }

    return (
        <>
        <h2 className="item_title">Craft a new item</h2>
        <label>Name:</label>
        <input type="text" name="name" value={currentItem.name} onChange={changeItemState} />

        <h3>So You can see whats already here...</h3>
        {itemList.map(item => {
            return <div key={item.id}>
                {item.name}</div>
        })}

        <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const item = {
                        name: currentItem.name
                    }

                    // Send POST request to your API
                    addItem(item)
                        .then(res => res.json())
                        .then((data) => history.go(`/ItemGenerator`))
                }}
                className="btn btn-primary">Save Item</button>

        </>
    )
}