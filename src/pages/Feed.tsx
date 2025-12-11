import React, { useState } from 'react'
import PostEditor from '../components/PostEditor'
import FeedPost from '../components/FeedPost'
import { useAuth } from '../context/AuthContext'
import type { Post } from '../types'

const Feed: React.FC = () => {
  const { isAuthenticated, openAuthModal } = useAuth()
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: 'John Doe',
      content: 'This is a sample post. Interactions are not implemented.',
      createdAt: Date.now() - 1000 * 60 * 20,
    },
    {
      id: 2,
      author: 'Jane Doe',
      content: 'Another example post. Clicks show alerts.',
      createdAt: Date.now() - 1000 * 60 * 60,
    },
  ])

  // Centralized auth check
  function requireAuth(action: () => void) {
    if (!isAuthenticated) {
      openAuthModal()
      return
    }
    action()
  }

  function publish(content: string) {
    const p: Post = { id: Date.now(), author: 'You', content, createdAt: Date.now() }
    setPosts((prev) => [p, ...prev])
  }

  return (
    <div className="max-w-[28rem] mx-auto py-8 space-y-12">
      {/* PostEditor with overlay for unauthenticated users */}
      <div className="relative">
        {!isAuthenticated && (
          <div
            className="absolute inset-0 z-10 cursor-not-allowed rounded-xl"
            onClick={() => requireAuth(() => {})}
          />
        )}
        <PostEditor
          onPublish={(content) => requireAuth(() => publish(content))}
          requireAuth={requireAuth}
        />
      </div>

      {/* Feed posts */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="relative">
            {!isAuthenticated && (
              <div
                className="absolute inset-0 z-10 cursor-not-allowed rounded-xl"
                onClick={() => requireAuth(() => {})}
              />
            )}
            <FeedPost post={post} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Feed
