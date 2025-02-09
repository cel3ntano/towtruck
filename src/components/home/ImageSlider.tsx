'use client';

import { useCallback, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getStrapiImageUrl } from '@/lib/utils/resources';
import { type SliderImage } from '@/types/strapi';

interface ImageSliderProps {
  title: string;
  autoPlayInterval?: number;
  images: SliderImage[];
}

export function ImageSlider({
  images,
  title,
  autoPlayInterval = 4000,
}: ImageSliderProps) {
  const t = useTranslations('components.imageSlider');
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!emblaApi || isHovered) return;

    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [emblaApi, autoPlayInterval, isHovered]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setCurrentIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  const getImageUrl = useCallback((image: SliderImage): string => {
    return getStrapiImageUrl(image.slider_image, {
      size: 'large',
      fallback: '/slider-fallback-image.jpg',
    });
  }, []);

  if (!Array.isArray(images) || images.length === 0) {
    return (
      <section className='relative mt-12 h-[400px] w-full overflow-hidden bg-background'>
        <h2 className='text-center text-xl font-bold text-white'>{title}</h2>
        <div className='relative h-full w-full'>
          <Image
            src='/slider-fallback-image.jpg'
            alt={t('fallbackAlt')}
            fill
            className='object-cover'
            sizes='100vw'
            priority
          />
        </div>
      </section>
    );
  }

  return (
    <section
      className='relative mt-12 h-[400px] w-full overflow-hidden bg-background'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <h3 className='mb-8 text-center text-3xl font-bold text-foreground'>
        {title}
      </h3>

      <div className='relative h-full w-full' ref={emblaRef}>
        <div className='flex h-full'>
          {images.map((image, index) => (
            <div
              key={index}
              className='relative h-full min-w-[100%] px-2 md:min-w-[50%] lg:min-w-[33.333%]'>
              <AnimatePresence mode='wait'>
                <motion.div
                  className='relative h-full w-full'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}>
                  <Image
                    src={getImageUrl(image)}
                    alt={image.localized_alt_text || t('fallbackAlt')}
                    fill
                    className='rounded-lg object-cover'
                    sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={() => emblaApi?.scrollPrev()}
            className='absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 
                     text-white transition-colors hover:bg-black/70 focus:outline-none 
                     focus:ring-2 focus:ring-white focus:ring-offset-2'
            aria-label={t('previousImage')}>
            <ChevronLeft className='h-6 w-6' />
          </button>

          <button
            onClick={() => emblaApi?.scrollNext()}
            className='absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 
                     text-white transition-colors hover:bg-black/70 focus:outline-none 
                     focus:ring-2 focus:ring-white focus:ring-offset-2'
            aria-label={t('nextImage')}>
            <ChevronRight className='h-6 w-6' />
          </button>

          <div className='absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2'>
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`h-2 w-2 rounded-full transition-colors focus:outline-none 
                          focus:ring-2 focus:ring-white focus:ring-offset-2
                          ${
                            index === currentIndex ? 'bg-white' : 'bg-white/50'
                          }`}
                aria-label={t('goToImage', { number: index + 1 })}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
