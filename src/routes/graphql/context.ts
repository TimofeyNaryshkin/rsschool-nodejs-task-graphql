import { MemberType, Post, PrismaClient, Profile, User } from '@prisma/client';
import DataLoader from 'dataloader';
import { postsByAuthorIdLoader } from './loaders/postsLoader.js';
import { profileByUserIdLoader } from './loaders/profileLoader.js';
import { userSubscribedToLoader } from './loaders/userSubsLoader.js';
import { subscribedToUserLoader } from './loaders/subbedOnUserLoader.js';
import { memberTypeLoader } from './loaders/memberTypeLoader.js';

export interface Loaders {
  postsByAuthorId: DataLoader<string, Post[]>;
  profileByUserId: DataLoader<string, Profile | null>;
  userSubscribedTo: DataLoader<string, User[]>;
  subscribedToUser: DataLoader<string, User[]>;
  memberType: DataLoader<string, MemberType>;
}

export interface GraphQLContext {
  prisma: PrismaClient;
  loaders: Loaders;
}

export const createLoaders = (prisma: PrismaClient): Loaders => {
  return {
    postsByAuthorId: postsByAuthorIdLoader(prisma),
    profileByUserId: profileByUserIdLoader(prisma),
    userSubscribedTo: userSubscribedToLoader(prisma),
    subscribedToUser: subscribedToUserLoader(prisma),
    memberType: memberTypeLoader(prisma),
  };
};

export const createContext = async (prisma: PrismaClient): Promise<GraphQLContext> => {
  return {
    prisma,
    loaders: createLoaders(prisma),
  };
};
