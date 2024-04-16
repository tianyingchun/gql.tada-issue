import { type FragmentOf, readFragment } from 'gql.tada';
import { atom, useAtom, useAtomValue } from 'jotai';
import { selectAtom } from 'jotai/utils';
import { useEventCallback } from 'usehooks-ts';
import {
  storageActiveChannelKey,
  storageActiveLanguageKey,
  storageActiveUILanguageKey,
} from '@/config/constants';
import { Channel } from '@/data/global-settting/Channel';
import { GlobalSettings } from '@/data/global-settting/GlobalSettings';
import { type LanguageCode } from '@/typings/LanguageCode';
import { normalizeLanguages } from '@/utils/normalizeLanguages';
import { usePrevious } from './usePrevious';

const initialActiveLanguage = (localStorage.getItem(storageActiveLanguageKey) ||
  'en') as LanguageCode;

const initialActiveUILanguage = (localStorage.getItem(
  storageActiveUILanguageKey
) || 'zh') as LanguageCode;
/**
 * The global setting atom.
 */
const globalSettingAtom = atom({
  activeChannel: undefined as FragmentOf<typeof Channel> | undefined,
  availableChannels: [] as FragmentOf<typeof Channel>[],
  availableLanguages: [] as Array<{
    name: string;
    fullName: string;
    code: LanguageCode;
  }>,
  activeLanguage: initialActiveLanguage,
  activeUILanguage: initialActiveUILanguage,
});

/**
 * export selected atom for activeLanguage
 */
const activeLanguageAtom = selectAtom(
  globalSettingAtom,
  (value) => value.activeLanguage
);

export const useActiveLanguage = () => {
  return useAtomValue(activeLanguageAtom);
};

/**
 * 此处用来 check 当前的 activeLanguage 是否发生了变化.
 * @returns
 */
export const useActiveLanguageChanged = () => {
  const activeLanguage = useActiveLanguage();
  const prev = usePrevious(activeLanguage);
  return prev && prev !== activeLanguage;
};

export const useGlobalSetting = () => {
  const [globalSetting, setSetting] = useAtom(globalSettingAtom);

  const setChannels = useEventCallback(
    (allChannels: Array<FragmentOf<typeof Channel>>) => {
      if (allChannels) {
        const defaultChannel = allChannels.find((c) => {
          return readFragment(Channel, c).code === '__default_channel__';
        });
        setSetting((prev) => {
          return {
            ...prev,
            activeChannel: defaultChannel,
            availableChannels: allChannels,
          };
        });
      }
    }
  );

  const setGlobalSettings = useEventCallback(
    (globalSettings: FragmentOf<typeof GlobalSettings>) => {
      if (globalSettings) {
        setSetting((prev) => {
          const languages = normalizeLanguages(
            readFragment(GlobalSettings, globalSettings).availableLanguages
          );
          return {
            ...prev,
            availableLanguages: languages,
          };
        });
      }
    }
  );

  const changeChannel = useEventCallback((channelCode: string) => {
    setSetting((prev) => {
      const activeChannel = prev.availableChannels.find(
        (c) => readFragment(Channel, c).code === channelCode
      );

      if (activeChannel) {
        localStorage.setItem(
          storageActiveChannelKey,
          readFragment(Channel, activeChannel).code
        );
      }
      return {
        ...prev,
        activeChannel,
      };
    });
  });

  const changeLanguage = useEventCallback((languageCode: LanguageCode) => {
    setSetting((prev) => {
      localStorage.setItem(storageActiveLanguageKey, languageCode);
      return {
        ...prev,
        activeLanguage: languageCode,
      };
    });
  });

  const changeUILanguage = useEventCallback((languageCode: LanguageCode) => {
    setSetting((prev) => {
      localStorage.setItem(storageActiveUILanguageKey, languageCode);
      return {
        ...prev,
        activeUILanguage: languageCode,
      };
    });
  });

  return {
    globalSetting,
    setChannels,
    setGlobalSettings,
    changeChannel,
    changeLanguage,
    changeUILanguage,
  };
};
