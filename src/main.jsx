import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  BellRing,
  ChevronDown,
  Gift,
  Menu as MenuIcon,
  Utensils,
  X,
} from 'lucide-react';
import './styles.css';

const menuHref = '/menu';
const pdfHref = '/assets/caffe-milano-beverage-menu.pdf';
const reservationHref = '/reservation';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Catering', href: '/#catering' },
  { label: 'Gift Cards', href: '/#gift-cards' },
  { label: 'About', href: '/#about' },
  { label: 'Reserve a Table', href: reservationHref, dropdown: true },
  { label: 'Contact', href: '/#contact' },
];

function scrollToSection(selector) {
  const target = document.querySelector(selector);

  if (!target) {
    return;
  }

  const headerOffset = window.innerWidth <= 1100 ? 72 : 96;
  const targetTop = target.getBoundingClientRect().top + window.scrollY - headerOffset;
  window.scrollTo({ top: Math.max(0, targetTop), behavior: 'auto' });
}

const signatureItems = [
  {
    name: 'Milano Sunset',
    price: 'N15,500',
    text: 'Vodka, Aperol, passion fruit puree, and lime juice.',
  },
  {
    name: 'Rosso Milano',
    price: 'N15,500',
    text: 'Gin, Aperol, strawberry syrup, and lime.',
  },
  {
    name: 'Bella Note',
    price: 'N15,500',
    text: 'Tequila, passion fruit, honey, and prosecco.',
  },
  {
    name: 'The Boutique Bloom',
    price: 'N15,500',
    text: 'Gin, pineapple, passion, and basil.',
  },
  {
    name: 'Whispering Green',
    price: 'N15,500',
    text: 'Whiskey, kiwi, mint, lime, and soda.',
  },
  {
    name: 'Milano Heat Index',
    price: 'N15,500',
    text: 'Tequila, pineapple, grape, and cayenne.',
  },
  {
    name: 'Pornstar Martini',
    price: 'N15,500',
    text: 'Vodka, passion fruit, and vanilla, served with prosecco.',
  },
];

const drinksItems = [
  {
    name: 'Milano Baby Fizz',
    price: 'N6,000',
    text: 'Grenadine syrup, lemon juice, Sprite, and maraschino cherry.',
  },
  {
    name: 'Citrus Vanilla Spritz',
    price: 'N6,500',
    text: 'Orange juice, lime juice, vanilla syrup, and Sprite.',
  },
  {
    name: 'Coconut & Pineapple Cooler',
    price: 'N7,000',
    text: 'Coconut syrup, pineapple juice, blue curacao, and lime juice.',
  },
  {
    name: 'Water',
    price: 'N1,000',
    text: 'Still water.',
  },
  {
    name: 'Soft Drinks',
    price: 'N1,500',
    text: 'Assorted soft drinks.',
  },
  {
    name: 'Ginger Beer',
    price: 'N4,000',
    text: 'Cold ginger beer.',
  },
];

const classicCocktails = [
  {
    name: 'Margarita',
    price: 'N12,500',
    text: 'Tequila, triple sec, and lime.',
  },
  {
    name: 'Old Fashioned',
    price: 'N12,500',
    text: 'Whiskey, sugar, and bitters.',
  },
  {
    name: 'Negroni',
    price: 'N12,500',
    text: 'Gin, Campari, and sweet vermouth.',
  },
  {
    name: 'Mojito',
    price: 'N12,500',
    text: 'Rum, mint, lime, sugar, and soda.',
  },
  {
    name: 'Whiskey Sour',
    price: 'N12,500',
    text: 'Whiskey, lemon, and sugar.',
  },
  {
    name: 'Cosmopolitan',
    price: 'N12,500',
    text: 'Vodka, triple sec, cranberry, and lime.',
  },
  {
    name: 'Classic Daiquiri',
    price: 'N12,500',
    text: 'White rum, lime, and simple syrup.',
  },
  {
    name: 'Strawberry Daiquiri',
    price: 'N12,500',
    text: 'Passion fruit daiquiri.',
  },
];

