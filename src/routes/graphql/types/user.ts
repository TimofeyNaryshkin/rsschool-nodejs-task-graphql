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
import { GraphQLContext } from '../context.js';

export interface User {
  id: string;
  name: string;
  balance: number;
  profile: Profile | null;
  posts: Post[];
  userSubscribedTo: User[];
  subscribedToUser: User[];
}

export const UserType: GraphQLObjectType<User, GraphQLContext> = new GraphQLObjectType<
  User,
  GraphQLContext
>({
  name: 'User',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
    profile: {
      type: ProfileType,
      resolve: (user, _args, { loaders }) => {
        return loaders.profileByUserId.load(user.id);
      },
    },
    posts: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(PostType))),
      resolve: (user, _args, { loaders }) => {
        return loaders.postsByAuthorId.load(user.id);
      },
    },
    userSubscribedTo: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType))),
      resolve: (user, _args, { loaders }) => {
        return loaders.userSubscribedTo.load(user.id);
      },
    },
    subscribedToUser: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType))),
      resolve: (user, _args, { loaders }) => {
        return loaders.subscribedToUser.load(user.id);
      },
    },
  }),
});
