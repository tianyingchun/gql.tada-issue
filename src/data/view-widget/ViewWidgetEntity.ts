import { graphql } from '@/graphql';

export const ViewWidgetEntity = graphql(`
  fragment ViewWidgetEntity on ViewWidgetEntity @_unmask {
    id
    createdAt
    updatedAt
    displayOrder
    entityId
    entityName
    viewWidgetId
  }
`);
