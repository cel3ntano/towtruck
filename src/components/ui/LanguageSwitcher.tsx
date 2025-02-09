'use client';

import { useParams, usePathname, useRouter } from 'next/navigation';
import { locales } from '@/i18n/routing';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Globe } from 'lucide-react';

const localeNames = {
  uk: 'Uk',
  ru: 'Ru',
} as const;

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const { locale: currentLocale } = useParams();

  const handleLocaleChange = (newLocale: string) => {
    const newPathname = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPathname);
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className='inline-flex items-center justify-center rounded-md p-2 hover:bg-green-900 hover:text-accent-foreground transition-colors'>
          <Globe className='h-5 w-5 text-foreground' />
          <span className='ml-1 text-foreground'>
            {localeNames[currentLocale as keyof typeof localeNames]}
          </span>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className='z-50 min-w-[4rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md'
          align='end'>
          {locales.map(locale => (
            <DropdownMenu.Item
              key={locale}
              className='relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground'
              onClick={() => handleLocaleChange(locale)}>
              {localeNames[locale as keyof typeof localeNames]}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
