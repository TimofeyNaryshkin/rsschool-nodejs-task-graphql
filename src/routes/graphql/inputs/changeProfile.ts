import { GraphQLBoolean, GraphQLInputObjectType, GraphQLInt } from 'graphql';
import { MemberId, MemberTypeId } from '../enums/memberId.js';

export interface ChangeProfile {
  isMale: boolean
  yearOfBirth: number
  memberTypeId: MemberId
}

export const ChangeProfileInput = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: () => ({
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    memberTypeId: { type: MemberTypeId },
  }),
});
