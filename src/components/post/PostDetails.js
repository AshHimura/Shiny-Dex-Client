import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { getPostById } from "../management/PostManager"
import { getComments } from "../comments/CommentManager"
import { CommentForm } from "../comments/CommentForm"



export const PostDetails = () => {
    const [postD, setPostD] = useState({})
    const { postId } = useParams()
    const history = useHistory() 

    useEffect(
        () => {
            getPostById(postId).then(data => setPostD(data))
        },
        [postId])
    // useEffect(() => {
    //     getComments(postId).then(comments => setComments(comments))
    // },
    //     [postId])

    return (
        <>
            <section className="postD_Id" key={postId}>
                <img src={postD.image_url} />
                <h3 className="postD__title">Title: {postD.title}</h3>
                <div className="postD__author">Author: {postD.user?.user.first_name} {postD.user?.user.last_name}</div>
                <div className="postD__publicationDate">Publication Date: {postD.publication_date}</div>
                <div className="postD__content">Content: {postD.content}</div>
            </section>
            <button className="comments" onClick={() => {
                history.push({ pathname: `/socials/${postId}/comment` })
                .then(CommentForm())
            }}>
                Comment
            </button>


        </>
    )
}