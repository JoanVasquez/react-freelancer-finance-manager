import { AuthTokenPayload } from '@/types/auth'
import { AppError } from './errorHandler'

export function generateFakeJWT(
  payload: Omit<AuthTokenPayload, 'exp'>,
  expiresInSeconds = 3600,
): string {
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  }

  const exp = Math.floor(Date.now() / 1000) + expiresInSeconds
  const fullPayload: AuthTokenPayload = { ...payload, exp }

  const base64Header = btoa(JSON.stringify(header))
  const base64Payload = btoa(JSON.stringify(fullPayload))
  const fakeSignature = btoa(Math.random().toString(36).substring(2))

  return `${base64Header}.${base64Payload}.${fakeSignature}`
}

export function decodeFakeJWT(token: string): AuthTokenPayload | null {
  try {
    const [, payload] = token.split('.')
    return JSON.parse(atob(payload)) as AuthTokenPayload
  } catch {
    return null
  }
}

export function validateFakeJWT(token: string): boolean {
  try {
    const payload = decodeFakeJWT(token)
    if (!payload) return false

    const now = Math.floor(Date.now() / 1000)
    return payload.exp > now // token is valid if exp > now
  } catch (err) {
    throw new AppError('Error while validating the token', 500, err)
  }
}

export function refreshFakeJWT(
  token: string,
  extendSeconds = 3600,
): string | null {
  const payload = decodeFakeJWT(token)
  if (!payload) return null

  return generateFakeJWT(
    { userId: payload.userId, email: payload.email },
    extendSeconds,
  )
}
