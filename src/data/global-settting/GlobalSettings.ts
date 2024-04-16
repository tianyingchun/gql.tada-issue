import { graphql } from '@/graphql';

export const GlobalSettings = graphql(`
  fragment GlobalSettings on GlobalSettings {
    id
    availableLanguages
  }
`);
