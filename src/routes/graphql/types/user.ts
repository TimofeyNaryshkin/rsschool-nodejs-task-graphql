import {
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { Post, PostType } from './post.js';
import { Profile, ProfileType } from './profile.js';
import { UUIDType } from './uuid.js';
import { PrismaClient } from '@prisma/client';

export interface User {
  id: string;
  name: string;
  balance: number;
  profile: Profile | null;
  posts: Post[];
  userSubscribedTo: User[];
  subscribedToUser: User[];
}

export const UserType: GraphQLObjectType<User, PrismaClient> = new GraphQLObjectType<
  User,
  PrismaClient
>({
  name: 'User',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
    profile: {
      type: ProfileType,
      resolve: (user, _args, prisma) => {
        return prisma.profile.findUnique({
          where: {
            userId: user.id,
          },
        });
      },
    },
    posts: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(PostType))),
      resolve: (user, _args, prisma) => {
        return prisma.post.findMany({
          where: {
            authorId: user.id,
          },
        });
      },
    },
    userSubscribedTo: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType))),
      resolve: (user, _args, prisma) => {
        return prisma.user.findMany({
          where: {
            subscribedToUser: {
              some: { subscriberId: user.id },
            },
          },
        });
      },
    },
    subscribedToUser: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType))),
      resolve: (user, _args, prisma) => {
        return prisma.user.findMany({
          where: {
            userSubscribedTo: {
              some: { authorId: user.id },
            },
          },
        });
      },
    },
  }),
});
