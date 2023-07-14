import Link from 'next/link'

type Props = { post: Meta }

export default function PostListItem({ post }: Props) {
  const { id, title, date } = post

  return (
    <li>
      <Link href={`posts/${id}`}>{title}</Link>
      <p>{date}</p>
    </li>
  )
}
