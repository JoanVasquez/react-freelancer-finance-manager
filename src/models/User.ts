export interface User {
  id: string
  name: string
  email: string
  token: string
  preferences: {
    theme: 'light' | 'dark'
    currency: string
  }
}

