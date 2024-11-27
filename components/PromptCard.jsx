'use client'

import { useEffect, useState } from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"


const PromptCard = ({key, post, handleTagClick, handleEdit, handleDelete}) => {
  console.log(post)
  const [copied, setCopied]=useState(false)

  return (
      <div className="relative overflow-hidden rounded-xl p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-gray-800 to-blue-900 opacity-95"></div>
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 opacity-30 animate-gradient"></div>
             {/* Content */}
              <div className="relative">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-sm"></div>
                        <img
                          src={post?.creator?.image}
                          alt={post?.creator?.username}
                          className="relative w-12 h-12 rounded-full object-cover border-2 border-white/50"
                        />
                      </div>
                          <h3 className="text-gray-100 font-medium text-lg">{post?.creator?.username}</h3>
                      </div>
                          <p className="text-gray-200 leading-relaxed">{post.prompt}</p>
                      <div className="absolute top-0 right-0 p-2">
                        <Image
                          src={
                            copied === post.prompt
                            ? '/assets/icons/tick.svg'
                            : '/assets/icons/copy.svg'
                          }
                          alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
                          width={24}
                          height={24}
                          className=""
                        />
                      </div>
                    </div>
                </div>
  )
}

export default PromptCard
