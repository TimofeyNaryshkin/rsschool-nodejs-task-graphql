import { GraphQLEnumType } from 'graphql';
import { GraphQLContext } from '../context.js';

export enum MemberId {
  BASIC = 'BASIC',
  BUSINESS = 'BUSINESS',
}

export const MemberTypeId = new GraphQLEnumType({
  name: 'MemberId',
  values: {
    BASIC: { value: 'BASIC' },
    BUSINESS: { value: 'BUSINESS' },
  },
});
