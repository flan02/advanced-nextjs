'use client'
import { useState, useRef, useEffect } from 'react'
import { useNotes } from '../app/hooks/useNotes'
//import { NoteContext } from '@/context/NoteContext'


function Form() {
    const [title, setTitle] = useState<string>('')
    const [content, setContent] = useState<string>('')
    const titleRef = useRef<HTMLInputElement>(null)
    const { createNote, selectedNote, setSelectedNote } = useNotes()

    useEffect(() => {
        if (selectedNote) {
            setTitle(selectedNote.title)
            setContent(selectedNote.content)
        }
    }, [selectedNote])

    return (
        <>
            <h1 className='flex justify-center mb-4 text-5xl'>{(selectedNote) ? "Edit Note" : "Add Note"}</h1>
            <form onSubmit={async (e) => {
                e.preventDefault()
                await createNote({
                    title,
                    content
                })
                setTitle('')
                setContent('')
                titleRef.current?.focus()
            }}>
                <input
                    ref={titleRef}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2 my-2 text-black bg-white rounded-md focus:outline-none focus:online-none focus:ring-2 focus:ring-blue-600"
                    type="text" name="title" id="" autoFocus placeholder="Title" />
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full px-4 py-2 my-2 text-black bg-white rounded-md focus:outline-none focus:online-none focus:ring-2 focus:ring-blue-600"
                    name="content" id="" autoFocus placeholder="Content" >
                </textarea>
                <div className='flex justify-end gap-x-2'>
                    <button
                        className="px-5 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
                        type="submit">Save
                    </button>
                    {
                        (selectedNote) && (
                            <button
                                onClick={() => {
                                    setSelectedNote(null)
                                    setTitle('')
                                    setContent('')
                                }}
                                className="px-5 py-2 text-white bg-red-600 rounded-md hover:bg-red-700"
                                type="button">Cancel
                            </button>
                        )
                    }


                </div>
            </form >
        </>
    )
}

export default Form