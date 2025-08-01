import { User } from "@/models";
import GenericService from "./GenericService";

export default class UserService extends GenericService<User> {
  constructor() {
    super([])
  }

  login(email: string, password: string): User | null {
    // Fake auth: just check if email exists in data
    const user = this.getAll().find(u => u.email === email)
    return user || null
  }

  setTheme(userId: string, theme: User['preferences']['theme']): void {
    this.update(userId, { preferences: { ...this.getById(userId)?.preferences, theme } })
  }
}

