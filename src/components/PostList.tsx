import { getPostMeta } from '@/api/posts'
import PostListItem from './PostListItem'

export default async function PostList() {
  const posts = await getPostMeta()

  if (!posts || posts.length === 0) {
    return <p>게시글이 없습니다.</p>
  }

  return (
    <ul>
      {posts.map((post) => (
        <PostListItem key={post.id} post={post} />
      ))}
    </ul>
  )
}
