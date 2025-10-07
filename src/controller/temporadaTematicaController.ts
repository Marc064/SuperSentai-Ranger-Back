import { PrismaClient } from "@prisma/client";
import { temporadaTematica } from "../types/temporadaTematica";

const prisma = new PrismaClient();

export async function getTematicasByIdTemporada(id: number) {
    const tematicas = await prisma.tEMPORADA_TEMATICA.findMany({
        where: { ID_TEMPORADA: id },
        include: { TEMATICA: true },
    });

    return tematicas.map((tt) => tt.TEMATICA.tematica);
}

export function saveTemporadaTematica(temporadaTematica: temporadaTematica) {
    return prisma.tEMPORADA_TEMATICA.create({
        data: {
            ID_TEMPORADA: temporadaTematica.idTemporada,
            ID_TEMATICA: temporadaTematica.idTematica,
        },
    });
}

export function updateTemporadaTematica(id: number, temporadaTematica: temporadaTematica) {
    return prisma.tEMPORADA_TEMATICA.update({
        where: {
            ID_TEMPORADA_TEMATICA: id
        },
        data: {
            ID_TEMPORADA: temporadaTematica.idTemporada,
            ID_TEMATICA: temporadaTematica.idTematica,
        }
    })
}