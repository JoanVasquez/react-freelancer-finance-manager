import { User } from '@/models'

export type UserRegistration = Omit<User, 'token' | 'preferences'>
