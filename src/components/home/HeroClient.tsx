'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { StrapiImage } from '@/types/strapi';
import { getStrapiImageUrl } from '@/lib/utils/resources';

interface HeroClientProps {
  image: StrapiImage;
  tagline: string;
  glowColors: string[];
}

export function HeroClient({ image, tagline, glowColors }: HeroClientProps) {
  const imageUrl = getStrapiImageUrl(image);

  const gradientClasses = `bg-gradient-to-r ${glowColors.join(' ')}`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className='relative h-full w-full'>
      <Image
        src={imageUrl}
        alt={image.alternativeText || 'Tow truck hero image'}
        fill
        priority
        className='object-cover'
        sizes='100vw'
      />

      <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent' />
      <div className='absolute inset-x-0 bottom-0 flex flex-col items-center justify-end px-4 pb-24'>
        <span
          className={`absolute mx-auto box-content select-none py-4 
                     ${gradientClasses} bg-clip-text text-center text-4xl 
                     font-extrabold text-transparent blur-xl md:text-5xl lg:text-6xl`}>
          {tagline}
        </span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className={`relative w-fit py-4 ${gradientClasses} bg-clip-text 
                     text-center text-4xl font-extrabold text-transparent 
                     md:text-5xl lg:text-6xl`}>
          {tagline}
        </motion.h2>
      </div>
    </motion.div>
  );
}
