import Form from '@/components/Form'
import Image from 'next/image'

async function loadNotes() {
  const res = await fetch('http://localhost:3000/api/notes')
  const data = await res.json()
  //console.log(data)
  return data
}

interface Note {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt?: string
}

export default async function HomePage() {
  const notes = await loadNotes()
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