import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    user: async (_: any, { id }: { id: number }) => {
      return await prisma.user.findUnique({
        where: { id },
      });
    },
  },
};