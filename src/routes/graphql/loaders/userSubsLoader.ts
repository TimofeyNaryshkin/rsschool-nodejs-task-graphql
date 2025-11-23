import { PrismaClient, User } from '@prisma/client';
import DataLoader from 'dataloader';

export const userSubscribedToLoader = (prisma: PrismaClient) => {
  return new DataLoader<string, User[]>(async (ids) => {
    const users = await prisma.subscribersOnAuthors.findMany({
      where: { subscriberId: { in: ids as string[] } },
      include: { author: true },
    });

    const bySubscriberId = new Map<string, User[]>();
    users.forEach((u) => {
      const authors = bySubscriberId.get(u.subscriberId) || [];
      authors.push(u.author);
      bySubscriberId.set(u.subscriberId, authors);
    });
    return ids.map((id) => bySubscriberId.get(id) ?? []);
  });
};
