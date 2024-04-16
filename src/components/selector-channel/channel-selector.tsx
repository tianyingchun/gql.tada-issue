import { Select, Spin } from 'antd';
import { readFragment } from 'gql.tada';
import { useEffect, type FC } from 'react';
import { useEventCallback } from 'usehooks-ts';
import { Channel } from '@/data/global-settting/Channel';
import { useDataChannels } from '@/data/global-settting/useDataChannels';
import { useGlobalSetting } from '@/hooks/useGlobalSetting';

export type ProductSelectorProps = {
  align?: 'left' | 'center' | 'right';
  value?: string;
  onChange?: (value?: string) => void;
};

export const ChannelSelector: FC<ProductSelectorProps> = ({
  align = 'left',
  value,
  onChange,
}) => {
  const { globalSetting, changeChannel, setChannels } = useGlobalSetting();
  const { allChannels, loading } = useDataChannels();

  const channels = globalSetting.availableChannels || [];
  const options = channels.map((s) => {
    const channelItem = readFragment(Channel, s);
    return {
      label:
        channelItem.code === '__default_channel__'
          ? 'Default Channel'
          : channelItem.code,
      value: channelItem.token,
    };
  });

  useEffect(() => {
    if (allChannels.length) {
      setChannels(allChannels);
    }
  }, [allChannels, setChannels]);

  const handleChange = useEventCallback((token: string) => {
    changeChannel(token);
    onChange && onChange();
  });

  const activeChannel = readFragment(Channel, globalSetting.activeChannel);

  const needShowChannel = channels.length > 1;
  return (
    <div
      className="selector-channel"
      style={{
        width: '100%',
        display: needShowChannel ? 'block' : 'none',
        textAlign:
          align === 'left' ? 'left' : align === 'center' ? 'center' : 'right',
      }}
    >
      {loading ? (
        <Spin size="small" />
      ) : (
        <Select<string>
          style={{ width: 150, color: '#fff' }}
          filterOption={false}
          placeholder="请选择渠道"
          value={value || activeChannel?.token}
          onChange={handleChange}
          notFoundContent={loading ? <Spin size="small" /> : null}
          options={options}
        ></Select>
      )}
    </div>
  );
};
