import React from 'react';
import "./blog.css";
const Blog = (props) =>{

    return(
        <div className="blogs-container">
            <div className="blog-title">Latest Updates</div>
            <div className="separator"><span style={{opacity:"0.34"}}>{0} items</span></div>
        </div>
    )
}

export default Blog;