const premiumAndBeerItems = [
  { name: 'Espresso Martini', price: 'N13,500', text: 'Premium classic cocktail.' },
  { name: 'Aperol Spritz', price: 'N13,500', text: 'Premium classic cocktail.' },
  { name: 'Long Island Iced Tea', price: 'N13,500', text: 'Premium classic cocktail.' },
  { name: 'Heineken', price: 'N4,000', text: 'Beer.' },
  { name: 'Peroni', price: 'N8,000', text: 'Beer.' },
];

const softDrinkItems = [
  { name: 'Water', price: 'N1,000', text: 'Still water.' },
  { name: 'Soft Drinks', price: 'N1,500', text: 'Assorted soft drinks.' },
  { name: 'Ginger Beer', price: 'N4,000', text: 'Cold ginger beer.' },
  { name: 'Energy Drink', price: 'N5,000', text: 'Energy drink.' },
  { name: 'Juice Pitcher', price: 'N6,000', text: 'Juice pitcher.' },
  { name: 'Cranberry Juice (Bottle)', price: 'N12,000', text: 'Bottle of cranberry juice.' },
];

const coffeeItems = [
  { name: 'Espresso', price: 'N3,500', text: 'Coffee.' },
  { name: 'Double Espresso', price: 'N6,000', text: 'Coffee.' },
  { name: 'Americano', price: 'N8,000', text: 'Coffee.' },
  { name: 'Cappuccino', price: 'N7,000', text: 'Coffee.' },
  { name: 'Latte', price: 'N7,000', text: 'Coffee.' },
  { name: 'Flat White', price: 'N7,000', text: 'Coffee.' },
  { name: 'Mocha', price: 'N7,000', text: 'Coffee.' },
  { name: 'Vanilla Latte', price: 'N8,500', text: 'Coffee.' },
  { name: 'Caramel Latte', price: 'N8,500', text: 'Coffee.' },
  { name: 'Cafe Latte', price: 'N8,000', text: 'Coffee.' },
  { name: 'Affogato', price: 'N8,000', text: 'Coffee.' },
  { name: 'Caramel Macchiato', price: 'N8,000', text: 'Coffee.' },
  { name: 'Matcha', price: 'N8,000', text: 'Coffee.' },
  { name: 'Hot Chocolate', price: 'N7,000', text: 'Coffee.' },
  { name: 'Iced Latte', price: 'N7,000', text: 'Coffee.' },
  { name: 'Iced Americano', price: 'N7,000', text: 'Coffee.' },
  { name: 'Extra Topping', price: 'N1,500', text: 'Add-on.' },
];

const smoothieItems = [
  { name: 'Berry Bliss', price: 'N12,500', text: 'Smoothie.' },
  { name: 'Tropical Sunrise', price: 'N9,000', text: 'Smoothie.' },
  { name: 'Green Glow', price: 'N9,500', text: 'Smoothie.' },
  { name: 'Peach Passion Smoothie', price: 'N12,500', text: 'Smoothie.' },
];

const milkshakeItems = [
  { name: 'Classic Vanilla Shake', price: 'N10,500', text: 'Milkshake.' },
  { name: 'Chocolate Indulgence', price: 'N10,500', text: 'Milkshake.' },
  { name: 'Strawberry Cream Shake', price: 'N10,500', text: 'Milkshake.' },
  { name: 'Caramel Cookie Shake', price: 'N10,500', text: 'Milkshake.' },
];

