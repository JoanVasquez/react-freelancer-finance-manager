export default abstract class GenericService<T extends {id: string | number }> {
    protected data: T[] = [];

    constructor(initialData: T[] = []) {
        this.data = initialData;
    }

    getAll(): T[] {
        return this.data;
    }

    getById(id: string | number): T | undefined {
        return this.data.find((item: T) => item.id === id);
    }

    create(item: T): T {
        this.data.push(item);
        return item;
    }

    update(id: string | number, updatedItem: Partial<T>): T | undefined {
        const index = this.data.findIndex((item: T) => item.id === id);
        if(index !== -1) {
            this.data[index] = { ...this.data[index], ...updatedItem };
            return this.data[index];
        }

        return undefined;
    }

    delete(id: string | number) {
        const index = this.data.findIndex((item: T) => item.id === id);
        if(index !== -1) {
            this.data.splice(index, 1);
            return true;
        }
        return false;
    }

}
