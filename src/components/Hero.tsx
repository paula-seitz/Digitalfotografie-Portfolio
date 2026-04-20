import { useLanguage } from '../i18n/LanguageContext';
import { useEffect, useState } from 'react';

const GREETINGS = [
  { text: 'Hello', lang: 'EN' },
  { text: 'Hallo', lang: 'DE' },
  { text: 'Hola', lang: 'ES' },
  { text: 'Bonjour', lang: 'FR' },
  { text: 'Ciao', lang: 'IT' },
  { text: '你好', lang: 'ZH' },
  { text: 'こんにちは', lang: 'JA' },
  { text: '안녕하세요', lang: 'KO' },
  { text: 'Olá', lang: 'PT' },
  { text: 'Привет', lang: 'RU' },
  { text: 'مرحبا', lang: 'AR' },
  { text: 'Hej', lang: 'SV' },
];

const ORBS = [
  { size: 400, x: 15, y: 20, color: '108, 99, 255', delay: 0, duration: 20 },
  { size: 300, x: 70, y: 60, color: '0, 201, 167', delay: 5, duration: 25 },
  { size: 250, x: 50, y: 80, color: '255, 107, 107', delay: 10, duration: 22 },
  { size: 200, x: 80, y: 15, color: '255, 179, 71', delay: 3, duration: 18 },
];

export default function Hero() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [greetingFade, setGreetingFade] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setGreetingFade(false);
      setTimeout(() => {
        setGreetingIndex((prev) => (prev + 1) % GREETINGS.length);
        setGreetingFade(true);
      }, 400);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero">
      {/* Floating orbs */}
      <div className="hero__orbs" aria-hidden="true">
        {ORBS.map((orb, i) => (
          <div
            key={i}
            className="hero__orb"
            style={{
              width: orb.size,
              height: orb.size,
              left: `${orb.x}%`,
              top: `${orb.y}%`,
              background: `radial-gradient(circle, rgba(${orb.color}, 0.15) 0%, transparent 70%)`,
              animationDelay: `${orb.delay}s`,
              animationDuration: `${orb.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Grid pattern overlay */}
      <div className="hero__grid" aria-hidden="true" />

      <div className={`hero__content ${visible ? 'hero__content--visible' : ''}`}>
        <div className="hero__badge">
          <span className="hero__badge-dot" />
          <span className={`hero__greeting-text${greetingFade ? ' hero__greeting-text--visible' : ''}`}>
            {GREETINGS[greetingIndex].text}
          </span>
          <span className="hero__greeting-comma">,</span>
        </div>
        <h1 className="hero__name">
          <span className="hero__name-line">{t.hero.name}</span>
        </h1>
        <p className="hero__title">
          <span className="hero__title-bracket">&lt;</span>
          {' '}{t.hero.title}{' '}
          <span className="hero__title-bracket">/&gt;</span>
        </p>
        <p className="hero__subtitle">{t.hero.subtitle}</p>
        <div className="hero__actions">
          <div className="hero__buttons">
            <a href="#projects" className="hero__cta" onClick={(e) => {
              e.preventDefault();
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              <span>{t.hero.cta}</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
              </svg>
            </a>
            {/* CV Download Button entfernt, Studierende können später selbst eine Datei verlinken */}
          </div>
          <div className="hero__scroll-hint">
            <div className="hero__scroll-mouse">
              <div className="hero__scroll-wheel" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
