import { Post, PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';

export const postsByAuthorIdLoader = (prisma: PrismaClient) => {
  return new DataLoader<string, Post[]>(async (ids) => {
    const posts = await prisma.post.findMany({
      where: {authorId: {in: ids as string[]}}
    })

    const byAuthorId = new Map<string, Post[]>()
    posts.forEach((p) => {
      const authorPosts = byAuthorId.get(p.authorId) || []
      authorPosts.push(p)
      byAuthorId.set(p.authorId, authorPosts)
    })
    return ids.map((id) => byAuthorId.get(id) ?? [])
  });
};
