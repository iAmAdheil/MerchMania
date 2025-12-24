import {
  Input,
  InputGroup,
  Select,
  Portal,
  createListCollection,
} from '@chakra-ui/react';

function PlatformSelect({
  platform,
  setPlatform,
}: {
  platform: string;
  setPlatform: (platform: string) => void;
}) {
  return (
    <Select.Root
      collection={platforms}
      size="sm"
      className="w-20 md:w-28 px-1.5 md:px-2 text-sm font-roboto cursor-pointer flex flex-row items-center border-l-[1px] border-solid border-gray-300 outline-none"
    >
      <Select.HiddenSelect />
      <Select.Control className="w-full outline-none">
        <Select.Trigger value={platform} className="w-full outline-none">
          <Select.ValueText className="text-xs md:text-sm" placeholder="Social" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner className="-ml-3">
          <Select.Content width={100} className="bg-white flex flex-col gap-2">
            {platforms.items.map(platform => (
              <Select.Item
                item={platform}
                key={platform.value}
                onClick={() => setPlatform(platform.value)}
                className="py-1 px-3"
              >
                {platform.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  )
}

export default function SocialLink({
  link,
  setLink,
  platform,
  setPlatform,
}: {
  link: string;
  setLink: (link: string) => void;
  platform: string;
  setPlatform: (platform: string) => void;
}) {
  return (
    <InputGroup
      className="w-full pr-12 border-[1px] border-solid border-gray-300 rounded-sm"
      endElement={<PlatformSelect platform={platform} setPlatform={setPlatform} />}
    >
      <Input
        value={link}
        onChange={e => setLink(e.target.value)}
        className="pl-2 pr-10 w-full text-sm md:text-base font-roboto cursor-pointer outline-none"
        placeholder="yoursite.com"
      />
    </InputGroup>
  );
}

const platforms = createListCollection({
  items: [
    { label: 'Instagram', value: 'Instagram' },
    { label: 'Youtube', value: 'Youtube' },
    { label: 'TikTok', value: 'Tiktok' },
    { label: 'Twitter', value: 'Twitter' },
    { label: 'Facebook', value: 'Facebook' },
    { label: 'LinkedIn', value: 'Linkedin' },
    { label: 'Pinterest', value: 'Pinterest' },
    { label: 'Reddit', value: 'Reddit' },
    { label: 'Snapchat', value: 'Snapchat' },
    { label: 'Telegram', value: 'Telegram' },
  ],
});
