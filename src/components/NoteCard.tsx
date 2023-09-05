
import { Note } from "@/interfaces/notes"
import { useNotes } from "@/app/hooks/useNotes"


function NoteCard({ note }: { note: Note }) {
    const { deleteNote } = useNotes()

    return (
        <div key={note.id} className='flex justify-between bg-slate-400 p-4 my-2'>
            <div>
                <h2 className="text-2xl font-bold">{note.title}</h2>
                <p>{note.content}</p>
                {
                    (note.updatedAt === note.createdAt)
                        ? (<p>createdAt {note.createdAt}</p>)
                        : (<p>updatedAt {note.updatedAt}</p>)
                }
            </div>
            <div className="flex flex-col justify-end gap-y-2">
                <button onClick={async () => {
                    if (confirm('Are you sure you want to delete this note?')) await deleteNote(note.id)
                }}>Delete</button>
                <button>Edit</button>
            </div>
        </div>
    )
}

export default NoteCard