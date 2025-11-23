import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { UUIDType } from './uuid.js';
import { GraphQLContext } from '../context.js';
import { Member, MemberType } from './member.js';

export interface Profile {
  id: string;
  isMale: boolean;
  yearOfBirth: number;
  memberType: Member;
}

export const ProfileType = new GraphQLObjectType<Profile, GraphQLContext>({
  name: 'Profile',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    memberType: { type: new GraphQLNonNull(MemberType) },
  }),
});
