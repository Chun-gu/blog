import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <h1>블로그</h1>
      <ul>
        <li>
          <Link href={'posts/wpahr'}>게시글로 이동</Link>
        </li>
      </ul>
    </main>
  )
}
