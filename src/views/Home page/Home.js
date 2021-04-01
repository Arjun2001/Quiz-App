import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Blog from '../../components/blogs/Blog'

function Home() {
    return (
        <div>
            <Navbar />
            <div>
                Hello , you are on home page!
                {/* <Blog></Blog> */}
            </div>
            
        </div>
    )
}

export default Home
