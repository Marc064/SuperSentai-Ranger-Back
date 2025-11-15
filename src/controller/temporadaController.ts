import { PrismaClient } from "@prisma/client";
import { getTematicasByIdTemporada } from "./temporadaTematicaController";
import { temporada } from "../types/temporada";

const prisma = new PrismaClient();

export function parseHoraToDate(hora: string): Date {
    const partes = hora?.split(':').map(Number) ?? [];
    const h = partes[0] ?? 0;
    const m = partes[1] ?? 0;
    const s = partes[2] ?? 0;

    const fecha = new Date();
    fecha.setUTCHours(h);
    fecha.setUTCMinutes(m);
    fecha.setUTCSeconds(s);
    fecha.setUTCMilliseconds(0);

    return fecha;
}

function formatTime(date: Date): string {
    const d = new Date(date);
    const h = String(d.getUTCHours()).padStart(2, '0');
    const m = String(d.getUTCMinutes()).padStart(2, '0');
    const s = String(d.getUTCSeconds()).padStart(2, '0');
    return `${h}:${m}:${s}`;
}

export async function getTemporadasByIdSaga(id: number) {
    const temporadas = await prisma.temporada.findMany({
        where: { idSaga: id },
        include: { tipo: true },
    });

    const temporadasConTematicas = await Promise.all(
        temporadas.map(async (temp) => {
            const tematicas = await getTematicasByIdTemporada(temp.idTemporada);
            const duracionFormateada = formatTime(temp.duracionVisto);
            return {
                ...temp,
                duracionVisto: duracionFormateada, // 👈 Aquí el formato HH:MM:SS
                tematica: tematicas
            };
        })
    );

    return temporadasConTematicas;
}


export async function saveTemporada(temporada: temporada) {
    const nuevaTemporada = await prisma.temporada.create({
        data: {
            ...temporada,
            duracionVisto: parseHoraToDate(temporada.duracionVisto as unknown as string),
        },
    });

    return {
        ...nuevaTemporada,
        duracionVisto: formatTime(nuevaTemporada.duracionVisto),
    };
}

export async function updateTemporada(id: number, temporada: temporada) {
    const actualizado = await prisma.temporada.update({
        where: { idTemporada: id },
        data: {
            ...temporada,
            duracionVisto: parseHoraToDate(temporada.duracionVisto as unknown as string)
        }
    })
    return {
        ...actualizado,
        duracionVisto: formatTime(actualizado.duracionVisto),
    };
}


export async function updateLinkVideo(id: number, linkVideo: string) {
    const actualizado = await prisma.temporada.update({
        where: {
            idTemporada: id
        },
        data: {
            link: linkVideo
        }
    })
    return {
        ...actualizado,
        duracionVisto: formatTime(actualizado.duracionVisto),
    };
}

export async function updateVisto(id: number, visto: number) {
    return await prisma.$transaction(async (tx) => {
        const temporada = await tx.temporada.findUnique({
            where: { idTemporada: id },
            select: { episodios: true }
        });

        if (!temporada) {
            throw new Error('Temporada no encontrada');
        }

        if (visto > temporada.episodios) {
            throw new Error('No se puede actualizar: visto excede los episodios.');
        }

        const completado = visto === temporada.episodios ? 'S' : 'N';

        const actualizado = await tx.temporada.update({
            where: { idTemporada: id },
            data: {
                visto: visto,
                completado: completado
            }
        });
        return {
            ...actualizado,
            duracionVisto: formatTime(actualizado.duracionVisto),
        }
    });
}


export async function updateDuracionVisto(id: number, duracionVisto: string) {
    const duracionTemporada = await prisma.temporada.update({
        where: {
            idTemporada: id
        },
        data: {
            duracionVisto: parseHoraToDate(duracionVisto)
        }
    })
    return {
        ...duracionTemporada,
        duracionVisto: formatTime(duracionTemporada.duracionVisto),
    };
}

export function deleteTemporada(id: number) {
    return prisma.temporada.delete({
        where: {
            idTemporada: id
        }
    })
}
