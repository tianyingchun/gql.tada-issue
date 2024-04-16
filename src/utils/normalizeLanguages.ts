import { type LanguageCode } from '../typings/LanguageCode';

export const normalizeLanguages = (availableLanguages: Array<LanguageCode>) => {
  return availableLanguages?.map((item: string) => {
    const localeName = item.replace('_', '-');
    const originalName = new Intl['DisplayNames']([localeName], {
      type: 'language',
    }).of(localeName) as string;
    const name = item.toLocaleUpperCase();
    const fullName = `${originalName}(${name})`;
    return {
      name,
      fullName,
      code: item as LanguageCode,
    };
  });
};
