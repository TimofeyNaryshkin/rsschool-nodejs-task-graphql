import { GraphQLEnumType } from 'graphql';

export enum MemberId {
  BASIC = 'BASIC',
  BUSINESS = 'BUSINESS',
}

export const MemberTypeId = new GraphQLEnumType({
  name: 'MemberTypeId',
  values: {
    BASIC: { value: 'BASIC' },
    BUSINESS: { value: 'BUSINESS' },
  },
});
