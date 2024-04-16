import { type PropsWithChildren } from 'react';
import {
  Provider,
  Client,
  cacheExchange,
  fetchExchange,
  type Exchange,
  type Operation,
  makeOperation,
} from 'urql';
import { pipe, map } from 'wonka';
import {
  storageActiveChannelKey,
  storageActiveLanguageKey,
} from '../config/constants';

// You can use options for inputs if you want to make this reusable for  the community
export const requestPolicyExchange =
  (): Exchange =>
  ({ forward }) => {
    const processIncomingOperation = (operation: Operation): Operation => {
      if (operation) {
        const activeLanguage = localStorage.getItem(storageActiveLanguageKey);
        let newUri = operation.context.url.split('?')[0];
        if (activeLanguage) {
          newUri = newUri + '?languageCode=' + activeLanguage;
        }
        // your own condition
        return makeOperation(operation.kind, operation, {
          ...operation.context,
          url: newUri,
        });
      }

      return operation;
    };

    return (ops$) => {
      return pipe(ops$, map(processIncomingOperation), forward);
    };
  };

const exchanges: Exchange[] = [
  cacheExchange,
  requestPolicyExchange(),
  fetchExchange,
];

const client = new Client({
  url: '',
  exchanges: exchanges,
  // every operation will by default use cache-and-network rather
  // than cache-first now:
  requestPolicy: 'cache-and-network',
  fetchOptions: () => {
    const activeChannel = localStorage.getItem(storageActiveChannelKey);
    return {
      credentials: 'include',
      headers: {
        // authorization: token ? `Bearer ${token}` : '',
        channel: activeChannel || '',
      },
    };
  },
});

// you need to create a component to wrap your app in
export function UrqlClient({ children }: PropsWithChildren) {
  return <Provider value={client}>{children}</Provider>;
}
