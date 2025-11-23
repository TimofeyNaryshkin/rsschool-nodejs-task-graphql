import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { UUIDType } from './uuid.js';
import { Member, MemberType } from './member.js';
import { PrismaClient } from '@prisma/client';

export interface Profile {
  id: string;
  isMale: boolean;
  yearOfBirth: number;
  memberType: Member;
  memberTypeId: string; 
}

export const ProfileType = new GraphQLObjectType<Profile, PrismaClient>({
  name: 'Profile',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    memberType: {
      type: new GraphQLNonNull(MemberType),
      resolve: (profile, _args, prisma) => {
        return prisma.memberType.findUnique({
          where: {id: profile.memberTypeId}
        })
      }
    },
  }),
});
