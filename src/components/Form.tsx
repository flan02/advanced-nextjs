'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

function Form() {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const router = useRouter()
    return (
        <form onSubmit={async (e) => {
            e.preventDefault()
            //console.log(title, content);
            const res = await fetch('/api/notes', { // como es lado cliente, no se pone http://localhost:3000
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, content })
            })
            const data = await res.json()
            console.log(data)
            router.refresh()

        }}>
            <input
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 my-2 text-black bg-white rounded-md focus:outline-none focus:online-none focus:ring-2 focus:ring-blue-600"
                type="text" name="title" id="" autoFocus placeholder="Title" />
            <textarea
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-2 my-2 text-black bg-white rounded-md focus:outline-none focus:online-none focus:ring-2 focus:ring-blue-600"
                name="content" id="" autoFocus placeholder="Content" >
            </textarea>
            <button
                className="px-5 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                type="submit">Save</button>
        </form >
    )
}

export default Form