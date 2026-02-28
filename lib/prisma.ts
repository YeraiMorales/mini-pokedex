import { PrismaClient } from '@/app/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// adapter es necesario para que Prisma funcione en entornos serverless como Vercel, ya que mantiene la conexión a la base de datos abierta entre invocaciones, evitando el problema de "too many connections". En desarrollo, también ayuda a evitar crear múltiples instancias de PrismaClient.
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;