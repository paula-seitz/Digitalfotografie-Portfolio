import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    if (!isHome) {
      window.location.href = `/#${id}`;
      return;
    }
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar__logo">
        {t.hero.name}
      </Link>

      <button
        className="navbar__hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>

      <ul className={`navbar__links${menuOpen ? ' navbar__links--open' : ''}`}>
        {menuOpen && (
          <li className="navbar__overlay" onClick={() => setMenuOpen(false)} />
        )}
        <li>
          <a href="#about" onClick={(e) => { e.preventDefault(); scrollTo('about'); }}>
            {t.nav.about}
          </a>
        </li>
        <li>
          <a href="#skills" onClick={(e) => { e.preventDefault(); scrollTo('skills'); }}>
            Skills
          </a>
        </li>
        <li>
          <a href="#projects" onClick={(e) => { e.preventDefault(); scrollTo('projects'); }}>
            {t.nav.projects}
          </a>
        </li>
        <li>
          <a href="#contact" onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}>
            {t.nav.contact}
          </a>
        </li>
        <li>
          <div className="lang-switch">
            <button
              className={`lang-switch__btn${language === 'en' ? ' lang-switch__btn--active' : ''}`}
              onClick={() => setLanguage('en')}
            >
              EN
            </button>
            <button
              className={`lang-switch__btn${language === 'de' ? ' lang-switch__btn--active' : ''}`}
              onClick={() => setLanguage('de')}
            >
              DE
            </button>
          </div>
        </li>
      </ul>
    </nav>
  );
}
