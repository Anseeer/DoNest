export interface IWrite<T> {
    create(item: Partial<T>): Promise<T>;
    delete(id: string): Promise<boolean>;
    update(id: string, item: Partial<T>): Promise<T>;
}

export interface IRead<T> {
    findById(id: string): Promise<T | null>;
    findByEmail(email: string): Promise<T | null>;
}