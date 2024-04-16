import { Radio, Tooltip } from 'antd';
import type { FC } from 'react';
import { useEffect } from 'react';
import { useEventCallback } from 'usehooks-ts';
import { useDataGlobalSetting } from '@/data/global-settting/useDataGlobalSetting';
import { useGlobalSetting } from '@/hooks/useGlobalSetting';

export type LanguageSelectorProps = {
  align?: 'left' | 'center' | 'right';
  value?: string;
  onChange?: (value?: string) => void;
};

export const LanguageSelector: FC<LanguageSelectorProps> = ({
  align = 'center',
  value,
  onChange,
}) => {
  const { globalSetting, changeLanguage, setGlobalSettings } =
    useGlobalSetting();
  const { globalSettings } = useDataGlobalSetting();

  const handleLanguageChange = useEventCallback((e: any) => {
    const language = e.target.value;
    changeLanguage(language);
    if (onChange) onChange(language);
  });

  useEffect(() => {
    if (onChange) onChange(globalSetting.activeLanguage);
  }, [globalSetting.activeLanguage, onChange]);

  useEffect(() => {
    if (globalSettings) {
      setGlobalSettings(globalSettings);
    }
  }, [globalSettings, setGlobalSettings]);

  return (
    <div
      style={{
        width: '100%',
        textAlign:
          align === 'left' ? 'left' : align === 'center' ? 'center' : 'right',
      }}
    >
      <Radio.Group
        onChange={handleLanguageChange}
        value={value || globalSetting.activeLanguage}
        style={{ marginBottom: 8 }}
      >
        {globalSetting.availableLanguages.map((language) => {
          return (
            <Radio.Button key={language.code} value={language.code}>
              <Tooltip title={language.fullName}>{language.name}</Tooltip>
            </Radio.Button>
          );
        })}
      </Radio.Group>
    </div>
  );
};