const menuCategories = [
  {
    id: 'welcome-drinks',
    label: 'Welcome Drinks',
    title: 'Welcome Drinks',
    text: 'Non-alcoholic welcome drinks from the Caffe Milano beverage menu.',
    items: drinksItems.slice(0, 3),
  },
  {
    id: 'signature-cocktails',
    label: 'Signature Cocktails',
    title: 'Milano Signature Cocktails',
    text: 'House cocktails from the Milano beverage menu.',
    items: signatureItems,
  },
  {
    id: 'classic-cocktails',
    label: 'Classic Cocktails',
    title: 'Classic Cocktails',
    text: 'Classic cocktail pours from the Caffe Milano beverage menu.',
    items: classicCocktails,
  },
  {
    id: 'premium-beer',
    label: 'Premium & Beer',
    title: 'Premium Classics & Beer',
    text: 'Premium classics and beer selections.',
    items: premiumAndBeerItems,
  },
  {
    id: 'soft-drinks',
    label: 'Soft Drinks & Juices',
    title: 'Soft Drinks & Juices',
    text: 'Soft drinks, juices, ginger beer, and bottled drinks.',
    items: softDrinkItems,
  },
  {
    id: 'coffee',
    label: 'Coffee',
    title: 'Coffee',
    text: 'Coffee selections from the Caffe Milano beverage menu.',
    items: coffeeItems,
  },
  {
    id: 'smoothies',
    label: 'Smoothies',
    title: 'Smoothies',
    text: 'Fruit-led smoothie selections.',
    items: smoothieItems,
  },
  {
    id: 'milkshakes',
    label: 'Milkshakes',
    title: 'Milkshakes',
    text: 'Creamy milkshake selections.',
    items: milkshakeItems,
  },
];

const experienceCards = [
  {
    title: 'Coffee Displays',
    text: 'Elegant coffee service with branded cups, pastry, and polished presentation.',
    image: '/assets/caffe-cups.jpeg',
  },
  {
    title: 'Professional Cafe Team',
    text: 'An attentive team for meetings, celebrations, and everyday hospitality.',
    image: '/assets/caffe-bag-cup.jpeg',
  },
  {
    title: 'Years of Experience',
    text: 'Warm service and detail-led cafe moments shaped for Lagos guests.',
    image: '/assets/caffe-cups.jpeg',
  },
];

const testimonials = [
  {
    source: 'Google',
    quote: 'Beautiful space, smooth coffee, and service that makes a quick visit feel considered.',
    author: 'Ada M.',
  },
  {
    source: 'Instagram',
    quote: 'The branding is lovely and the iced latte has become my regular stop in Lagos.',
    author: 'Tomi A.',
  },
  {
    source: 'Guest Note',
    quote: 'Quiet enough for a meeting, warm enough to stay longer than planned.',
    author: 'Kelechi O.',
  },
  {
    source: 'Cafe Guest',
    quote: 'The pastry and cappuccino pairing is simple, clean, and very memorable.',
    author: 'Sarah E.',
  },
];

function useRevealMotion(dependency) {
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
      { rootMargin: '0px 0px -9% 0px', threshold: 0.12 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [dependency]);
}

function getCurrentPath() {
  return window.location.pathname.replace(/\/+$/, '') || '/';
}

