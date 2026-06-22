import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowRight } from 'lucide-react';
import './styles.css';

const navItems = [
  { label: 'Menu', href: '#menu' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const submenus = {
  Menu: [
    { label: 'View All', href: '/assets/caffe-milano.pdf' },
    { label: 'Coffee', href: '#menu' },
    { label: 'Pastry', href: '#menu' },
  ],
};

const pictureSections = [
  {
    id: 'menu',
    kicker: 'Caffe Milano Exclusive',
    title: 'Menu',
    text: 'Espresso, iced coffee, fresh pastry, and easy cafe favorites prepared for slow mornings and polished everyday breaks.',
    cta: 'Discover',
    href: '/assets/caffe-milano.pdf',
    image: '/assets/caffe-bag-cup.jpeg',
    alt: 'Caffe Milano branded cup and bag',
    side: 'right',
  },
  {
    id: 'about',
    kicker: 'Caffe Milano Exclusive',
    title: 'About',
    text: 'A composed cafe address for coffee, conversation, meetings, and a clean pause in the middle of the day.',
    cta: 'Discover',
    href: '#contact',
    image: '/assets/caffe-cups.jpeg',
    alt: 'Caffe Milano branded coffee cups',
    side: 'left',
  },
  {
    id: 'space',
    kicker: 'Caffe Milano Exclusive',
    title: 'Space',
    text: 'Warm service, crisp branding, and an intimate room made to feel considered without losing its everyday ease.',
    cta: 'Discover',
    href: '#gallery',
    image: '/assets/caffe-bag-cup.jpeg',
    alt: 'Caffe Milano takeaway cup beside a branded bag',
    side: 'right',
  },
];

function useRevealMotion() {
  useEffect(() => {
    const nodes = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.18 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function Logo({ compact = false, light = false }) {
  return (
    <img
      className={compact ? 'brand-logo brand-logo--compact' : 'brand-logo'}
      src="/assets/caffe-milano-logo-transparent.png"
      alt="Caffe Milano Exclusive"
      data-light={light ? 'true' : undefined}
    />
  );
}

function ArrowIcon() {
  return <ArrowRight className="arrow-icon" aria-hidden="true" strokeWidth={1.5} />;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => setOpen(false);
  const submenuItems = activeSubmenu ? submenus[activeSubmenu] : submenus.Menu;
  const leftNavItems = navItems.slice(0, 2);
  const rightNavItems = navItems.slice(2);

  return (
    <header
      className={`site-header${open ? ' site-header--open' : ''}${scrolled ? ' site-header--scrolled' : ''}${activeSubmenu ? ' site-header--submenu' : ''}`}
      onMouseLeave={() => setActiveSubmenu(null)}
    >
      <a className="header-route" href="#contact" onClick={close}>Lagos</a>
      <nav className="header-nav header-nav--left" aria-label="Primary navigation">
        {leftNavItems.map((item) => (
          <a
            key={item.label}
            className="header-item"
            href={item.href}
            onMouseEnter={() => setActiveSubmenu(submenus[item.label] ? item.label : null)}
            onClick={close}
          >
            {item.label}
          </a>
        ))}
      </nav>
      <a href="#home" className="header-logo" aria-label="Caffe Milano home" onClick={close}>
        <Logo compact />
      </a>
      <nav className="header-nav header-nav--right" aria-label="Secondary navigation">
        {rightNavItems.map((item) => (
          <a
            key={item.label}
            className="header-item"
            href={item.href}
            onMouseEnter={() => setActiveSubmenu(submenus[item.label] ? item.label : null)}
            onClick={close}
          >
            {item.label}
          </a>
        ))}
      </nav>
      <nav className="header-submenu" aria-label={`${activeSubmenu || 'Menu'} submenu`}>
        <div className="header-submenu__inner">
          {(submenuItems || []).map((item) => (
            <a key={item.label} href={item.href}>{item.label}</a>
          ))}
        </div>
      </nav>
      <button
        className="menu-toggle"
        type="button"
        aria-expanded={open}
        aria-label="Toggle menu"
        onClick={() => setOpen((value) => !value)}
      >
        <span />
        <span />
      </button>
      <nav className="mobile-panel" aria-label="Mobile navigation">
        {navItems.map((item) => (
          <a key={item.label} href={item.href} onClick={close}>{item.label}</a>
        ))}
        <a href="https://www.instagram.com/caffemilano_lagos/" target="_blank" rel="noreferrer" onClick={close}>
          Instagram
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero page-line" id="home" aria-label="Welcome">
      <div className="hero__lateral hero__lateral--left" data-reveal>
        <p>
          Welcome to Lagos, where Caffe Milano Exclusive brings coffee, pastry,
          and polished hospitality into one calm address.
        </p>
      </div>
      <div className="hero__title" data-reveal>
        <Logo compact />
        <h1><em>Welcome</em> to<br />Caffe Milano</h1>
      </div>
      <div className="hero__lateral hero__lateral--right" data-reveal>
        <p>
          A refined cafe moment for slow mornings, quick meetings, and an
          unhurried table in the middle of the day.
        </p>
      </div>
      <figure className="hero__picture picture-motion" data-reveal>
        <video
          src="/assets/caffe-milano-space.mp4"
          autoPlay
          muted
          loop
          playsInline
          poster="/assets/caffe-bag-cup.jpeg"
        />
      </figure>
    </section>
  );
}

function Quote() {
  return (
    <section className="quote page-line" data-reveal>
      <p>
        Caffe Milano Exclusive brings coffee, pastry, and warm hospitality into a
        polished setting for mornings, meetings, and quiet everyday pauses.
      </p>
    </section>
  );
}

function PictureText({ section }) {
  return (
    <section className={`picture-text picture-text--${section.side} page-line`} id={section.id}>
      <span className="picture-text__divider" aria-hidden="true" />
      <figure className="picture-text__media picture-motion" data-reveal>
        <img src={section.image} alt={section.alt} />
      </figure>
      <div className="picture-text__copy" data-reveal>
        <p className="kicker">{section.kicker}</p>
        <h2>{section.title}</h2>
        <p>{section.text}</p>
        <a className="text-link" href={section.href}>
          {section.cta} <ArrowIcon />
        </a>
      </div>
    </section>
  );
}

function BigPictureLink() {
  return (
    <section className="big-picture page-line" id="gallery">
      <a className="big-picture__link picture-motion" href="/assets/caffe-milano.pdf" data-reveal>
        <video
          src="/assets/caffe-milano-cups.mp4"
          autoPlay
          muted
          loop
          playsInline
          poster="/assets/caffe-cups.jpeg"
        />
        <span className="big-picture__copy">
          <span>Discover</span>
          <strong>our menu</strong>
        </span>
        <svg className="big-picture__circle-text" viewBox="0 0 1000 1000" aria-hidden="true">
          <defs>
            <path
              id="menu-circle"
              d="M 500,500 m -390,0 a 390,390 0 1,1 780,0 a 390,390 0 1,1 -780,0"
            />
          </defs>
          <text>
            <textPath href="#menu-circle" startOffset="0%">
              COFFEE, PASTRY AND HOSPITALITY AT THE HEART OF EVERYDAY MOMENTS. 
            </textPath>
          </text>
        </svg>
      </a>
    </section>
  );
}

function Contact() {
  const otherPlaces = ['Lagos - Nigeria', 'Coming soon'];
  const legal = ['Terms', 'Accessibility Statement', 'Privacy', 'Cookies'];

  return (
    <footer className="site-footer" id="contact">
      <section className="footer-main">
        <div className="footer-block footer-block--address" data-reveal>
          <h3>Caffe Milano</h3>
          <p>Lagos . Nigeria</p>
          <p>M. @caffemilano_lagos</p>
        </div>
        <nav className="footer-block footer-block--info" aria-label="Footer navigation" data-reveal>
          <h3>Info</h3>
          <a href="#menu">Menu</a>
          <a href="#gallery">Gallery</a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="footer-block footer-block--places" data-reveal>
          <h3>Caffe Milano Exclusive</h3>
          <ul>
            {otherPlaces.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <div className="footer-block footer-block--social" data-reveal>
          <h3>Follow us</h3>
          <a href="https://www.instagram.com/caffemilano_lagos/" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://www.instagram.com/caffemilano_lagos/" target="_blank" rel="noreferrer">Facebook</a>
        </div>
        <div className="footer-block footer-block--language" data-reveal>
          <h3>Languages</h3>
          <p>English</p>
        </div>
      </section>
      <section className="footer-bottom">
        <span className="footer-rule footer-rule--left" />
        <Logo compact />
        <span className="footer-rule footer-rule--right" />
        <p className="footer-credit">Caffe Milano 2026 . Lagos</p>
        <ul>
          {legal.map((item, index) => (
            <li key={item}>
              <a href="#contact">{item}</a>
              {index < legal.length - 1 ? <span>.</span> : null}
            </li>
          ))}
        </ul>
      </section>
    </footer>
  );
}

function App() {
  useRevealMotion();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Quote />
        {pictureSections.map((section) => (
          <PictureText key={section.id} section={section} />
        ))}
        <BigPictureLink />
      </main>
      <Contact />
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
