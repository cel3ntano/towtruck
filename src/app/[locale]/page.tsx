import { Suspense } from 'react';
import { Header } from '@/components/layout/Header';
import { Contacts } from '@/components/home/Contacts';
import { Hero } from '@/components/home/Hero';
import { TaglineSection } from '@/components/home/TaglineSection';
import { ImageSlider } from '@/components/home/ImageSlider';
import { AboutSection } from '@/components/home/AboutSection';
import { TransportableItems } from '@/components/home/TransportableItems';
import { fetchAPI } from '@/lib/api/strapi';
import { type Locale } from '@/config/i18n';
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
      {/* <Suspense fallback={<div className='h-96 animate-pulse bg-gray-200' />}>
        <TaglineSection tagline={data.tagline} />
      </Suspense> */}
      {/* <Suspense fallback={<div className='h-96 animate-pulse bg-gray-200' />}>
        <ImageSlider
          images={data.sliderImages.data.map(image => ({
            url: image.attributes.url,
            alt: image.attributes.alternativeText,
          }))}
        />
      </Suspense> */}
      {/* <Suspense fallback={<div className='h-96 animate-pulse bg-gray-200' />}>
        <AboutSection features={data.features} />
      </Suspense> */}
      {/* <Suspense fallback={<div className='h-96 animate-pulse bg-gray-200' />}>
        <TransportableItems items={data.transportableItems} />
      </Suspense> */}
    </main>
  );
}
