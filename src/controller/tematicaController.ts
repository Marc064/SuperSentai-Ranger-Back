import { PrismaClient } from "@prisma/client";
import { tematica } from "../types/tematica";

const prisma = new PrismaClient();

export function getAllTematicas() {
    return prisma.tematica.findMany();
}

export function saveTematica(tematica: tematica) {
    return prisma.tematica.create({
        data: tematica
    })
}

export function updateTematica(id: number, tematica: tematica) {
    return prisma.tematica.update({
        where: {
            idTematica: id
        },
        data: tematica
    })
}