
import { v4 as uuidv4 } from 'uuid'

export default abstract class GenericService<
  T extends { id?: string | number },
> {
  protected data: T[]

  constructor(initialData: T[] = []) {
    this.data = [...initialData]
  }

  getAll(): T[] {
    return [...this.data]
  }

  getById(id: string | number): T | undefined {
    const found = this.data.find((item) => item.id === id)
    return found ? { ...found } : undefined
  }

  create(item: T): T {
    const id = item.id ?? uuidv4()
    const created = { ...item, id } as T
    this.data.push(created)
    return { ...created }
  }

  update(id: string | number, partial: Partial<T>): T {
    const idx = this.data.findIndex((item) => item.id === id)
    if (idx === -1) {
      throw new Error(`Entity with id ${String(id)} not found`)
    }
    const merged = { ...this.data[idx], ...partial } as T
    this.data[idx] = merged
    return { ...merged }
  }

  remove(id: string | number): string | number {
    const before = this.data.length
    this.data = this.data.filter((item) => item.id !== id)
    if (this.data.length === before) {
      throw new Error(`Entity with id ${String(id)} not found`)
    }
    return id
  }
}
