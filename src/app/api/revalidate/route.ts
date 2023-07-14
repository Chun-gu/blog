import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export async function GET(request: NextRequest) {
  const secretKey = request.nextUrl.searchParams.get('secretKey')

  if (secretKey !== process.env.SECRET_KEY) {
    return new NextResponse(
      JSON.stringify({ message: '유효하지 않은 시크릿 키' }),
      {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }

  const path = request.nextUrl.searchParams.get('path') || '/'

  revalidatePath(path)

  return NextResponse.json({ revalidated: true, now: Date.now() })
}
