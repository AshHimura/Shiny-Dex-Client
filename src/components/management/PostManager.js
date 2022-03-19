export const getPosts = () => {
    return fetch("http://localhost:8000/socials", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("arc_token")}`
        }
    })
        .then(res => res.json())
}

export const getPostById = (id) => {
    return fetch(`http://localhost:8000/socials/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("arc_token")}`
        }
    })
        .then(res => res.json())
}

export const addPost = post => {
    return fetch("http://localhost:8000/socials", {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("arc_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    })
        
}

export const updatePost = (post, id) => {
    return fetch(`http://localhost:8000/socials/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("arc_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    })
        
}

export const deletePost = (post, id) => {
    return fetch(`http://localhost:8000/socials/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("arc_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    })
        .then(getPosts)
}

