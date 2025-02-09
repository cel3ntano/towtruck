'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { BadgeCheck } from 'lucide-react';
import { getIconSource } from '@/lib/utils/resources';

interface FeatureIcon {
  id: number;
  icon_name?: string;
  icon_file?: {
    url: string;
    mime: string;
  };
  svg_base64?: string;
}

interface Feature {
  id: number;
  feature_text: string;
  feature_icon?: FeatureIcon;
}

interface FeaturesProps {
  title: string;
  features: Feature[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

function FeatureIcon({ icon, text }: { icon?: FeatureIcon; text: string }) {
  if (!icon) {
    return <BadgeCheck className='h-12 w-12 text-emerald-500' />;
  }

  const iconSource = getIconSource(
    {
      url: icon.icon_file?.url,
      svg_base64: icon.svg_base64,
    },
    text
  );

  if (iconSource.type === 'svg') {
    return (
      <div
        className='h-12 w-12 [&>svg]:h-full [&>svg]:w-full text-emerald-500 hover:text-emerald-400 transition-colors duration-200'
        dangerouslySetInnerHTML={{ __html: iconSource.content }}
      />
    );
  }

  if (iconSource.type === 'image') {
    return (
      <Image
        src={iconSource.content}
        alt={iconSource.alt}
        width={48}
        height={48}
        className='h-12 w-12 object-contain'
      />
    );
  }

  return <BadgeCheck className='h-12 w-12 text-emerald-500' />;
}

export function Features({ features, title }: FeaturesProps) {
  return (
    <section className='bg-background py-16'>
      <div className='container mx-auto px-4'>
        {title && (
          <h2 className='mb-8 text-center text-3xl font-bold text-foreground'>
            {title}
          </h2>
        )}

        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {features.map(feature => (
            <motion.div
              key={feature.id}
              variants={itemVariants}
              className='flex flex-col items-center text-center'>
              <div className='mb-4 text-foreground'>
                <FeatureIcon
                  icon={feature.feature_icon}
                  text={feature.feature_text}
                />
              </div>
              <h3 className='mb-2 text-xl font-semibold text-foreground'>
                {feature.feature_text}
              </h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
