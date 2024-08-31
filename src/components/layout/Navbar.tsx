import Link from 'next/link';

export default function Navbar({ pathname }: { pathname: string }) {
  return (
    <nav className="hidden xl:flex gap-[2vw] fixed left-1/2 -translate-x-1/2 top-12 z-40 mix-blend-difference">
      <Link className={`${pathname === '/' ? 'nav-link--active' : 'nav-link'}`} href="/">
        Home
      </Link>

      <Link
        className={`${pathname === '/community' ? 'nav-link--active' : 'nav-link'}`}
        href="/community"
      >
        Community
      </Link>

      <Link
        className={`${pathname === '/coaches' ? 'nav-link--active' : 'nav-link'}`}
        href="/coaches"
      >
        Coaches
      </Link>

      <Link
        className={`${pathname === '/tutorials' ? 'nav-link--active' : 'nav-link'}`}
        href="/tutorials"
      >
        Tutorials
      </Link>

      <Link
        className={`${pathname === '/pricing' ? 'nav-link--active' : 'nav-link'}`}
        href="/pricing"
      >
        Pricing
      </Link>

      <a
        className="nav-link"
        href="https://kick-bass.store/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Shop
      </a>
    </nav>
  );
}
