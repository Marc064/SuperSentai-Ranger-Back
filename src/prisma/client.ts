import { PrismaClient } from '@prisma/client';
import { migrateUrl, accelerateUrl } from './prisma.config';

type AnyObj = Record<string, any>;

const options: AnyObj = {};

if (accelerateUrl) {
	// Use Prisma Accelerate
	options.accelerateUrl = accelerateUrl;
} else if (migrateUrl) {
	// Use direct DB adapter (MySQL, Postgres, etc.)
	options.adapter = { url: migrateUrl };
}

const prisma = new PrismaClient(options as any);

export default prisma;
