import { GraphQLFloat, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { MemberId, MemberTypeId } from '../enums/memberId.js';
import { GraphQLContext } from '../context.js';

export interface Member {
  id: MemberId;
  discount: number;
  postsLimitPerMonth: number;
}

export const MemberType = new GraphQLObjectType<Member, GraphQLContext>({
  name: 'Member',
  fields: () => ({
    id: { type: new GraphQLNonNull(MemberTypeId) },
    discount: { type: new GraphQLNonNull(GraphQLFloat) },
    postsLimitPerMonth: { type: new GraphQLNonNull(GraphQLInt) },
  }),
});
