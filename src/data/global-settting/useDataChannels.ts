import { useQuery } from 'urql';
import { queryChannels } from './query';

export const useDataChannels = () => {
  const [allChannels] = useQuery({
    query: queryChannels,
  });

  return {
    allChannels: allChannels.data?.channels.items || [],
    loading: allChannels.fetching,
  };
};
