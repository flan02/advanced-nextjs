'use client'
import { useEffect } from 'react'
import Form from '@/components/Form'
import { useNotes } from './hooks/useNotes'


//* Un contexto es un componente que va a englobar al resto y les va a permitir compartir estados

interface Note {
  id?: string
  title: string
  content: string
  createdAt?: string
  updatedAt?: string
}

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
            <div key={note.id} className='bg-slate-400 p-4 my-2'>
              <h2>{note.title}</h2>
              <p>{note.content}</p>
              {
                (note.updatedAt === note.createdAt)
                  ? (<p>createdAt {note.createdAt}</p>)
                  : (<p>updatedAt {note.updatedAt}</p>)
              }
              <br />
            </div>
          ))
        }
      </div>

    </div>
  )
}