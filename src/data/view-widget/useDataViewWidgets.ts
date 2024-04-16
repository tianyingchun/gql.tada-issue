import { type VariablesOf } from 'gql.tada';
import { useEffect } from 'react';
import { useQuery } from 'urql';
import { useActiveLanguageChanged } from '@/hooks/useGlobalSetting';
import { queryViewWidgets } from './query';

export const useDataViewWidgets = (
  options: VariablesOf<typeof queryViewWidgets>['options'] = {}
) => {
  const activeLanguageChanged = useActiveLanguageChanged();

  const [{ data, fetching }, refetch] = useQuery({
    query: queryViewWidgets,
    variables: {
      options: {
        ...options,
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
