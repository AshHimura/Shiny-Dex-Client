export const getCapturedPokemon = () => {
    return fetch(`http://localhost:8000/caught`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("arc_token")}`
        }
    })
        .then(res => res.json())
}

export const getCaughtInstance = (caughtId) => {
    return fetch(`http://localhost:8000/caught/${caughtId}`, {

        headers: {
            "Authorization": `Token ${localStorage.getItem("arc_token")}`
        },
    })
            .then(res => res.json())
}

export const updateCaught = (post, caughtid) => {
    return fetch(`http://localhost:8000/caught/${caughtid}`, { 
        method: "Put",
        headers:{
            "Authorization": `Token ${localStorage.getItem("arc_token")}`, 
            "Content-Type": 'application/json'
        } ,
        body: JSON.stringify(post)

    })
}

export const addCaughtPokemon = pokemon => {
    return fetch(`http://localhost:8000/caught`, {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("arc_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(pokemon)
    })
        
}