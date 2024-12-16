'use client'

import React, { useState, useOptimistic } from 'react';
import { Heart, Copy, CheckCheck, Bookmark, Share2 } from 'lucide-react';
import { UserAvatar } from '@components/userAvatar';
import { useCopyFeedback } from '@hooks/useCopyPrompt';
import { useSession } from '@node_modules/next-auth/react';

export default function PromptCard({ prompt }) {
  const [optimisticLikes, setOptimisticLikes] = useOptimistic(prompt?.likes, (current, delta) => current + delta);
  const [optimisticSaves, setOptimisticSaves] = useOptimistic(prompt?.saves, (current, delta) => current + delta);
  const { copied, handleCopy } = useCopyFeedback(() => onCopy(prompt.content));
  const [likeCount, setLikeCount] = useState(prompt?.likes)
  const [isSaved, setIsSaved] = useState(false)
  const [saveCount, setSaveCount] = useState(prompt?.saves)
  const {data: session} = useSession()
  

  // handler functions

  // like the prompt
  const handleLike = async(prompt) => {
    setOptimisticLikes(prompt?.likes+1)
    try {
      const response = await fetch('/api/prompt/likes/increment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify({
            promptId: prompt?._id,
            userId: session?.user?.id
        }),
      });
      if(!response.ok) {
        throw new Error(`HTTP error, status ${response.status}`)
      } else {
        const {likes} = response.json()
        console.log(likes)
      }
     
    } catch (error) {
      console.log(error, "Failed to call API")
      setOptimisticLikes(prompt?.likes-1)
    }
  }

  // unlike the prompt
  const handleUnlike = async(prompt) => {
    setOptimisticLikes(prompt?.likes-1)
    try {
      const response = await fetch('/api/prompt/likes/decrement', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify({
            promptId: prompt?._id,
            userId: session?.user?.id
        }),
      });
      if(!response.ok) {
        throw new Error(`HTTP error, status ${response.status}`)
      } else {
        const {likes} = response.json()
        console.log(likes)
      }
     
    } catch (error) {
      console.log(error, "Failed to call API")
      setOptimisticLikes(prompt?.likes+1)
    }
  }
  
  // save and unsave the prompt

  // save the prompt
  const handleSave = async(prompt) => {
    setOptimisticSaves(prompt?.saves+1)
    try {
      const response = await fetch('/api/prompt/saves/increment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify({
            promptId: prompt?._id,
            userId: session?.user?.id
        }),
      });
      if(!response.ok) {
        throw new Error(`HTTP error, status ${response.status}`)
      } else {
        const { saves } = console.log(saves)
        console.log(saves)
      }
     
    } catch (error) {
      console.log(error, "Failed to call API")
      setOptimisticSaves(prompt?.saves-1)
    }
  }

  // unsave the prompt
  const handleUnsaves = async(prompt) => {
    setOptimisticLikes(prompt?.saves-1)
    try {
      const response = await fetch('/api/prompt/saves/decrement', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify({
            promptId: prompt?._id,
            userId: session?.user?.id
        }),
      });
      if(!response.ok) {
        throw new Error(`HTTP error, status ${response.status}`)
      } else {
        const {likes} = response.json()
        console.log(likes)
      }
     
    } catch (error) {
      console.log(error, "Failed to call API")
      setOptimisticSaves(prompt?.saves+1)
    }
  }


  // sharing the prompt 
  const onShare = async(prompt) => {
    // share logic
  }

  // copy prompt 
  const onCopy = (prompt) => {
    // copy logic
  }

  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl blur opacity-30 group-hover:opacity-100 transition duration-500"></div>
      <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl"></div>
        <div className="relative space-y-4">
          <div className="flex items-center gap-3">
            <UserAvatar image={prompt.creator.image} name={prompt.creator.username} />
            <div>
              <h3 className="font-semibold text-white">{prompt.creator?.username}</h3>
              <p className="text-sm text-gray-400">{prompt.creator?.email}</p>
            </div>
          </div>
          
          <p className="text-gray-300">{prompt.prompt}</p>
          
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-sm">{new Date("2024-10-10").toLocaleDateString()}</span>
            <div className="flex gap-4">
              {/* Like Prompt */}
              <button
                onClick={() => handleLike(prompt)}
                className={`flex items-center gap-1 ${
                  prompt.isLiked ? 'text-pink-500' : 'text-gray-400'
                } hover:text-pink-500 transition-colors`}
              >
                <Heart size={18} fill={prompt.isLiked ? 'currentColor' : 'none'} />
                <span>{optimisticLikes}</span>
              </button>
              {/* Save Prompt */}
              <button
                onClick={handleSaveClick}
                className={`flex items-center gap-1${
                  isSaved ? 'text-pink-500' : 'text-gray-400'
                } hover:text-pink-500 transition-colors ` }
                title={isSaved ? 'Remove from saved' : 'Save prompt'}
              >
                <Bookmark size={18} fill={isSaved ? 'currentColor' : 'none'} />
                <span>{optimisticSaves}</span>
              </button>
              <button
                onClick={handleCopy}
                className="hover:text-blue-400 transition-colors absolute top-0 right-0"
                title="Copy prompt"
              >
                {copied ? (
                  <CheckCheck size={18} className="text-green-500" />
                ) : (
                  <Copy size={18} />
                )}
              </button>
              {/* Share button */}
              <button
                onClick={() => onShare(prompt.description, prompt.title)}
                className="hover:text-blue-400 transition-colors"
                title="Share prompt"
              >
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}