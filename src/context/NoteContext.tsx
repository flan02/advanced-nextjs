'use client'
import { createContext, useState } from 'react'

interface Note {
    id?: string
    title: string
    content: string
    createdAt?: string
    updatedAt?: string
}

export const NoteContext = createContext<{
    notes: Note[],
    loadNotes: () => Promise<void>,
    createNote: (note: Note) => Promise<void>
}>({
    notes: [],
    loadNotes: async () => { },
    createNote: async (note: Note) => { }
})



export const NotesProvider = ({ children }: { children: React.ReactNode }) => {
    const [notes, setNotes] = useState<Note[]>([])

    async function loadNotes() {

        const res = await fetch('/api/notes') // lado servidor lleva http://localhost:3000
        const data = await res.json()
        setNotes(data)
    }

    async function createNote(note: Note) {
        const res = await fetch('/api/notes', { // como es lado cliente, no se pone http://localhost:3000
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
        const data = await res.json()
        setNotes([...notes, data])
        //console.log(data)
    }
    return <NoteContext.Provider value={{ notes, loadNotes, createNote }}>
        {children}
    </NoteContext.Provider>
}