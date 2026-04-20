import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { useInView } from '../hooks/useInView';
import { projects } from '../data/projects';

export default function Projects() {
  const { language, t } = useLanguage();
  const [ref, isVisible] = useInView<HTMLElement>();
  const projectList = projects[language];

  return (
    <section id="projects" className="section" ref={ref}>
      <div className={`fade-in${isVisible ? ' fade-in--visible' : ''}`}>
        <h2 className="section__title">{t.projects.sectionTitle}</h2>
        <p className="section__subtitle">{t.projects.sectionSubtitle}</p>
        <div className="projects__grid">
          {projectList.map((project, i) => (
            <Link
              key={project.id}
              to={`/project/${project.id}`}
              className={`project-card${isVisible ? ' project-card--visible' : ''}`}
              style={{ transitionDelay: `${i * 0.15}s` }}
            >
              <div className="project-card__glow" />
              <div className="project-card__thumbnail">
                {project.thumbnail ? (
                  <img src={project.thumbnail} alt={project.title} className="project-card__thumbnail-img" />
                ) : (
                  <div
                    className="project-card__thumbnail-inner"
                    style={{ color: `${project.color}33`, background: `linear-gradient(135deg, ${project.color}15, ${project.color}30)`, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    {project.title.split('—')[0].trim()}
                  </div>
                )}
                <div className="project-card__year">{project.year}</div>
              </div>
              <div className="project-card__info">
                <p className="project-card__category">{project.category}</p>
                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__overview">{project.overview}</p>
                <span className="project-card__link">
                  {t.projects.viewProject} →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
