// src/services/GenericService.ts
import { v4 as uuidv4 } from 'uuid'

/**
 * Generic in-memory service with safe returns and stable shapes.
 * - Clona entradas/salidas para evitar mutaciones externas.
 * - Expone delete(id) para compatibilidad y remove(id) como alias.
 */
export default abstract class GenericService<
  T extends { id?: string | number },
> {
  protected data: T[]

  constructor(initialData: T[] = []) {
    // evita compartir la referencia con quien pase el seed
    this.data = [...initialData]
  }

  getAll(): T[] {
    // devuelve SIEMPRE una nueva copia
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

  /** Preferred name */
  remove(id: string | number): string | number {
    const before = this.data.length
    this.data = this.data.filter((item) => item.id !== id)
    if (this.data.length === before) {
      throw new Error(`Entity with id ${String(id)} not found`)
    }
    return id
  }
}
