'use client'

import { useEffect, useState } from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"


const PromptCard = ({key, post, handleTagClick, handleEdit, handleDelete}) => {


  return (
    <div className="prompt_card">
      <div className="flex justify-center items-start gap-6">
        <div>
          <Image
            src={post?.creator?.image}
             alt="Creator"
             width={50}
             height={50}
             className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3>{post?.creator?.username}</h3>
            <p>{post?.creator?.email}</p>
            <h3>{post?.prompt}</h3>
          </div>
        </div>
        {/* <div className="copy_btn" onClick={() => {}}>
          <Image
            src={
              copied === post.prompt
               ? '/assets/icons/tick.svg'
               : '/assets/icons/copy.svg'
            }
            alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div> */}
      </div>
    </div>
  )
}

export default PromptCard
