import { graphql } from '@/graphql';
import { Channel } from './Channel';
import { GlobalSettings } from './GlobalSettings';

export const queryGlobalSettings = graphql(
  `
    query globalSettings {
      globalSettings {
        ...GlobalSettings
      }
    }
  `,
  [GlobalSettings]
);

export const queryChannels = graphql(
  `
    query channels {
      channels {
        items {
          ...Channel
        }
        totalItems
      }
    }
  `,
  [Channel]
);
