import React, { useState, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { updatePost, getPostById, } from '../management/PostManager'

export const UpdatePost = () => {
    const history = useHistory()
    const { postId } = useParams()

    const [currentPost, setCurrentPost] = useState({
        content: "",
        approved: true,
        user: 1,
    })

    useEffect(() => {
        getPostById(postId).then(postData => setCurrentPost({
            publication_date: postData.publication_date,
            content: postData.content,
            approved: postData.approved,
            user: postData.user,
        }))
    }, [postId])

    const changeUpdatedPost = (domEvent) => {
        domEvent.preventDefault()
        const copy = { ...currentPost }
        let key = domEvent.target.name
        copy[key] = domEvent.target.value
        setCurrentPost(copy)
    }

    return (
        <form className="updateForm">
            <h2 className="updateForm__title">Edit the Post</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="content">Dat Juicy Content: </label>
                    <input type="text" name="content" required autoFocus className="form-control"
                        value={currentPost.content}
                        onChange={changeUpdatedPost}
                    />
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const post = {
                        content: currentPost.content,
                        approved: currentPost.approved,
                        user: currentPost.user.id,
                    }

                    // Send POST request to your API
                    if (confirm('Is this what you want to say? Just making sure!') == true)
                        updatePost(post, postId)
                            .then(() => history.push(`/socials`))
                }}
                className="btn btn-primary">Save Post</button>
            <button type="cancel" onClick={() => {
                history.push("/socials")
            }}>Cancel</button>
        </form>
    )
}
