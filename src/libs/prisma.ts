//* Nos permite conectarnos a la bbdd mediante la dependencia prisma client
import { PrismaClient } from '@prisma/client';

declare global {
    var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

//? En development, establecemos la variable global para evitar la sobrecarga de prisma por multiples instancias en hot-reloading de nextjs
if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
