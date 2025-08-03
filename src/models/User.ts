export interface User {
  id?: string
  name: string
  email: string
  password: string
  token: string
  preferences: {
    theme: 'light' | 'dark'
    currency: string
  }
}
