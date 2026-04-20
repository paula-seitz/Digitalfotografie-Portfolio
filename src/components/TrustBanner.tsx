import { useLanguage } from '../i18n/LanguageContext';

const COMPANIES = [
  'Google',
  'Siemens',
  'BMW Group',
  'SAP',
  'Deutsche Telekom',
  'Zalando',
  'N26',
  'Allianz',
  'Bosch',
  'Spotify',
];

export default function TrustBanner() {
  const { language } = useLanguage();
  const label = language === 'de' ? 'Unternehmen, mit denen ich gearbeitet habe' : 'Companies I\'ve worked with';

  // Double the items for seamless infinite scroll
  const items = [...COMPANIES, ...COMPANIES];

  return (
    <section className="trust-banner">
      <p className="trust-banner__label">{label}</p>
      <div className="trust-banner__track">
        <div className="trust-banner__marquee">
          {items.map((company, i) => (
            <span key={i} className="trust-banner__item">
              {company}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
