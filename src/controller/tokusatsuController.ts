import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export function getAllSagas() {
    return prisma.saga.findMany();
}