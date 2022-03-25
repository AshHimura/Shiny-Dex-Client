import React, { useState, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { addPost } from '../management/PostManager'


export const PostForm = () => {
    const history = useHistory()
    const { postId } = useParams()


    const [currentPost, setCurrentPost] = useState({
        publication_date: "",
        content: "",
        user: 1,
    })

    const changePostState = (domEvent) => {
        const copy = { ...currentPost }
        let key = domEvent.target.name
        copy[key] = domEvent.target.value
        setCurrentPost(copy)
    }

    return (
        <form className="postForm">
            <h2 className="postForm__title">Make a new post</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="content">Thoughts to share: </label>
                    <input type="text" 
                    name="content" required autoFocus className="form-control"
                    placeholder="Anything to say about the Hisui region?"
                        value={currentPost.content}
                        onChange={changePostState}
                    />
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const post = {
                        content: currentPost.content,
                        publication_date: currentPost.publication_date,
                        user: currentPost.user,
                    }

                    // Send POST request to your API
                    addPost(post)
                        .then(res => res.json())
                        .then((data) => history.push(`/socials`))
                }}
                className="btn btn-primary">Save Post</button>
        </form>
    )
}