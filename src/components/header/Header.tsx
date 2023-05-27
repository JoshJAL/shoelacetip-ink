import Link from 'next/link';
import Button from '../Button';
import DropdownMenu from '../dropdownMenu/DropdownMenu';
import WormIcon from '../wormIcon/WormIcon';
import HeaderLink from './HeaderLink';
import { useRouter } from 'next/navigation';
import { IoLogoInstagram } from 'react-icons/io5';

export default function Header() {
  const router = useRouter();

  return (
    <header className='fixed z-20 w-full p-2 backdrop-blur-md'>
      <div className='max-w-6xl mx-auto'>
        <nav className='flex items-center gap-3 text-base'>
          <Link href={'/'} className='flex items-center group text-zinc-900 hover:text-zinc-900 hover:no-underline'>
            <WormIcon />
            <h2 className='flex items-center justify-center p-2 text-xl tracking-tighter'>Shoelacetip Ink</h2>
          </Link>
          <div className='items-center hidden gap-6 xl:flex'>
            <HeaderLink href={'/artist'}>Artist</HeaderLink>
            <HeaderLink href={'/gallery'}>Gallery</HeaderLink>
            <HeaderLink href={'/FAQ'}>FAQ</HeaderLink>
            <HeaderLink target='_blank' href={'https://www.instagram.com/shoelacetip_ink/'}>
              <IoLogoInstagram />
              Instagram
            </HeaderLink>
          </div>
          <div className='flex-1'></div>
          <Button text='Book Me' additionalClasses='font-semibold' onClick={() => router.push('/contact')} />
          <div className='xl:hidden'>
            <DropdownMenu />
          </div>
        </nav>
      </div>
    </header>
  );
}
