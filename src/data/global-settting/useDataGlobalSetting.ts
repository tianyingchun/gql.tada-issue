import { useQuery } from 'urql';
import { queryGlobalSettings } from './query';

export const useDataGlobalSetting = () => {
  const [globalSettings] = useQuery({
    query: queryGlobalSettings,
  });
  return {
    globalSettings: globalSettings.data?.globalSettings,
    loading: globalSettings.fetching,
  };
};
