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
        input: { type: new GraphQLNonNull(CreateUserInput) },
      },
      resolve: async (_src, args: { input: CreateUser }, prisma) => {
        const { name, balance } = args.input;
        const user = await prisma.user.create({
          data: {
            name,
            balance,
          },
        });
        return user;
      },
    },
    createProfile: {
      type: new GraphQLNonNull(ProfileType),
      args: {
        input: { type: new GraphQLNonNull(CreateProfileInput) },
      },
      resolve: async (_src, args: { input: CreateProfile }, prisma) => {
        const profile = await prisma.profile.create({
          data: args.input,
        });
        return profile;
      },
    },
    createPost: {
      type: new GraphQLNonNull(PostType),
      args: {
        input: { type: new GraphQLNonNull(CreatePostInput) },
      },
      resolve: async (_src, args: { input: CreatePost }, prisma) => {
        const post = await prisma.post.create({
          data: args.input,
        });
        return post;
      },
    },
    changePost: {
      type: new GraphQLNonNull(PostType),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        input: { type: new GraphQLNonNull(ChangePostInput) },
      },
      resolve: async (_src, args: { id: string; input: ChangePost }, prisma) => {
        const newPost = await prisma.post.update({
          where: {
            id: args.id,
          },
          data: args.input,
        });
        return newPost;
      },
    },
    changeProfile: {
      type: new GraphQLNonNull(ProfileType),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        input: { type: new GraphQLNonNull(ChangeProfileInput) },
      },
      resolve: async (_src, args: { id: string; input: ChangeProfile }, prisma) => {
        const newProfile = await prisma.profile.update({
          where: {
            id: args.id,
          },
          data: args.input,
        });
        return newProfile;
      },
    },
    changeUser: {
      type: new GraphQLNonNull(UserType),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        input: { type: new GraphQLNonNull(ChangeUserInput) },
      },
      resolve: async (_src, args: { id: string; input: ChangeUser }, prisma) => {
        const newUser = await prisma.user.update({
          where: {
            id: args.id,
          },
          data: args.input,
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
