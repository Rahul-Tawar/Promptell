'use client'

import {useState, useEffect} from 'react'
import PromptCard from './PromptCard'

const Feed = () => {
  
  const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])
  
  const handleSearchChange = (e) => {
      
  }
  // fetch prompts
  const fetchPosts = async () => {
        const response = await fetch('api/prompt')
        const data = await response.json()
        console.log(data)

        setPosts(data)
  }

  useEffect( ()=>{
   fetchPosts()
  },
  [])
 

  return (
    <div>
      <section className='flex flex-col gap-10'>
        <form className='relative w-[80vw] flex justify-center items-center mt-10'>
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

const PromptCardList = ({data, handleTagClick}) => {
  return (
    <div className='mt-15'>
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

export default Feed
