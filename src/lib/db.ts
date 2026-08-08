import { PrismaClient } from '@prisma/client'
import { PrismaD1 } from '@prisma/adapter-d1'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

let prismaInstance: PrismaClient | null = null;

function createPrismaClient() {
  // Check if running on Cloudflare Workers with D1 binding
  const d1 = (globalThis as any).DB
  if (d1) {
    const adapter = new PrismaD1(d1)
    return new PrismaClient({ adapter })
  }
  
  // Local development with SQLite
  return new PrismaClient({
    log: ['query'],
  })
}

export function getDb() {
  if (!prismaInstance) {
    prismaInstance = createPrismaClient()
    if (process.env.NODE_ENV !== 'production') {
      globalForPrisma.prisma = prismaInstance
    }
  }
  return prismaInstance
}
