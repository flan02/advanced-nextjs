'use client'
import { useNotes } from '@/app/hooks/useNotes';
import { HiSun, HiMoon } from 'react-icons/hi'

function Navbar() {
    const { background, setBackground } = useNotes()

    return (
        <nav className={`flex ${(background === 'light') ? "bg-orange-100" : "bg-slate-900"} text-6xl py-6`}>
            <h1 className="w-max mx-auto text-blue-600 ">TV shows & Movies</h1>
            <HiMoon
                onClick={() => {
                    setBackground('dark')
                    localStorage.setItem('background', 'dark')
                }}
                className={`text-slate-700 text-3xl mr-6 ${(background === 'light') ? "block" : "hidden"}`} />
            <HiSun
                onClick={() => {
                    setBackground('light')
                    localStorage.setItem('background', 'light')
                }}
                className={`text-yellow-300 text-3xl mr-6 ${(background === 'dark') ? "block" : "hidden"}`} />
        </nav>
    )
}

export default Navbar