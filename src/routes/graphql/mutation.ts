import { PrismaClient } from '@prisma/client';
import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { UserType } from './types/user.js';
import { CreateUser, CreateUserInput } from './inputs/createUser.js';
import { ProfileType } from './types/profile.js';
import { CreateProfile, CreateProfileInput } from './inputs/createProfile.js';
import { PostType } from './types/post.js';
import { CreatePost, CreatePostInput } from './inputs/createPost.js';
import { ChangePost, ChangePostInput } from './inputs/changePost.js';
import { UUIDType } from './types/uuid.js';
import { ChangeProfile, ChangeProfileInput } from './inputs/changeProfile.js';
import { ChangeUser, ChangeUserInput } from './inputs/changeUser.js';
import { GetById } from '../../types/utility.js';

export const MutationType = new GraphQLObjectType<unknown, PrismaClient>({
  name: 'Mutation',
  fields: () => ({
    createUser: {
      type: new GraphQLNonNull(UserType),
      args: {
        dto: { type: new GraphQLNonNull(CreateUserInput) },
      },
      resolve: async (_src, args: { dto: CreateUser }, prisma) => {
        const user = await prisma.user.create({
          data: args.dto,
        });
        return user;
      },
    },
    createProfile: {
      type: new GraphQLNonNull(ProfileType),
      args: {
        dto: { type: new GraphQLNonNull(CreateProfileInput) },
      },
      resolve: async (_src, args: { dto: CreateProfile }, prisma) => {
        const profile = await prisma.profile.create({
          data: args.dto,
        });
        return profile;
      },
    },
    createPost: {
      type: new GraphQLNonNull(PostType),
      args: {
        dto: { type: new GraphQLNonNull(CreatePostInput) },
      },
      resolve: async (_src, args: { dto: CreatePost }, prisma) => {
        const post = await prisma.post.create({
          data: args.dto,
        });
        return post;
      },
    },
    changePost: {
      type: new GraphQLNonNull(PostType),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangePostInput) },
      },
      resolve: async (_src, args: { id: string; dto: ChangePost }, prisma) => {
        const newPost = await prisma.post.update({
          where: {
            id: args.id,
          },
          data: args.dto,
        });
        return newPost;
      },
    },
    changeProfile: {
      type: new GraphQLNonNull(ProfileType),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangeProfileInput) },
      },
      resolve: async (_src, args: { id: string; dto: ChangeProfile }, prisma) => {
        const newProfile = await prisma.profile.update({
          where: {
            id: args.id,
          },
          data: args.dto,
        });
        return newProfile;
      },
    },
    changeUser: {
      type: new GraphQLNonNull(UserType),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangeUserInput) },
      },
      resolve: async (_src, args: { id: string; dto: ChangeUser }, prisma) => {
        const newUser = await prisma.user.update({
          where: {
            id: args.id,
          },
          data: args.dto,
        });
        return newUser;
      },
    },
    deleteUser: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_src, args: GetById, prisma) => {
        const deleteUserResponse = await prisma.user.delete({
          where: {
            id: args.id,
          },
        });
        return `User ${deleteUserResponse.name} is deleted`;
      },
    },
    deletePost: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_src, args: GetById, prisma) => {
        const deletePostResponse = await prisma.post.delete({
          where: {
            id: args.id,
          },
        });
        return `Post ${deletePostResponse.title} is deleted`;
      },
    },
    deleteProfile: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_src, args: GetById, prisma) => {
        const deleteProfileResponse = await prisma.profile.delete({
          where: {
            id: args.id,
          },
        });
        return `Profile ${deleteProfileResponse.id} is deleted`;
      },
    },
    subscribeTo: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_src, args: { userId: string; authorId: string }, prisma) => {
        await prisma.subscribersOnAuthors.create({
          data: {
            subscriberId: args.userId,
            authorId: args.authorId,
          },
        });
        return `Subscribed successfully`;
      },
    },
    unsubscribeFrom: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        userId: { type: new GraphQLNonNull(UUIDType) },
        authorId: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_src, args: { userId: string; authorId: string }, prisma) => {
        await prisma.subscribersOnAuthors.delete({
          where: {
            subscriberId_authorId: {
              subscriberId: args.userId,
              authorId: args.authorId,
            },
          },
        });
        return `Unsubscribed successfully`;
      },
    },
  }),
});
