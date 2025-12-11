import React from 'react'
import type { Post } from '../types';
import './../FeedPost.css';
import { ChatBubbleLeftIcon, HeartIcon, ShareIcon } from '@heroicons/react/24/outline';
import profile from "../assets/images/profile_test.jpeg"
const FeedPost: React.FC<{ post: Post; onAction?: () => void }> = ({ post }) => {
  function timeAgo(timestamp: number) {
    const now = Date.now();
    const diff = Math.floor((now - timestamp) / 1000); // in seconds

    if (diff < 5) return "just now";
    if (diff < 60) return `${diff} sec ago`;

    const minutes = Math.floor(diff / 60);
    if (minutes < 60) return `${minutes} min ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hr ago`;

    const days = Math.floor(hours / 24);
    if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;

    const weeks = Math.floor(days / 7);
    if (weeks < 4) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;

    const months = Math.floor(days / 30);
    if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;

    const years = Math.floor(days / 365);
    return `${years} year${years > 1 ? "s" : ""} ago`;
  }

  return (
    <div className="bg-gray-50 rounded-xl p-[0.35rem] shadow-soft post-appear mb-8">
      <div className="flex items-start gap-3 bg-white rounded-xl p-2 min-h-[8.75rem] h-auto">
        <div className="w-10 h-10 rounded-md overflow-hidden">
          <img src={profile} alt="profile" className="w-full h-full object-cover blur-sm"/>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-sm">John Doe</div>
              <div className="text-xs text-gray-400">{timeAgo(post.createdAt)}</div>
            </div>
            <div className="text-gray-300">...</div>
          </div>

          <div
            className="mt-3 text-sm text-gray-700 space-y-2 feed-post-content"
            dangerouslySetInnerHTML={{ __html: post.content as string }}
          />
        </div>
      </div>
      <div className="flex items-center gap-4 mt-1 text-sm text-gray-500 p-2">
        <button onClick={()=>alert('Function not implemented')}  >
            <HeartIcon className="w-4 h-4 text-gray-600" />
        </button>
        <button onClick={()=>alert('Function not implemented')}>
            <ChatBubbleLeftIcon className="w-4 h-4 text-gray-600" />
        </button>
        <button onClick={()=>alert('Function not implemented')}>
            <ShareIcon className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    </div>
  )
}

export default FeedPost
