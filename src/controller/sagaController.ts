import { PrismaClient } from "@prisma/client";
import { saga } from "../types/saga";

const prisma = new PrismaClient();

// Saga Controllers
export function getAllSagas() {
    return prisma.saga.findMany();
}

export function getSagaByName(name: string) {
    return prisma.saga.findFirst({
        where: {
            saga: {
                contains: name
            }
        }
    })
}

export function saveSaga(saga: saga) {
    return prisma.saga.create({
        data: saga
    })
}

export function updateSaga(id: number, saga: saga) {
    return prisma.saga.update({
        where: {
            idSaga: id
        },
        data: saga
    })
}

