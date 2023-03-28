import { useState, useEffect } from 'react';

interface HeaderLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function HeaderLink({ href, children }: HeaderLinkProps) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (href === window.location.pathname) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, []);

  return (
    <a
      href={href}
      className={`inline-flex items-center gap-1  ${
        active ? 'font-extrabold underline underline-offset-2' : 'font-semibold hover:underline underline-offset-2'
      }`}
    >
      {children}
    </a>
  );
}