function useCurrentPath() {
  const [path, setPath] = useState(getCurrentPath);

  useEffect(() => {
    const onPopState = () => setPath(getCurrentPath());
    const onClick = (event) => {
      const anchor = event.target.closest('a[href]');

      if (!anchor || event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const url = new URL(anchor.href, window.location.href);
      const routePaths = ['/', '/menu', '/reservation'];

      if (url.origin !== window.location.origin || !routePaths.includes(url.pathname)) {
        return;
      }

      event.preventDefault();
      window.history.pushState({}, '', `${url.pathname}${url.hash}`);
      setPath(getCurrentPath());

      if (url.hash) {
        requestAnimationFrame(() => scrollToSection(url.hash));
        return;
      }

      window.scrollTo({ top: 0, behavior: 'auto' });
    };

    window.addEventListener('popstate', onPopState);
    document.addEventListener('click', onClick);

    return () => {
      window.removeEventListener('popstate', onPopState);
      document.removeEventListener('click', onClick);
    };
  }, []);

  return path;
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeAll = () => {
    setMenuOpen(false);
    setOrderOpen(false);
  };

  return (
    <header className={`site-header${scrolled ? ' site-header--scrolled' : ''}${menuOpen ? ' site-header--open' : ''}`}>
      <a className="site-header__brand" href="/" aria-label="Caffe Milano home" onClick={closeAll}>
        <img src="/assets/caffe-milano-logo-transparent.png" alt="Caffe Milano Exclusive" />
      </a>

      <nav className="site-header__nav" aria-label="Primary navigation">
        {navItems.map((item) => (
          <a key={item.label} href={item.href} onClick={closeAll}>
            {item.label}
            {item.dropdown ? <ChevronDown aria-hidden="true" /> : null}
          </a>
        ))}
      </nav>

      <div className="site-header__actions">
        <a className="action-pair" href={menuHref}>
          <span>Menu</span>
          <span className="action-square"><Utensils aria-hidden="true" /></span>
        </a>
        <div className={`order-action${orderOpen ? ' order-action--open' : ''}`}>
          <button type="button" onClick={() => setOrderOpen((value) => !value)}>
            <span>Order Now</span>
            <ChevronDown aria-hidden="true" />
          </button>
          <div className="order-action__panel">
            <a href={menuHref} onClick={closeAll}>View Menu</a>
            <a href={reservationHref} onClick={closeAll}>Reserve a Table</a>
          </div>
        </div>
        <a className="action-square" href={reservationHref} aria-label="Reserve a table">
          <BellRing aria-hidden="true" />
        </a>
      </div>

      <button
        className="mobile-toggle"
        type="button"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((value) => !value)}
      >
        {menuOpen ? <X aria-hidden="true" /> : <MenuIcon aria-hidden="true" />}
      </button>

      <nav className="mobile-drawer" aria-label="Mobile navigation">
        {navItems.map((item) => (
          <a key={item.label} href={item.href} onClick={closeAll}>{item.label}</a>
        ))}
        <a href={menuHref} onClick={closeAll}>Menu</a>
        <a href={reservationHref} onClick={closeAll}>Order Now</a>
      </nav>
    </header>
  );
}

function RatingCard({ compact = false }) {
  return (
    <aside className={`rating-card${compact ? ' rating-card--compact' : ''}`} aria-label="Guest rating">
      <div className="rating-card__top">
        <span className="stars" aria-hidden="true">*****</span>
        <span className="rating-card__google">G</span>
      </div>
      <div className="rating-card__body">
        <span className="rating-card__score">4.9</span>
        <span className="rating-card__slash">/5</span>
        <div>
          <strong>Excellent</strong>
          <span>Based on cafe guests</span>
        </div>
      </div>
    </aside>
  );
}

function Hero() {
  return (
    <section className="hero" id="home">
      <video
        className="hero__media"
        src="/assets/caffe-milano-space.mp4"
        autoPlay
        muted
        loop
        playsInline
        poster="/assets/caffe-bag-cup.jpeg"
      />
      <div className="section-shade" />
      <div className="hero__title">
        <h1>Flavors<br />That Stay</h1>
      </div>
      <span className="hero__side hero__side--left" data-reveal>Serving Lagos</span>
      <span className="hero__side hero__side--right" data-reveal>Established 2025</span>
      <p className="hero__intro" data-reveal>
        At Caffe Milano, every cup is a tribute to warm hospitality and every moment is crafted for today. We bring together polished service, coffee rituals, and the pace of modern Lagos.
      </p>
      <RatingCard />
    </section>
  );
}

function Spirit() {
  return (
    <section className="image-story" id="about">
      <img src="/assets/caffe-bag-cup.jpeg" alt="Caffe Milano branded bag and coffee" />
      <div className="section-shade section-shade--soft" />
      <div className="image-story__copy" data-reveal>
        <h2>The Spirit of<br />Milano Coffee</h2>
        <p>From warm service to smooth flavor, every detail tells a story.</p>
        <a className="button button--light" href="/#contact">About Us</a>
      </div>
    </section>
  );
}

