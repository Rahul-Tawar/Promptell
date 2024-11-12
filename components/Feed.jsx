'use client'

import {useState, useEffect} from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({data, handleTagClick}) => {
  return (
    <div className='mt-15 prompt_layout'>
    {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>  
  )
}


const Feed = () => {
  
  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])
  
  const handleSearchChange = (e) => {
      
  }
  // fetch prompts
  const fetchPosts = async () => {
        const response = await fetch('api/prompt')
        const data = await response.json()

        setPosts(data)
  }

  useEffect( ()=>{
   fetchPosts()
  },
  [])
 

  return (
    <div>
      <section className='feed'>
        <form className='relative w-[80vh] flex-center'>
          <input 
              type="text"
              placeholder='Search for prompt based on username'
              value={searchText}
              onChange={handleSearchChange}
              required
              className='search_input w-auto'    
          />
        </form>

        <PromptCardList
          data = {posts}
          handleTagClick = {()=> {}}
        />
      </section>
    </div>
  )
}

export default Feed
