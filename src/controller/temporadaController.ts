import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export function getTemporadasByIdSaga(id: number) {
    return prisma.temporada.findMany({
        where: {
            idSaga: id
        }
    });
}