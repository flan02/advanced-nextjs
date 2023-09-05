
import { Note } from "@/interfaces/notes"
import { useNotes } from "@/app/hooks/useNotes"
import { HiTrash } from "react-icons/hi";
import { HiPencilAlt } from "react-icons/hi";


function NoteCard({ note }: { note: Note }) {
    const { deleteNote, setSelectedNote, background } = useNotes()

    return (
        <>
            <section className="flex gap-x-4">
                <div key={note.id} className={`flex flex-grow ${(background === 'light') ? "bg-gray-200" : "bg-slate-700"} p-4 my-2`}>
                    <div className="">
                        <h2 className="text-2xl font-bold">{note.title}</h2>
                        <p>{note.content}</p>
                        {
                            (note.updatedAt === note.createdAt)
                                ? (<p>{`createdAt: ${new Date(note.createdAt).toLocaleDateString()}`}</p>)
                                : (<p>{`updatedAt: ${new Date(note.updatedAt).toLocaleDateString()}`}</p>)
                        }
                    </div>

                </div>
                <div className="flex flex-col align-content-center my-auto gap-y-2">
                    <button
                        onClick={async () => {
                            if (confirm('Are you sure you want to delete this note?')) await deleteNote(note.id)
                        }}><HiTrash className="text-3xl text-red-600 hover:text-red-700" /></button>
                    <button

                        onClick={() => setSelectedNote(note)}
                    ><HiPencilAlt className="text-3xl text-blue-600 hover:text-blue-700" /></button>
                </div>
            </section>

        </>
    )
}

export default NoteCard