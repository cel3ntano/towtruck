import { LanguageSwitcher } from '../ui/LanguageSwitcher';

interface HeaderProps {
  title: string;
  description: string;
}

export function Header({ title, description }: HeaderProps) {
  return (
    <header className='relative bg-background py-6'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col items-center'>
          <div className='mb-3 flex items-center gap-1 sm:gap-4'>
            <h1 className='text-xl sm:text-4xl font-bold text-yellow-500'>
              {title}
            </h1>
            <LanguageSwitcher />
          </div>
          <p className='max-w-2xl text-center text-xl text-yellow-500'>
            {description}
          </p>
        </div>
      </div>
    </header>
  );
}
