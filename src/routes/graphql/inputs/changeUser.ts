import { GraphQLFloat, GraphQLInputObjectType, GraphQLString } from 'graphql';

export interface ChangeUser {
  name: string;
  balance: number;
}

export const ChangeUserInput = new GraphQLInputObjectType({
  name: 'ChangeUserInput',
  fields: () => ({
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
  }),
});
