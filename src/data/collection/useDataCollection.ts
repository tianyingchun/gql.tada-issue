import { useEffect } from 'react';
import { useQuery } from 'urql';
import { useActiveLanguageChanged } from '@/hooks/useGlobalSetting';
import { queryCollections } from './query';

export const useDataCollections = (collectionName?: string) => {
  const activeLanguageChanged = useActiveLanguageChanged();

  const [{ data, fetching }, refetch] = useQuery({
    query: queryCollections,
    variables: {
      options: {
        filter: collectionName
          ? {
              name: {
                contains: collectionName,
              },
            }
          : undefined,
      },
    },
  });

  // 允许我们直接刷新 当前页面, 如果 activeLanguage 发生了变化.
  useEffect(() => {
    if (activeLanguageChanged) {
      refetch();
    }
  }, [activeLanguageChanged]);

  return {
    data,
    fetching,
    refetch,
  };
};
