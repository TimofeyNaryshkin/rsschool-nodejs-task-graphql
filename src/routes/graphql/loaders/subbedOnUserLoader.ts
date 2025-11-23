import { PrismaClient, User } from "@prisma/client";
import DataLoader from "dataloader";

export const subscribedToUserLoader = (prisma: PrismaClient) => {
  return new DataLoader<string, User[]>(async (ids) => {
    const users = await prisma.subscribersOnAuthors.findMany({
      where: { authorId: { in: ids as string[] } },
      include: { subscriber: true },
    })

    const byAuthorId  = new Map<string, User[]>()
    users.forEach((u) => {
      const subscribers = byAuthorId.get(u.authorId) || []
      subscribers.push(u.subscriber)
      byAuthorId.set(u.authorId, subscribers)
    })
    return ids.map((id) => byAuthorId.get(id) ?? [])
  });
};