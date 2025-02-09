'use client';

import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { cn } from '@/lib/utils/styles';
import { formatPhoneNumber } from '@/lib/utils/formatPhoneNumber';

interface ContactsClientProps {
  phoneNumbers: Array<{
    id: number;
    phone_number: string;
  }>;
  title?: string;
  description?: string;
  gradientColors?: {
    from: string;
    via1: string;
    via2: string;
    via3: string;
    to: string;
  };
}

const defaultGradient = {
  from: 'from-green-600',
  via1: 'via-amber-700',
  via2: 'via-amber-500',
  via3: 'via-yellow-700',
  to: 'to-green-600',
};

export function ContactsClient({
  phoneNumbers,
  title,
  description,
  gradientColors = defaultGradient,
}: ContactsClientProps) {
  const gradientClassName = cn(
    'bg-gradient-to-r',
    gradientColors.from,
    gradientColors.via1,
    gradientColors.via2,
    gradientColors.via3,
    gradientColors.to
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className='text-center'>
      <h2 className='mb-6 text-3xl font-bold text-foreground md:text-4xl'>
        {title}
      </h2>
      {description && (
        <p className='mb-8 text-lg text-foreground/80'>{description}</p>
      )}

      <div className='flex flex-col items-center justify-center gap-6 sm:flex-row'>
        {phoneNumbers.map(({ id, phone_number }, index) => (
          <motion.a
            key={id}
            href={`tel:${phone_number.replace(/\D/g, '')}`}
            initial={{ opacity: 0, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            className='group relative flex min-w-[280px] items-center justify-center gap-3 
                       overflow-hidden rounded-md px-6 py-3 font-medium text-white 
                       transition-transform hover:scale-105 active:scale-95'
            aria-label={`Call ${formatPhoneNumber(phone_number)}`}>
            <span className='relative z-10 flex items-center gap-2'>
              <Phone className='h-5 w-5' />
              <span className='font-mono text-xl'>
                {formatPhoneNumber(phone_number)}
              </span>
            </span>

            <motion.div
              initial={{ left: index % 2 === 0 ? '0%' : '-300%' }}
              animate={{ left: index % 2 === 0 ? '-300%' : '0%' }}
              transition={{
                repeat: Infinity,
                repeatType: 'reverse',
                duration: 8,
                ease: 'linear',
              }}
              className={cn(
                'absolute inset-0 z-0 w-[400%]',
                gradientClassName,
                index % 2 === 0 ? '' : 'rotate-180'
              )}
            />
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}
