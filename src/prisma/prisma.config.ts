// Prisma configuration entrypoint for Migrate and runtime
// Move connection URLs here (Prisma 7):
// - For Migrate: export `migrateUrl` (used by CLI/tools)
// - For runtime: export `accelerateUrl` or `migrateUrl` for direct DB adapter

export const migrateUrl: string | undefined = process.env.DATABASE_URL;
export const accelerateUrl: string | undefined = process.env.PRISMA_ACCELERATE_URL;

export default {
  migrate: {
    url: migrateUrl,
  },
  accelerateUrl,
};
// Exporta las variables que usarán las migraciones y el cliente
export const prismaConfig = {
  migrate: {
    url: process.env.DATABASE_URL,
    provider: "mysql"
  },
};