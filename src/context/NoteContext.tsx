'use client'
import { Note, CreateNote } from '@/interfaces/notes'
import { createContext, useState } from 'react'


//* Definimos los tipos de datos que va a tener el contexto
export const NoteContext = createContext<{
    notes: Note[],
    loadNotes: () => Promise<void>,
    createNote: (note: CreateNote) => Promise<void>,
    deleteNote: (id: string) => Promise<void>,
    selectedNote: Note | null,
    setSelectedNote: (note: Note | null) => void
}>({
    notes: [],
    loadNotes: async () => { },
    createNote: async (note: CreateNote) => { },
    deleteNote: async (id: string) => { },
    selectedNote: null,
    setSelectedNote: (note: Note | null) => { }
})



export const NotesProvider = ({ children }: { children: React.ReactNode }) => {
    const [notes, setNotes] = useState<Note[]>([])
    const [selectedNote, setSelectedNote] = useState<Note | null>(null)

    async function loadNotes() {

        const res = await fetch('/api/notes') // lado servidor lleva http://localhost:3000
        const data = await res.json()
        setNotes(data)
    }

    async function createNote(note: CreateNote) {
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

    async function deleteNote(id: string) {
        const res = await fetch(`/api/notes/${id}`, {
            method: 'DELETE'
        })
        //const data = await res.json()
        setNotes(notes.filter(note => note.id !== id))

    }

    return <NoteContext.Provider value={{ notes, loadNotes, createNote, deleteNote, selectedNote, setSelectedNote }}>
        {children}
    </NoteContext.Provider>
}