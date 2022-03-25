import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { getPosts, deletePost } from "../management/PostManager"

export const PostList = () => {

    const [posts, setPosts] = useState([])
    const history = useHistory()

    // Initialization effect hook -> Go get post data
    useEffect(() => {
        getPosts().then((postsData) => setPosts(postsData))
    },
     [])



return (
    <>
        <div className="table-container" style={{ marginTop: "2rem" }}>
            <button className="button is-success" onClick={() => history.push("/socials/create")}>
                New Post
            </button>
            {
                posts.map(post => {
                    return <section key={`post--${post.id}`} className="post">
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