
export interface Note {
    id: string
    title: string
    content: string
    createdAt: string
    updatedAt: string
}

//* Los tipos de datos deben ser en UpperCase
export type CreateNote = Omit<Note, 'id' | 'createdAt' | 'updatedAt'>