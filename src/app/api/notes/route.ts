import { NextResponse } from "next/server"
import { prisma } from "@/libs/prisma"

export async function GET() {
    try {
        //throw new Error('artificial Error...')
        const notesFound = await prisma.note.findMany()
        return NextResponse.json(notesFound)
    } catch (error: unknown) {
        if (error instanceof Error) { // lo hizo el copiloto de github
            return NextResponse.json({
                message: error.message
            }, { status: 500 })
        }
    }
    throw new Error('Unreachable code detected.')
}

export async function POST(req: Request) { // Request objeto global de js que nos permite acceder a la info de la peticion
    try {
        //throw new Error('artificial Error...')
        const { title, content } = await req.json() // son las prop enviadas por el cliente
        const noteCreated = await prisma.note.create({
            data: {
                title,
                content
            }
        })
        return NextResponse.json(noteCreated)
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({
                message: error.message
            }, { status: 500 })
        }
    }
}
