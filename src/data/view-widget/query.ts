import { graphql } from '@/graphql';
import { ViewWidget } from './ViewWidget';
import { ViewWidgetEntity } from './ViewWidgetEntity';

export const createViewWidget = graphql(
  `
    mutation createWidget($input: CreateViewWidgetInput!) {
      createViewWidget(input: $input) {
        ...ViewWidget
      }
    }
  `,
  [ViewWidget]
);

export const updateViewWidget = graphql(
  `
    mutation updateViewWidget($input: UpdateViewWidgetInput!) {
      updateViewWidget(input: $input) {
        ...ViewWidget
      }
    }
  `,
  [ViewWidget]
);

export const deleteViewWidget = graphql(`
  mutation deleteViewWidget($id: ID!) {
    deleteViewWidget(id: $id) {
      result
      message
    }
  }
`);

export const queryViewWidget = graphql(
  `
    query viewWidgets($id: ID!) {
      viewWidget(id: $id) {
        ...ViewWidget
      }
    }
  `,
  [ViewWidget]
);

export const queryViewWidgets = graphql(
  `
    query viewWidgets($options: ViewWidgetListOptions!) {
      viewWidgets(options: $options) {
        items {
          ...ViewWidget
        }
        totalItems
      }
    }
  `,
  [ViewWidget]
);

export const queryViewWidgetEntities = graphql(
  `
    query queryViewWidgetEntities($options: ViewWidgetEntityListOptions!) {
      viewWidgetEntities(options: $options) {
        items {
          ...ViewWidgetEntity
        }
        totalItems
      }
    }
  `,
  [ViewWidgetEntity]
);

export const createViewWidgetEntity = graphql(
  `
    mutation createViewWidgetEntity($input: CreateViewWidgetEntityInput!) {
      createViewWidgetEntity(input: $input) {
        ...ViewWidgetEntity
      }
    }
  `,
  [ViewWidgetEntity]
);

export const updateViewWidgetEntity = graphql(
  `
    mutation updateViewWidgetEntity($input: UpdateViewWidgetEntityInput!) {
      updateViewWidgetEntity(input: $input) {
        ...ViewWidgetEntity
      }
    }
  `,
  [ViewWidgetEntity]
);

export const deleteViewWidgetEntity = graphql(`
  mutation deleteViewWidgetEntity($id: ID!) {
    deleteViewWidgetEntity(id: $id) {
      result
      message
    }
  }
`);
