import Link from 'next/link';
import type { IconType } from 'react-icons/lib';

interface FancyLinkProps {
  href: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  className?: string;
  children: React.ReactNode;
}

export default function FancyLink({ href, children, target = '_blank', className }: FancyLinkProps) {
  return (
    <div className='flex flex-col'>
      <Link
        target={target}
        href={href}
        className='flex items-center gap-3 px-4 py-3 text-lg font-semibold transition-all duration-200 ease-in-out rounded-lg basis-0 text-lilacHover hover:bg-lilacHover hover:bg-opacity-20 hover:underline underline-offset-2'
      >
        {children}
      </Link>
    </div>
  );
}
