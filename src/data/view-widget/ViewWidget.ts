import { graphql } from '@/graphql';

export const ViewWidget = graphql(`
  fragment ViewWidget on ViewWidget @_unmask {
    id
    createdAt
    updatedAt
    widgetGroupName
    widgetDesc
    widgetPreview
    widgetViewType
    widgetViewConfig
    languageCode
    translations {
      id
      languageCode
      widgetViewConfig
    }
  }
`);
