'use client'
import { useEffect } from 'react'
import Form from '@/components/Form'
import { useNotes } from './hooks/useNotes'
import NoteCard from '@/components/NoteCard'
import { Note } from '@/interfaces/notes'


//* Un contexto es un componente que va a englobar al resto y les va a permitir compartir estados



export default function HomePage() {
  const { notes, loadNotes } = useNotes()

  useEffect(() => {
    loadNotes()
  }, [])
  return (
    <div className='flex items-center justify-center h-screen'>
      <div>
        <Form />
        {
          notes.map((note: Note) => (
            <NoteCard note={note} key={note.id} />
          ))
        }
      </div>

    </div>
  )
}