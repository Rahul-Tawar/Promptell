import React, {useState} from 'react';
import { Heart, Copy, CheckCheck } from 'lucide-react';
import { UserAvatar } from '@components/userAvatar';
import { useCopyFeedback } from '@hooks/useCopyPrompt';

export default function PromptCard({ prompt, onLike, onCopy }) {
  const { copied, handleCopy } = useCopyFeedback(() => onCopy(prompt.content));
  const [likeCount, setLikeCount] = useState(0)

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
              <button
                onClick={() => onLike(prompt.id)}
                className={`flex items-center gap-1 ${
                  prompt.isLiked ? 'text-pink-500' : 'text-gray-400'
                } hover:text-pink-500 transition-colors`}
              >
                <Heart size={18} fill={prompt.isLiked ? 'currentColor' : 'none'} />
                <span>{likeCount}</span>
              </button>
              <button
                onClick={handleCopy}
                className="hover:text-blue-400 transition-colors"
                title="Copy prompt"
              >
                {copied ? (
                  <CheckCheck size={18} className="text-green-500" />
                ) : (
                  <Copy size={18} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}