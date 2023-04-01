import Link from 'next/link';
import Button from '../Button';
import DropdownMenu from '../dropdownMenu/DropdownMenu';
import WormIcon from '../wormIcon/WormIcon';
import HeaderLink from './HeaderLink';

export default function Header() {
  return (
    <header className='fixed z-20 w-full p-2 backdrop-blur-md'>
      <div className='max-w-6xl mx-auto'>
        <nav className='flex items-center gap-3 text-base'>
          <a href={'/'} className='flex group text-zinc-900 hover:text-zinc-900 hover:no-underline'>
            <WormIcon fill='#ef98f9' />
            <h2 className='flex items-center justify-center p-2 text-xl tracking-tighter'>Shoelacetip Ink</h2>
          </a>
          <div className='items-center hidden gap-6 md:flex'>
            <HeaderLink href={'/artist'}>Artist</HeaderLink>
            <HeaderLink href={'/gallery'}>Gallery</HeaderLink>
            <HeaderLink href={'/FAQ'}>FAQ</HeaderLink>
          </div>
          <div className='flex-1'></div>
          <Button
            text='Book Me'
            additionalClasses='font-semibold'
            onClick={() => (window.location.href = '/contact')}
          />
          <div className='md:hidden'>
            <DropdownMenu />
          </div>
        </nav>
      </div>
    </header>
  );
}
