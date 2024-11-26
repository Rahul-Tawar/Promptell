'use client'

import { useEffect, useState } from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"


const PromptCard = ({key, post, handleTagClick, handleEdit, handleDelete}) => {
  console.log(post)
  const [copied, setCopied]=useState(false)

  return (
    <div className="">
      <div className="flex flex-col border-2 border-white relative">
        <div>
          <div className="flex flex-row gap-2">
          <Image
            src={post?.creator?.image}
             alt="Creator"
             width={50}
             height={50}
             className="rounded-full object-contain"
          />
            <h3>{post?.creator?.username}</h3>
          </div>

          <div className="flex flex-col">
            <h3>{post?.prompt}</h3>
          </div>
        </div>
        <div className="absolute top-0 right-0 p-2" onClick={() => {}}>
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
