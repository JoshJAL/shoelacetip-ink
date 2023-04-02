import DropdownMenu from '../dropdownMenu/DropdownMenu';
import UpdatePagesDropdownMenu from '../dropdownMenu/UpdatePagesDropdownMenu';
import WormIcon from '../wormIcon/WormIcon';
import HeaderLink from './HeaderLink';

export default function UpdatePagesHeader() {
  return (
    <header className='fixed z-20 w-full p-2 backdrop-blur-md'>
      <div className='max-w-6xl mx-auto'>
        <nav className='flex items-center gap-3 text-base'>
          <a href={'/'} className='flex group text-zinc-900 hover:text-zinc-900 hover:no-underline'>
            <WormIcon fill='#ef98f9' />
            <h2 className='flex items-center justify-center p-2 text-xl tracking-tighter'>Shoelacetip Ink</h2>
          </a>
          <div className='items-center hidden gap-6 md:flex'>
            <HeaderLink href={'/updateHero'}>Update Hero</HeaderLink>
            <HeaderLink href={'/updateTestimonials'}>Update Testimonials</HeaderLink>
            <HeaderLink href={'/updateArtist'}>Update Artist</HeaderLink>
            <HeaderLink href={'/updateFAQ'}>Update FAQ</HeaderLink>
            <HeaderLink href={'/updateGallery'}>Update Gallery</HeaderLink>
          </div>
          <div className='flex-1'></div>
          <div className='md:hidden'>
            <UpdatePagesDropdownMenu />
          </div>
        </nav>
      </div>
    </header>
  );
}
