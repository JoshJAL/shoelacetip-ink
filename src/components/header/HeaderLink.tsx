import Link from 'next/link';
import { useState, useEffect } from 'react';

interface HeaderLinkProps {
  href: string;
  children: React.ReactNode;
  target?: '_self' | '_blank' | '_parent' | '_top';
}

export default function HeaderLink({ href, children, target = '_self' }: HeaderLinkProps) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (href === window.location.pathname) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [href]);

  return (
    <Link
      target={target}
      href={href}
      className={`inline-flex items-center gap-1 text-zinc-900 hover:text-zinc-900 ${
        active ? 'font-bold underline underline-offset-2' : 'font-semibold hover:underline underline-offset-2'
      }`}
    >
      {children}
    </Link>
  );
}
