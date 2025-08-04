import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { validateFakeJWT, refreshFakeJWT } from './lib/fakeJwt'

const protectedRoutes = ['/dashboard', '/invoices', '/expenses', '/taxes']

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const refreshToken = request.cookies.get('refreshToken')?.value
  const path = request.nextUrl.pathname

  const isProtected = protectedRoutes.some((route) => path.startsWith(route))

  if (isProtected) {
    // No token at all → go to login
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Token exists → validate
    if (!validateFakeJWT(token)) {
      // Try refresh if refresh token exists
      if (refreshToken && validateFakeJWT(refreshToken)) {
        const newToken = refreshFakeJWT(refreshToken)
        if (newToken) {
          const response = NextResponse.next()
          response.cookies.set('token', newToken, {
            path: '/',
            httpOnly: false,
          })
          return response
        }
      }
      // No valid refresh token → redirect
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/invoices/:path*',
    '/expenses/:path*',
    '/taxes/:path*',
  ],
}
