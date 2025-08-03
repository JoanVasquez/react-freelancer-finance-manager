import { AuthTokenPayload } from '@/types/auth'

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
