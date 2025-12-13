import { PrismaClient } from '../app/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
// import { queryTags } from '@prisma/sqlcommenter-query-tags';
// import { traceContext } from '@prisma/sqlcommenter-trace-context';

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

const adapter = new PrismaPg({
  connectionString: `${process.env.DATABASE_URL}`,
});

const prisma = globalForPrisma.prisma || new PrismaClient({
  adapter,
  // comments: [queryTags(), traceContext()],
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;