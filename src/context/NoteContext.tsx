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
    setSelectedNote: (note: Note | null) => void,
    updateNote: (id: string, note: CreateNote) => Promise<void>
}>({
    notes: [],
    loadNotes: async () => { },
    createNote: async (note: CreateNote) => { },
    deleteNote: async (id: string) => { },
    selectedNote: null,
    setSelectedNote: (note: Note | null) => { },
    updateNote: async (id: string, note: CreateNote) => { }
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

    async function updateNote(id: string, note: CreateNote) {
        const res = await fetch(`/api/notes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
        })
        const noteUpdated = await res.json()

        // si el nota.id recorrido de las notas en la bbdd es igual al id pasado por param, colocamos datos nuevos sino dejamos la nota tal cual estaba
        setNotes(notes.map(note => (note.id === id) ? noteUpdated : note))
    }

    return <NoteContext.Provider value={{ notes, loadNotes, createNote, deleteNote, selectedNote, setSelectedNote, updateNote }}>
        {children}
    </NoteContext.Provider>
}