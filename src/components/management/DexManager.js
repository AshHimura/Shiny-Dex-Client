


export const getAllPokemon = () => {
    return fetch("http://localhost:8000/pokemon", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("arc_token")}`
        }
    })
        .then(res => res.json())
}

export const getCoronetPokemon = () => {
    return fetch(`http://localhost:8000/pokemon/1/getregions`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("arc_token")}`
        }
    })
    .then(res => res.json())
}

export const getObsidianPokemon = () => {
    return fetch(`http://localhost:8000/pokemon/2/getregions`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("arc_token")}`
        }
    })
    .then(res => res.json())
}

export const getCrimsonPokemon = () => {
    return fetch(`http://localhost:8000/pokemon/3/getregions`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("arc_token")}`
        }
    })
        .then(res => res.json())
}

export const getCobaltPokemon = () => {
    return fetch(`http://localhost:8000/pokemon/4/getregions`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("arc_token")}`
        }
    })
        .then(res => res.json())
}

export const getAlabasterPokemon = () => {
    return fetch(`http://localhost:8000/pokemon/5/getregions`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("arc_token")}`
        }
    })
        .then(res => res.json())
}

export const addPokemon = pokemon => {
    return fetch("http://localhost:8000/pokemon", {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("arc_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(pokemon)
    })
        
}

export const getAllRegions = () => {
    return fetch("http://localhost:8000/regions", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("arc_token")}`
        }
    })
        .then(res => res.json())
}

export const getAllItems = () => {
    return fetch("http://localhost:8000/items", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("arc_token")}`
        }
    })
        .then(res => res.json())
}

export const addItem = item => {
    return fetch("http://localhost:8000/items", {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("arc_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(item)
    })
}

export const getAllTypes = () => {
    return fetch("http://localhost:8000/poketypes", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("arc_token")}`
        }
    })
        .then(res => res.json())
}