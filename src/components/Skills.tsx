import { useLanguage } from '../i18n/LanguageContext';
import { useInView } from '../hooks/useInView';

export default function Skills() {
  const { t } = useLanguage();
  const [ref, isVisible] = useInView<HTMLElement>();

  return (
    <section id="skills" className="section" ref={ref}>
      <div className={`fade-in${isVisible ? ' fade-in--visible' : ''}`}>
        <h2 className="section__title">{t.skills.sectionTitle}</h2>
        <div className="skills__grid">
          {t.skills.items.map((skill, i) => (
            <div
              key={i}
              className={`skill-card${isVisible ? ' skill-card--visible' : ''}`}
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="skill-card__glow" />
              <div className="skill-card__inner">
                <div className="skill-card__icon">{skill.icon}</div>
                <h3 className="skill-card__title">{skill.title}</h3>
                <p className="skill-card__desc">{skill.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
