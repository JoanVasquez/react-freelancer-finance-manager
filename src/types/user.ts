import { User } from '@/models'

export type UserWithoutPassword = Omit<User, 'password'>
export type UserProfileChange = Omit<User, 'password' & 'token' & 'email'>
