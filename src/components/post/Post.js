import React from "react"
import { Link } from "react-router-dom"

export default ({ post }) => (
    <section className="columns">
        
        <div className="column">{ post.user.first_name } {post.user.last_name}</div> 
        <div className="column">{post.publication_date} </div>
        <div className="column">{post.category.label}</div>
    </section>
)