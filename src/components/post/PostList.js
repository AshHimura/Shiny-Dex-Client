import React, { useState, useEffect } from "react"
import { useHistory, Link } from 'react-router-dom'
import { getPostById, getPosts, deletePost } from "../management/PostManager"
import Post from "./Post"

export const PostList = () => {

    const [posts, setPosts] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const history = useHistory()

    // Initialization effect hook -> Go get post data
    useEffect(() => {
        if (searchTerm.length > 1) {
            getPostById(searchTerm).then((postsData) => setPosts(postsData))
        } else {
            getPosts().then((postsData) => setPosts(postsData))
        }
    }, [searchTerm])

    return (
        <>
            <div className="table-container" style={{ marginTop: "2rem" }}>
                <button className="button is-success" onClick={() => history.push("/socials/create")}>
                    New Post
                </button>
                {
                    posts.map(post => {
                        return <section key={`post--${post.id}`} className="post">
                            <div className="post__title"><Link to={`/socials/${post.id}`}>{post.title}</Link></div>
                            <div className="post__author">Author: {post.user.user.username}</div>
                            <div className="post__content">{post.content}</div>
                            <button onClick={() => {
                                history.push({ pathname: `/socials/${post.id}/update` })
                            }}>
                                Edit Post
                            </button>
                            <button onClick={() => {
                                if (confirm('Are you sure you want to delete this post?') == true)
                                    deletePost(post, post.id)
                                        .then(response => setPosts(response))
                            }}>
                                Delete Post
                            </button>
                        </section>
                    })
                }
            </div>
        </>
    )
}