import { MemberType, PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';

export const memberTypeLoader = (prisma: PrismaClient) => {
  return new DataLoader<string, MemberType>(async (ids) => {
    const memberTypes = await prisma.memberType.findMany({
      where: { id: { in: ids as string[] } },
    });

    const byId = new Map(memberTypes.map((t) => [t.id, t]));

    return ids.map((id) => {
      const memberType = byId.get(id);
      if (!memberType) {
        return new Error(`MemberType not found: ${id}`);
      }
      return memberType;
    });
  });
};
