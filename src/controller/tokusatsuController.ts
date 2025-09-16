import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Saga Controllers
export function getAllSagas() {
    return prisma.saga.findMany();
}

export function getSagaByName(name: string) {
    console.log(name);

    return prisma.saga.findFirst({
        where: {
            saga: {
                contains: name
            }
        }
    })
}