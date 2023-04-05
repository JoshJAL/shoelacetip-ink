import { Menu } from '@headlessui/react';
import Link from 'next/link';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

interface DropdownMenuItemProps {
  href: string;
  children: React.ReactNode;
  target?: '_self' | '_blank' | '_parent' | '_top';
}

export default function DropdownMenuItem({ href, children, target = '_self' }: DropdownMenuItemProps) {
  return (
    <Menu.Item>
      {(active) => (
        <Link
          target={target}
          href={href}
          className={classNames(
            active ? 'bg-lightOlive' : '',
            'block px-4 py-2 text-sm hover:bg-darkOlive',
            'text-zinc-900 hover:text-zinc-900 hover:no-underline'
          )}
        >
          {children}
        </Link>
      )}
    </Menu.Item>
  );
}
