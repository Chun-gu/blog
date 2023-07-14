import { notFound } from 'next/navigation'
import { getPostMetas, getPostByFileName } from '@/lib/post'

type Props = { params: { id: string } }

export async function generateStaticParams() {
  const postMetas = await getPostMetas()

  if (!postMetas) return []

  return postMetas.map((meta) => ({
    id: meta.id,
  }))
}

export async function generateMetadata({ params: { id } }: Props) {
  const post = await getPostByFileName(`${id}.mdx`)

  if (!post) return { title: '존재하지 않는 게시물' }

  return { title: post.meta.title }
}

export default async function Page({ params: { id } }: Props) {
  const post = await getPostByFileName(`${id}.mdx`)

  if (!post) notFound()

  const { meta, content } = post

  return (
    <>
      <h2>{meta.title}</h2>
      <p>{meta.date}</p>
      <article>{content}</article>
      <ul>
        {meta.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </>
  )
}
