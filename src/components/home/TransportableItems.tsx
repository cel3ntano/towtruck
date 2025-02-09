'use client';
import { motion } from 'framer-motion';
import { BadgeCheck } from 'lucide-react';
import { type ReactNode } from 'react';

interface TransportableItem {
  id: number;
  transportable_item_title: string;
  transportable_item_media: string;
}

interface TransportableItemsProps {
  title: string;
  items: TransportableItem[];
  speed?: 'slow' | 'normal' | 'fast';
}

const ANIMATION_SPEEDS = {
  slow: 45,
  normal: 25,
  fast: 15,
} as const;

function TranslateWrapper({
  children,
  reverse = false,
  speed = 'normal',
}: {
  children: ReactNode;
  reverse?: boolean;
  speed: keyof typeof ANIMATION_SPEEDS;
}) {
  return (
    <motion.div
      initial={{ translateX: reverse ? '-100%' : '0%' }}
      animate={{ translateX: reverse ? '0%' : '-100%' }}
      transition={{
        duration: ANIMATION_SPEEDS[speed],
        repeat: Infinity,
        ease: 'linear',
      }}
      className='flex gap-4 px-4'>
      {children}
    </motion.div>
  );
}

function TransportableItem({
  title,
  isTopRow = false,
}: {
  title: string;
  isTopRow?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 whitespace-nowrap rounded-full border 
                  bg-background/50 px-5 py-3
                  ${
                    isTopRow
                      ? 'border-amber-500/20 text-amber-500/80'
                      : 'border-emerald-500/20 text-emerald-500/80'
                  }`}>
      <BadgeCheck
        className={`h-5 w-5 ${
          isTopRow ? 'text-amber-500' : 'text-emerald-500'
        }`}
      />
      <span className='text-xl font-medium'>{title}</span>
    </div>
  );
}

export function TransportableItems({
  title,
  items,
  speed = 'slow',
}: TransportableItemsProps) {
  const midPoint = Math.ceil(items.length / 2);
  const topItems = items.slice(0, midPoint);
  const bottomItems = items.slice(midPoint);

  return (
    <section className='bg-background py-16'>
      <div className='container mx-auto px-4'>
        <h2 className='mb-8 text-center text-3xl font-bold text-foreground md:text-4xl'>
          {title}
        </h2>

        <div className='relative -rotate-1'>
          <div className='relative z-0 flex overflow-hidden py-3'>
            <TranslateWrapper speed={speed}>
              {topItems.map(item => (
                <TransportableItem
                  key={item.id}
                  title={item.transportable_item_title}
                  isTopRow={true}
                />
              ))}
            </TranslateWrapper>
            <TranslateWrapper speed={speed}>
              {topItems.map(item => (
                <TransportableItem
                  key={`${item.id}-2`}
                  title={item.transportable_item_title}
                  isTopRow={true}
                />
              ))}
            </TranslateWrapper>
            <TranslateWrapper speed={speed}>
              {topItems.map(item => (
                <TransportableItem
                  key={`${item.id}-3`}
                  title={item.transportable_item_title}
                  isTopRow={true}
                />
              ))}
            </TranslateWrapper>
          </div>

          <div className='relative z-0 flex overflow-hidden py-3'>
            <TranslateWrapper speed={speed} reverse>
              {bottomItems.map(item => (
                <TransportableItem
                  key={item.id}
                  title={item.transportable_item_title}
                />
              ))}
            </TranslateWrapper>
            <TranslateWrapper speed={speed} reverse>
              {bottomItems.map(item => (
                <TransportableItem
                  key={`${item.id}-2`}
                  title={item.transportable_item_title}
                />
              ))}
            </TranslateWrapper>
            <TranslateWrapper speed={speed} reverse>
              {bottomItems.map(item => (
                <TransportableItem
                  key={`${item.id}-3`}
                  title={item.transportable_item_title}
                />
              ))}
            </TranslateWrapper>
          </div>

          <div
            className='pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-32 
                        bg-gradient-to-r from-background to-transparent'
          />
          <div
            className='pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-32 
                        bg-gradient-to-l from-background to-transparent'
          />
        </div>
      </div>
    </section>
  );
}

export default TransportableItems;
