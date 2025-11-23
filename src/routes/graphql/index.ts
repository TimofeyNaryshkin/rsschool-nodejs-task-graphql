import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema } from './schemas.js';
import { graphql } from 'graphql';
import { MAX_DEPTH, schema, validateDepth } from './schema.js';
import { createContext } from './context.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;

  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const { query, variables } = req.body;

      const errors = await validateDepth(schema, query, MAX_DEPTH);
      if (errors.length) {
        return {
          data: null,
          errors,
        };
      }

      const result = await graphql({
        schema,
        source: query,
        variableValues: variables,
        contextValue: await createContext(prisma),
      });
      console.log('GraphQL result:', JSON.stringify(result, null, 2));
      return result;
    },
  });
};

export default plugin;
