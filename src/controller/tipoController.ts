import { PrismaClient } from "@prisma/client";
import { tipo } from "../types/tipo";

const prisma = new PrismaClient();

export function getAllTipos() {
    return prisma.tipo.findMany();
}

export function findById(id: number) {
    return prisma.tipo.findUnique({
        where: {
            idTipo: id
        }
    });
}

export function saveTipo(tipo: tipo) {
    return prisma.tipo.create({
        data: tipo
    })
}

export function updateTipo(id: number, tipo: tipo) {
    return prisma.tipo.update({
        where: {
            idTipo: id
        },
        data: tipo
    })
}