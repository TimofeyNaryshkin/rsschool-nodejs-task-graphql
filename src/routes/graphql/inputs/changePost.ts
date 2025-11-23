import { GraphQLInputObjectType, GraphQLString } from 'graphql';

export interface ChangePost {
  title: string;
  content: string;
}

export const ChangePostInput = new GraphQLInputObjectType({
  name: 'ChangePostInput',
  fields: () => ({
    title: { type: GraphQLString },
    content: { type: GraphQLString },
  }),
});
