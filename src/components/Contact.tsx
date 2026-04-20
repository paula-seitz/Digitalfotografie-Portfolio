import { useLanguage } from '../i18n/LanguageContext';
import SnakeGame from './SnakeGame';

export default function Contact() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="contact">
      <h2 className="section__title">{t.contact.sectionTitle}</h2>
      <p className="contact__desc">{t.contact.description}</p>
      <div className="contact__buttons">
        <a
          href="mailto:{email}"
          className="contact__btn contact__btn--primary"
        >
          ✉ {t.contact.email}
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="contact__btn contact__btn--secondary"
        >
          🔗 {t.contact.linkedin}
        </a>
      </div>
      <SnakeGame />
    </section>
  );
}
