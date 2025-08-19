import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { validateFakeJWT, refreshFakeJWT } from './lib/fakeJwt'

const protectedRoutes = ['/dashboard', '/invoices', '/expenses', '/taxes']
const authPages = ['/login', '/signup', '/forgot-password']

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const refreshToken = request.cookies.get('refreshToken')?.value
  const path = request.nextUrl.pathname

  const isProtected = protectedRoutes.some((route) => path.startsWith(route))
  const isAuthPage = authPages.includes(path)

  if (path === '/') {
    if (token && validateFakeJWT(token)) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    } else {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  if (isAuthPage && token && validateFakeJWT(token)) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  if (isProtected) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    if (!validateFakeJWT(token)) {
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
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/signup',
    '/forgot-password',
    '/dashboard/:path*',
    '/invoices/:path*',
    '/expenses/:path*',
    '/taxes/:path*',
  ],
}
