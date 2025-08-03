import { User } from '@/models'

export type UserWithoutPassword = Omit<User, 'password'>
