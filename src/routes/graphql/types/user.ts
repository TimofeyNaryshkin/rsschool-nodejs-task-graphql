import {
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { Post, PostType } from './post.js';
import { Profile, ProfileType } from './profile.js';
import { GraphQLContext } from '../context.js';
import { UUIDType } from './uuid.js';

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
    profile: { type: ProfileType },
    posts: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(PostType))) },
    userSubscribedTo: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType))),
    },
    subscribedToUser: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserType))),
    },
  }),
});
