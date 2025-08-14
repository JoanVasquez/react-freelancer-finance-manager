import { User } from '@/models'
import { UserWithoutPassword } from '@/types/user'
import GenericService from './GenericService'
import { AppError } from '@/lib/errorHandler'
import { generateFakeJWT } from '@/lib/fakeJwt'
import { UserRegistration } from '@/types/signup'
import { user_data } from '@/utils/tmp_data'

export default class UserService extends GenericService<User> {
  constructor() {
    super(user_data)
  }

  login(email: string, password: string): UserWithoutPassword | null {
    // Fake auth: just check if email exists in data
    try {
      const user = this.getAll().find((u) => u.email === email)

      if (!user) throw new AppError(`User with email ${email} not found`, 403)
      if (user.password !== password) throw new AppError(`Bad credentials`, 403)

      const token = generateFakeJWT({ userId: user.id!, email: email })
      user.token = token

      const userWithoutPassword: UserWithoutPassword = { ...user }
      return userWithoutPassword
    } catch (err) {
      throw new AppError('Failed to login', 500, err)
    }
  }

  signUp(user: UserRegistration): UserWithoutPassword {
    try {
      const doesUserExitis = this.getAll().find(
        (u: User) => u.email === user.email,
      )

      if (doesUserExitis)
        throw new AppError(`User with email ${user.email} already exits`, 500)

      const newUser = this.create({
        ...user,
        token: '',
        preferences: { theme: 'light', currency: 'USD' },
      })
      const token = generateFakeJWT({ userId: user.id!, email: user.email })
      newUser.token = token

      const userWithoutPassword: UserWithoutPassword = { ...newUser }

      return userWithoutPassword
    } catch (err) {
      throw new AppError('Failed to signup', 500, err)
    }
  }

  setTheme(userId: string, theme: User['preferences']['theme']): void {
    const user = this.getById(userId)
    if (!user) {
      throw new AppError(`User with id ${userId} not found`, 404)
    }
    this.update(userId, {
      preferences: { ...user.preferences, theme },
    })
  }
}