function SignatureMenu() {
  return (
    <section className="signature-menu" id="menu">
      <div className="menu-board" data-reveal>
        <div className="menu-board__head">
          <h2>Signature<br />Plates</h2>
          <Utensils aria-hidden="true" />
        </div>
        <div className="menu-board__items">
          {signatureItems.map((item) => (
            <article className="menu-row" key={item.name}>
              <div>
                <h3>{item.name}</h3>
                <p>{item.text}</p>
              </div>
              <strong>{item.price}</strong>
            </article>
          ))}
        </div>
      </div>
      <div className="menu-side">
        <div className="menu-side__copy" data-reveal>
          <h2>Signature dishes.<br />Classic roots.</h2>
          <p>
            Every item on our menu reflects the Caffe Milano ritual: recipes refined through care, thoughtful presentation, and polished service for today&apos;s cafe guest.
          </p>
          <a className="button button--dark" href={reservationHref}>Reserve a Table</a>
        </div>
        <figure className="menu-side__image">
          <img src="/assets/caffe-cups.jpeg" alt="Caffe Milano coffee cups" />
        </figure>
      </div>
    </section>
  );
}

function Catering() {
  return (
    <section className="catering" id="catering">
      <div className="catering__intro" data-reveal>
        <span>Exceptional Coffee</span>
        <h2>Catering<br />The Milano Way</h2>
        <span>Anywhere</span>
        <p>
          Whether you&apos;re hosting a meeting, private celebration, or brand gathering, our cafe experience brings the warmth of Caffe Milano straight to your table.
        </p>
      </div>
      <div className="catering__grid">
        {experienceCards.map((card) => (
          <article className="experience-card" key={card.title} data-reveal>
            <img src={card.image} alt="" />
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Drinks() {
  return (
    <section className="drinks" id="drinks">
      <div className="drinks__copy" data-reveal>
        <h2>Complete<br />The Experience</h2>
        <p>From espresso classics to chilled cafe favorites, every drink is designed to pair perfectly with your moment.</p>
        <a className="button button--dark" href={menuHref}>Open Menu</a>
        <div className="drinks__list">
          {drinksItems.map((item) => (
            <article className="drinks__row" key={item.name}>
              <div>
                <h3>{item.name}</h3>
                <p>{item.text}</p>
              </div>
              <strong>{item.price}</strong>
            </article>
          ))}
        </div>
      </div>
      <figure className="drinks__media" data-reveal>
        <video
          src="/assets/caffe-milano-cups.mp4"
          autoPlay
          muted
          loop
          playsInline
          poster="/assets/caffe-cups.jpeg"
        />
      </figure>
    </section>
  );
}

function GiftCards() {
  return (
    <section className="gift-cards" id="gift-cards">
      <span className="gift-cards__side gift-cards__side--left">Share the experience.</span>
      <span className="gift-cards__side gift-cards__side--right">Give them a Milano moment.</span>
      <h2 data-reveal>Gift a Taste<br />of Milano</h2>
      <div className="gift-cards__stack" data-reveal>
        <span className="gift-card gift-card--cream"><Gift aria-hidden="true" /></span>
        <span className="gift-card gift-card--gold">MILANO</span>
        <span className="gift-card gift-card--dark">CAFFE</span>
      </div>
      <p data-reveal>
        Whether it&apos;s a birthday, celebration, or simple thank you, give someone a reason to enjoy a Milano moment.
      </p>
      <a className="button button--dark" href={reservationHref}>Order Now</a>
    </section>
  );
}

function Rooted() {
  return (
    <section className="rooted">
      <img src="/assets/caffe-bag-cup.jpeg" alt="Caffe Milano cafe atmosphere" />
      <div className="section-shade section-shade--left" />
      <div className="rooted__copy" data-reveal>
        <h2>Rooted in<br />Experience</h2>
        <p>
          Since opening in Lagos, Caffe Milano has been a place for measured coffee, polished hospitality, and unhurried everyday rituals. Each visit is a quiet pause shaped by warm service, considered details, and the comfort of something familiar made with care.
        </p>
      </div>
    </section>
  );
}

function Reviews() {
  const repeatedReviews = useMemo(() => [...testimonials, ...testimonials], []);

  return (
    <section className="reviews">
      <div className="reviews__heading" data-reveal>
        <h2>What Our<br />Guests Say</h2>
        <RatingCard compact />
      </div>
      <div className="reviews__track" data-reveal>
        <div className="reviews__rail">
          {repeatedReviews.map((review, index) => (
            <article className="review-card" key={`${review.author}-${index}`}>
              <span className="stars" aria-hidden="true">*****</span>
              <span>{review.source}</span>
              <p>{review.quote}</p>
              <small>Author</small>
              <strong>{review.author}</strong>
            </article>
          ))}
        </div>
      </div>
      <p className="reviews__prompt">Have you already visited our cafe and left with great memories?</p>
      <a className="text-underline" href="https://www.instagram.com/caffemilano_lagos/" target="_blank" rel="noreferrer">
        Be sure to leave us a review!
      </a>
    </section>
  );
}

function MenuPage() {
  return (
    <main className="menu-page">
      <section className="menu-page__hero">
        <div className="menu-page__hero-copy">
          <span>Spices of Milano</span>
          <h1>Menu</h1>
          <p>New discoveries</p>
          <small>Every cup tells a story of care, polish, and warm Lagos hospitality...</small>
        </div>
        <figure data-reveal>
          <video src="/assets/caffe-milano-cups.mp4" autoPlay muted loop playsInline poster="/assets/caffe-cups.jpeg" />
        </figure>
      </section>

      <section className="menu-page__categories" aria-label="Menu categories">
        <div className="menu-page__category-rail">
          {menuCategories.map((category) => (
            <a key={category.id} href={`#${category.id}`}>{category.label}</a>
          ))}
        </div>
      </section>

      {menuCategories.map((category) => (
        <section className="menu-category" id={category.id} key={category.id}>
          <div className="menu-category__intro" data-reveal>
            <h2>{category.title}</h2>
            <p>{category.text}</p>
          </div>
          <div className="menu-category__items">
            {category.items.map((item) => (
              <article className="menu-category__row" key={`${category.id}-${item.name}`} data-reveal>
                <div>
                  <h3>{item.name}</h3>
                  <p>{item.text}</p>
                </div>
                <strong>{item.price}</strong>
              </article>
            ))}
          </div>
        </section>
      ))}

    </main>
  );
}

function ReservationPage() {
  return (
    <main className="reservation-page">
      <section className="reservation-hero">
        <video src="/assets/caffe-milano-space.mp4" autoPlay muted loop playsInline poster="/assets/caffe-bag-cup.jpeg" />
        <div className="section-shade section-shade--soft" />
        <div className="reservation-hero__copy" data-reveal>
          <span>Reserve a Table</span>
          <h1>A Beautiful Pause<br />in Lagos</h1>
          <p>Settle into warm service, smooth coffee, and a table prepared with the easy polish of Caffe Milano.</p>
        </div>
      </section>

      <section className="reservation-panel">
        <div className="reservation-panel__intro" data-reveal>
          <h2>Plan your Milano moment</h2>
          <p>Choose a date, time, and party size. For larger gatherings or catered cafe service, include a short note and the team will help shape the details.</p>
          <div className="reservation-panel__notes">
            <span>35a Adeboye Doherty, Lekki Phase 1</span>
            <span>Mon-Fri 8 AM - 9 PM</span>
            <span>Sat-Sun 9 AM - 10 PM</span>
          </div>
        </div>
        <form className="reservation-form" data-reveal>
          <label>
            Name
            <input type="text" name="name" placeholder="Your name" />
          </label>
          <label>
            Email
            <input type="email" name="email" placeholder="you@example.com" />
          </label>
          <label>
            Phone
            <input type="tel" name="phone" placeholder="+234" />
          </label>
          <label>
            Guests
            <select name="guests" defaultValue="2">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6+</option>
            </select>
          </label>
          <label>
            Date
            <input type="date" name="date" />
          </label>
          <label>
            Time
            <input type="time" name="time" />
          </label>
          <label className="reservation-form__wide">
            Notes
            <textarea name="notes" rows="4" placeholder="Occasion, preferred seating, or any special request" />
          </label>
          <button className="button button--dark reservation-form__wide" type="button">Request Reservation</button>
        </form>
      </section>
    </main>
  );
}

function Footer() {
  const discover = ['Home', 'Catering', 'Gift Cards', 'About', 'Contact'];

  return (
    <footer className="site-footer" id="contact">
      <div className="footer-top">
        <section>
          <h3>Locations</h3>
          <p>Lagos</p>
          <p>35a Adeboye Doherty, Lekki Phase 1</p>
          <p>Lagos, Nigeria</p>
        </section>
        <section>
          <h3>Hours</h3>
          <p>Mon-Fri</p>
          <p>8 AM - 9 PM</p>
          <p>Sat-Sun</p>
          <p>9 AM - 10 PM</p>
        </section>
        <section className="footer-logo">
          <img src="/assets/caffe-milano-logo-transparent.png" alt="Caffe Milano Exclusive" />
        </section>
        <section>
          <h3>Contact</h3>
          <p>Lagos</p>
          <p>@caffemilano_lagos</p>
          <a href="https://www.instagram.com/caffemilano_lagos/" target="_blank" rel="noreferrer">Instagram</a>
        </section>
        <section>
          <h3>Newsletter</h3>
          <p>Get the latest updates.</p>
          <p>Coming soon...</p>
        </section>
      </div>
      <div className="footer-links">
        <section>
          <h3>Discover</h3>
          {discover.map((item) => <a key={item} href={`/#${item.toLowerCase().replaceAll(' ', '-')}`}>{item}</a>)}
        </section>
        <section>
          <h3>Legals</h3>
          <a href="/#contact">Privacy Policy</a>
          <a href="/#contact">Terms and Conditions</a>
          <a href="/#contact">Cookie Policy</a>
        </section>
        <section>
          <h3>Actions</h3>
          <a href={menuHref}>View Menu</a>
          <a href="/#gift-cards">Order Gift Card</a>
          <a href={reservationHref}>Reserve a Table</a>
        </section>
        <section>
          <h3>Socials</h3>
          <a href="https://www.instagram.com/caffemilano_lagos/" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://www.instagram.com/caffemilano_lagos/" target="_blank" rel="noreferrer">Facebook</a>
        </section>
      </div>
      <strong className="footer-wordmark">CAFFE MILANO</strong>
      <div className="footer-bottom">
        <span>(c) 2026 Caffe Milano</span>
        <span>All Rights Reserved</span>
        <span>Made by Triple Time</span>
      </div>
    </footer>
  );
}

function App() {
  const path = useCurrentPath();
  useRevealMotion(path);

  useEffect(() => {
    const scrollToHash = () => {
      if (!window.location.hash) {
        return;
      }

      scrollToSection(window.location.hash);
    };

    requestAnimationFrame(scrollToHash);
    const timeouts = [150, 500, 1100, 1900].map((delay) => window.setTimeout(scrollToHash, delay));
    window.addEventListener('load', scrollToHash);
    window.addEventListener('hashchange', scrollToHash);

    return () => {
      timeouts.forEach((timeout) => window.clearTimeout(timeout));
      window.removeEventListener('load', scrollToHash);
      window.removeEventListener('hashchange', scrollToHash);
    };
  }, [path]);

  if (path === '/menu') {
    return (
      <>
        <Header />
        <MenuPage />
        <Footer />
      </>
    );
  }

  if (path === '/reservation') {
    return (
      <>
        <Header />
        <ReservationPage />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Spirit />
        <SignatureMenu />
        <Catering />
        <Drinks />
        <GiftCards />
        <Rooted />
        <Reviews />
      </main>
      <Footer />
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
