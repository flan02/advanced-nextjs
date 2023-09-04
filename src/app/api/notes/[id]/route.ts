import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/libs/prisma";

interface Params {
    params:
    {
        id: string
    }
}

export async function GET(req: Request, { params }: Params) {
    try {
        //throw new Error('artificial Error...')
        const noteFound = await prisma.note.findUnique({ // findUnique busca un registro por su id tambien existe findFirst
            where: {
                id: Number(params.id) // el id es un string, pero en la bd es un int
            }
        })
        //if (!noteFound) throw new Error(`Note ${params.id} not found`)
        if (!noteFound) return NextResponse.json({
            message: `Note ${params.id} not found`
        }, { status: 404 })
        return NextResponse.json(noteFound)
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({
                message: error.message
            }, { status: 500 })
        }
    }
}

export async function DELETE(req: Request, { params }: Params) {
    try {
        /*
        const noteFound = await prisma.note.findUnique({
            where: {
                id: Number(params.id)
            }
        })
            if (!noteFound) {
                return NextResponse.json({
                    message: `Note ${params.id} not found`
                }, { status: 404 })
            } else {*/
        const noteDeleted = await prisma.note.delete({
            where: {
                id: Number(params.id)
            }
        })
        return NextResponse.json(`Note: ${noteDeleted.title} deleted`)
        //  }   Validacion casera requiere mas codigo y mas consultas a la bd
    } catch (error: unknown) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025')
                return NextResponse.json({
                    message: `Note ${params.id} not found`
                }, { status: 404 })
        }
        if (error instanceof Error) {
            return NextResponse.json({
                message: error.message
            }, { status: 500 })
        }
    }
}

export async function PUT(req: Request, { params }: Params) {
    try {
        const data = await req.json()
        const noteUpdated = await prisma.note.update({
            where: {
                id: Number(params.id)
            },
            data
        })
        return NextResponse.json(noteUpdated)
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025')
                return NextResponse.json({
                    message: `Note ${params.id} not found`
                }, { status: 404 })
        }
        if (error instanceof Error) {
            return NextResponse.json({
                message: error.message
            }, { status: 500 })
        }
    }
}