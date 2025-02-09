import { HeroClient } from './HeroClient';
import { WaveDivider } from '@/components/ui/WaveDivider';
import { StrapiImage } from '@/types/strapi';

interface HeroProps {
  image: StrapiImage;
  tagline: string;
  glowColors?: string[];
}

export function Hero({
  image,
  tagline,
  glowColors = ['from-yellow-600', 'via-amber-400', 'to-amber-500'],
}: HeroProps) {
  return (
    <div className='relative'>
      <section className='relative h-[600px] w-full overflow-hidden bg-gray-950'>
        <HeroClient image={image} tagline={tagline} glowColors={glowColors} />
        <WaveDivider fillClassName='fill-background' overlap={80} />
      </section>
    </div>
  );
}
