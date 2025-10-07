import { PrismaClient } from "@prisma/client";
import { getTematicasByIdTemporada } from "./temporadaTematicaController";

const prisma = new PrismaClient();

export async function getTemporadasByIdSaga(id: number) {

    const temporadas = await prisma.temporada.findMany({
        where: { idSaga: id },
        include: { tipo: true },
    });

    const temporadasConTematicas = await Promise.all(
        temporadas.map(async (temp) => {
            const tematicas = await getTematicasByIdTemporada(temp.idTemporada);
            return { ...temp, tematica: tematicas };
        })
    );

    return temporadasConTematicas;
}
