export const locales = ['uk', 'ru'] as const;
export const defaultLocale = 'uk' as const;

export type Locale = (typeof locales)[number];
