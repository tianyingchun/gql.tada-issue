import { type graphql } from '../graphql';

export type LanguageCode = ReturnType<typeof graphql.scalar<'LanguageCode'>>;
