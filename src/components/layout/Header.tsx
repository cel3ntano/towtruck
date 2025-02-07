import { LanguageSwitcher } from '../ui/LanguageSwitcher';

interface HeaderProps {
  title: string;
  description: string;
}

export function Header({ title, description }: HeaderProps) {
  return (
    <header className='relative bg-background py-6'>
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-cente'>
          <div className='flex-1'>
            <h1 className='text-4xl font-bold text-foreground'>{title}</h1>
            <p className='mt-2 text-lg text-foreground/80'>{description}</p>
          </div>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
