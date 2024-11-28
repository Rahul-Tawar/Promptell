'use client'

import {useState, useEffect} from 'react'
import PromptCard from './PromptCard'
import {Search} from 'lucide-react'

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
 
  console.log(typeof(posts))

  return (
    <div>
      <section className='flex flex-col gap-10'>
        <SearchBar/>
        {/* latest prompts */}
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-2">
            Latest Prompts
        </h2>
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

const SearchBar = () => {
    const [isFocused, setIsFocused] = useState(false);
  
    return (
      <div className="relative mt-8">
        <input
          type="text"
          placeholder="Search prompts..."
          className="w-full bg-gray-900/50 text-gray-100 placeholder-gray-400 rounded-xl py-3 px-6 pr-12 
                   border border-gray-700 focus:border-transparent focus:outline-none focus:ring-2 
                   focus:ring-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        <div className={`absolute right-3 top-1/2 -translate-y-1/2 transition-all duration-300
                      ${isFocused ? 'scale-110' : 'scale-100'}`}>
          <div className={`absolute inset-0 rounded-full blur ${
            isFocused ? 'bg-gradient-to-r from-purple-500 to-pink-500 opacity-70' : 'opacity-0'
          }`} />
          <Search 
            className={`relative w-5 h-5 transition-colors duration-300 ${
              isFocused 
                ? 'text-white' 
                : 'text-gray-400'
            }`}
          />
        </div>
      </div>
    );
  }

export default Feed
