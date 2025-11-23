import { GraphQLSchema, parse, specifiedRules, validate } from 'graphql';
import { QueryType } from './query.js';
import { MutationType } from './mutation.js';
import depthLimit from 'graphql-depth-limit';

export const MAX_DEPTH = 5;

export const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});

export async function validateDepth(
  schema: GraphQLSchema,
  query: string,
  maxDepth: number,
) {
  const document = parse(query);
  const errors = validate(schema, document, [...specifiedRules, depthLimit(maxDepth)]);

  return errors;
}
