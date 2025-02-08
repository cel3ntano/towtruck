import '@/app/globals.css';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n/routing';
import { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

interface RootLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export const metadata: Metadata = {
  title: 'TowTruck Service',
  description: 'Professional towing service in Dnipro',
};

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${inter.className} min-h-screen bg-background text-foreground`}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <div className='flex min-h-screen flex-col'>{children}</div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
