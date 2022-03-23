export const getCapturedPokemon = () => {
    return fetch(`http://localhost:8000/caught`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("arc_token")}`
        }
    })
        .then(res => res.json())
}

export const getCaughtInstance = (id) => {
    return fetch(`http://localhost:8000/caught/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("arc_token")}`
        },
    })
        .then(res => res.json())
}

export const updateCaught = (post, id) => {
    return fetch(`http://localhost:8000/caught/${id}`, { 
        method: "PUT",
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