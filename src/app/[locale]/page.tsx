import { Suspense } from 'react';
import { Header } from '@/components/layout/Header';
import { Contacts } from '@/components/home/Contacts';
import { Hero } from '@/components/home/Hero';
import { ImageSlider } from '@/components/home/ImageSlider';
import { Features } from '@/components/home/Features';
import { TransportableItems } from '@/components/home/TransportableItems';
import { fetchAPI } from '@/lib/api/strapi';
import { type Locale } from '@/i18n/routing';
import { type HomePageData, type StrapiResponse } from '@/types/strapi';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  await Promise.resolve();
  const { locale } = await params;
  const pageData = await fetchAPI<StrapiResponse<HomePageData>>(
    'home-page',
    locale as Locale
  );

  const { data } = pageData;
  console.log(data);

  return (
    <main className='flex min-h-screen flex-col'>
      <Header
        title={data.header_section.title}
        description={data.header_section.description}
      />
      <Contacts
        title={data.contacts_section?.title}
        description={data.contacts_section?.description}
        phoneNumbers={data.contacts_section.phone_numbers}
      />
      <Hero
        image={data.hero_section.hero_image}
        tagline={data.hero_section.hero_tagline}
      />
      <Suspense fallback={<div className='h-96 animate-pulse bg-gray-200' />}>
        <ImageSlider
          title={data.slider_section.title}
          images={data.slider_section.slider_images}
        />
      </Suspense>
      <Suspense fallback={<div className='h-96 animate-pulse bg-gray-200' />}>
        <Features
          features={data.features_section.features_list}
          title={data.features_section.title}
        />
      </Suspense>
      <Suspense fallback={<div className='h-96 animate-pulse bg-gray-200' />}>
        <TransportableItems
          title={data.transportable_items_section.title}
          items={data.transportable_items_section.transportable_items_list}
        />
      </Suspense>
      <Contacts
        title={data.contacts_section?.title}
        description={data.contacts_section?.description}
        phoneNumbers={data.contacts_section.phone_numbers}
      />
    </main>
  );
}
