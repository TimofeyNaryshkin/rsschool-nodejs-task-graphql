import { GraphQLFloat, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { MemberId, MemberTypeId } from '../enums/memberId.js';
import { PrismaClient } from '@prisma/client';

export interface Member {
  id: MemberId;
  discount: number;
  postsLimitPerMonth: number;
}

export const MemberType = new GraphQLObjectType<Member, PrismaClient>({
  name: 'Member',
  fields: () => ({
    id: { type: new GraphQLNonNull(MemberTypeId) },
    discount: { type: new GraphQLNonNull(GraphQLFloat) },
    postsLimitPerMonth: { type: new GraphQLNonNull(GraphQLInt) },
  }),
});
