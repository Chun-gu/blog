import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '이춘구의 블로그',
  description: '프론트엔드 개발자 이춘구의 기술 블로그입니다.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="kr">
      <body className={inter.className}>
        <header className="border-b">헤더</header>
        {children}
        <footer className="border-t">푸터</footer>
      </body>
    </html>
  )
}
