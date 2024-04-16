import { graphql } from '@/graphql';

export const Channel = graphql(`
  fragment Channel on Channel {
    id
    code
    token
    pricesIncludeTax
    defaultTaxZone {
      id
      name
    }
    defaultShippingZone {
      id
      name
    }
    defaultLanguageCode
    defaultCurrencyCode
  }
`);
