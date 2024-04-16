import { graphql } from '@/graphql';

export const queryCollections = graphql(`
  query collections($options: CollectionListOptions!) {
    collections(options: $options) {
      items {
        id
        name
      }
      totalItems
    }
  }
`);
