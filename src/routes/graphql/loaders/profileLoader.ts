import { PrismaClient, Profile } from "@prisma/client";
import DataLoader from "dataloader";

export const profileByUserIdLoader = (prisma: PrismaClient) => {
  return new DataLoader<string, Profile | null>(async (ids) => {
    const profiles = await prisma.profile.findMany({
      where: { userId: { in: ids as string[] } },
    });
    const byUserId = new Map(profiles.map((p) => [p.userId, p]));

    return ids.map((id) => byUserId.get(id) ?? null);
  });
};
