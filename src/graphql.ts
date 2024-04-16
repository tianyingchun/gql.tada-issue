import { initGraphQLTada } from 'gql.tada';
import type { introspection } from './graphql-env.js';

export const graphql = initGraphQLTada<{
  introspection: introspection;
  scalars: {
    JSON: any;
  };
}>();
