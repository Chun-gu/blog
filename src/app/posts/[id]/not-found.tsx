import Link from 'next/link'

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>존재하지 않는 게시글입니다.</p>
      <Link href="/">홈으로 이동</Link>
    </div>
  )
}
