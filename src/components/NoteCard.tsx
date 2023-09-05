
import { Note } from "@/interfaces/notes"
import { useNotes } from "@/app/hooks/useNotes"


function NoteCard({ note }: { note: Note }) {
    const { deleteNote, setSelectedNote } = useNotes()

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
                <button
                    className="px-3 py-1 text-white bg-red-600 rounded-md hover:bg-red-700"
                    onClick={async () => {
                        if (confirm('Are you sure you want to delete this note?')) await deleteNote(note.id)
                    }}>Delete</button>
                <button
                    className="px-3 py-1 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                    onClick={() => setSelectedNote(note)}
                >Edit</button>
            </div>
        </div>
    )
}

export default NoteCard