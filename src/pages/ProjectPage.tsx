import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext';
import { projects } from '../data/projects';
import Footer from '../components/Footer';
import MasonryGallery from '../components/MasonryGallery';
import { useEffect } from 'react';

export default function ProjectPage() {
  const { id } = useParams<{ id: string }>();
  const { language, t } = useLanguage();
  const project = projects[language].find((p) => p.id === id);
  const nextProject = project?.nextProject
    ? projects[language].find((p) => p.id === project.nextProject)
    : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="project-detail" style={{ textAlign: 'center', padding: '10rem 2rem' }}>
        <h2>Project not found</h2>
        <Link to="/" style={{ color: 'var(--color-accent)', marginTop: '1rem', display: 'inline-block' }}>
          {t.projects.backToProjects}
        </Link>
      </div>
    );
  }

  // Spezialfall: Fotoportfolio-Projekt mit Masonry-Gallery und Tabs
  if (project.id === 'photoportfolio' && project.galleryWithCategories) {
    const { categories, images } = project.galleryWithCategories;
    return (
      <div className="project-detail">
        {/* Header */}
        <div className="project-detail__header">
          <Link to="/" className="project-detail__back">
            {t.projects.backToProjects}
          </Link>
          <p className="project-detail__category">{project.category}</p>
          <h1 className="project-detail__title">{project.title}</h1>
          <p className="project-detail__overview">{project.overview}</p>
        </div>

        {/* Body */}
        <div className="project-detail__body">
          {/* Hero Image */}
          <div className="project-detail__hero-img">
            {project.thumbnail ? (
              <img src={project.thumbnail} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <span>{project.title.split('—')[0].trim()}</span>
            )}
          </div>

          {/* Metadata */}
          <div className="project-detail__meta">
            <div className="project-detail__meta-item">
              <h4>{t.projects.role}</h4>
              <p>{project.role}</p>
            </div>
            <div className="project-detail__meta-item">
              <h4>{t.projects.duration}</h4>
              <p>{project.duration}</p>
            </div>
            <div className="project-detail__meta-item">
              <h4>Client</h4>
              <p>{project.client}</p>
            </div>
            <div className="project-detail__meta-item">
              <h4>{t.projects.tools}</h4>
              <p>{project.tools.join(', ')}</p>
            </div>
          </div>

          {/* Challenge Section */}
          {project.challenge && (
            <div className="project-detail__section">
              <h3>Challenge</h3>
              <p>{project.challenge}</p>
              {project.challengeDetails && (
                <ul style={{ marginTop: '1rem' }}>
                  {project.challengeDetails.map((detail, i) => (
                    <li key={i} style={{ marginBottom: '0.5rem' }}>{detail}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Solution Section */}
          {project.solution && (
            <div className="project-detail__section">
              <h3>Solution</h3>
              <p>{project.solution}</p>
              {project.solutionDetails && (
                <ul style={{ marginTop: '1rem' }}>
                  {project.solutionDetails.map((detail, i) => (
                    <li key={i} style={{ marginBottom: '0.5rem' }}>{detail}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Process Section */}
          {project.process && (
            <div className="project-detail__section">
              <h3>Process</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '1.5rem' }}>
                {project.process.map((step, i) => (
                  <div key={i} style={{ padding: '1.5rem', border: '1px solid var(--color-border)', borderRadius: '8px' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{step.icon}</div>
                    <h4 style={{ marginBottom: '0.5rem' }}>{step.title}</h4>
                    <p style={{ color: 'var(--color-text-secondary)' }}>{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Features Section */}
          {project.keyFeatures && (
            <div className="project-detail__section">
              <h3>Key Features</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '1.5rem' }}>
                {project.keyFeatures.map((feature, i) => (
                  <div key={i}>
                    <h4 style={{ marginBottom: '0.75rem' }}>{feature.title}</h4>
                    <p style={{ color: 'var(--color-text-secondary)' }}>{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Results Section */}
          {project.results && (
            <div className="project-detail__section">
              <h3>Results</h3>
              <ul style={{ marginTop: '1rem' }}>
                {project.results.map((result, i) => (
                  <li key={i} style={{ marginBottom: '0.75rem' }}>{result}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Testimonial Section */}
          {project.testimonial && (
            <div className="project-detail__section" style={{ backgroundColor: 'var(--color-bg-card)', padding: '2rem', borderRadius: '12px' }}>
              <blockquote style={{ fontStyle: 'italic', marginBottom: '1rem', fontSize: '1.1rem' }}>"{project.testimonial.quote}"</blockquote>
              <div>
                <strong>{project.testimonial.author}</strong>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>{project.testimonial.role}</p>
              </div>
            </div>
          )}

          {/* Learnings Section */}
          {project.learnings && (
            <div className="project-detail__section">
              <h3>Key Learnings</h3>
              <ul style={{ marginTop: '1rem' }}>
                {project.learnings.map((learning, i) => (
                  <li key={i} style={{ marginBottom: '0.75rem' }}>{learning}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Gallery Section */}
          <div className="project-detail__section">
            <h3>Photography Gallery</h3>
            <MasonryGallery images={images} categories={categories} />
          </div>
        </div>

        {/* Next Project */}
        {nextProject && (
          <div style={{ padding: '3rem 2rem', textAlign: 'center', borderTop: '1px solid var(--color-border)' }}>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>Next Project</p>
            <Link to={`/project/${nextProject.id}`} style={{ display: 'inline-block', color: 'var(--color-accent)', fontSize: '1.25rem', fontWeight: '600' }}>
              {nextProject.title} →
            </Link>
          </div>
        )}

        <Footer />
      </div>
    );
  }

  // Standard-Layout für alle anderen Projekte
  return (
    <div className="project-detail">
      {/* Header */}
      <div className="project-detail__header">
        <Link to="/" className="project-detail__back">
          {t.projects.backToProjects}
        </Link>
        <p className="project-detail__category">{project.category}</p>
        <h1 className="project-detail__title">{project.title}</h1>
        <p className="project-detail__overview">{project.overview}</p>
      </div>

      {/* Body */}
      <div className="project-detail__body">
        {/* Hero Image */}
        <div className="project-detail__hero-img">
          {project.thumbnail ? (
            <img src={project.thumbnail} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <span>{project.title.split('—')[0].trim()}</span>
          )}
        </div>

        {/* Metadata */}
        <div className="project-detail__meta">
          <div className="project-detail__meta-item">
            <h4>{t.projects.role}</h4>
            <p>{project.role}</p>
          </div>
          <div className="project-detail__meta-item">
            <h4>{t.projects.duration}</h4>
            <p>{project.duration}</p>
          </div>
          <div className="project-detail__meta-item">
            <h4>Client</h4>
            <p>{project.client}</p>
          </div>
          <div className="project-detail__meta-item">
            <h4>{t.projects.tools}</h4>
            <p>{project.tools.join(', ')}</p>
          </div>
        </div>

        {/* Challenge Section */}
        {project.challenge && (
          <div className="project-detail__section">
            <h3>Challenge</h3>
            <p>{project.challenge}</p>
            {project.challengeDetails && (
              <ul style={{ marginTop: '1rem' }}>
                {project.challengeDetails.map((detail, i) => (
                  <li key={i} style={{ marginBottom: '0.5rem' }}>{detail}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Solution Section */}
        {project.solution && (
          <div className="project-detail__section">
            <h3>Solution</h3>
            <p>{project.solution}</p>
            {project.solutionDetails && (
              <ul style={{ marginTop: '1rem' }}>
                {project.solutionDetails.map((detail, i) => (
                  <li key={i} style={{ marginBottom: '0.5rem' }}>{detail}</li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Process Section */}
        {project.process && (
          <div className="project-detail__section">
            <h3>Process</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '1.5rem' }}>
              {project.process.map((step, i) => (
                <div key={i} style={{ padding: '1.5rem', border: '1px solid var(--color-border)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{step.icon}</div>
                  <h4 style={{ marginBottom: '0.5rem' }}>{step.title}</h4>
                  <p style={{ color: 'var(--color-text-secondary)' }}>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Key Features Section */}
        {project.keyFeatures && (
          <div className="project-detail__section">
            <h3>Key Features</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '1.5rem' }}>
              {project.keyFeatures.map((feature, i) => (
                <div key={i}>
                  <h4 style={{ marginBottom: '0.75rem' }}>{feature.title}</h4>
                  <p style={{ color: 'var(--color-text-secondary)' }}>{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results Section */}
        {project.results && (
          <div className="project-detail__section">
            <h3>Results</h3>
            <ul style={{ marginTop: '1rem' }}>
              {project.results.map((result, i) => (
                <li key={i} style={{ marginBottom: '0.75rem' }}>{result}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Testimonial Section */}
        {project.testimonial && (
          <div className="project-detail__section" style={{ backgroundColor: 'var(--color-bg-card)', padding: '2rem', borderRadius: '12px' }}>
            <blockquote style={{ fontStyle: 'italic', marginBottom: '1rem', fontSize: '1.1rem' }}>"{project.testimonial.quote}"</blockquote>
            <div>
              <strong>{project.testimonial.author}</strong>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>{project.testimonial.role}</p>
            </div>
          </div>
        )}

        {/* Learnings Section */}
        {project.learnings && (
          <div className="project-detail__section">
            <h3>Key Learnings</h3>
            <ul style={{ marginTop: '1rem' }}>
              {project.learnings.map((learning, i) => (
                <li key={i} style={{ marginBottom: '0.75rem' }}>{learning}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Gallery Section */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="project-detail__section">
            <h3>Gallery</h3>
            <p style={{ marginBottom: '1.5rem', color: 'var(--color-text-secondary)' }}>Visual highlights from the project</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '1rem' }}>
              {project.gallery.map((img, i) => (
                <div key={i} style={{ overflow: 'hidden', borderRadius: '12px' }}>
                  <img src={img.src} alt={img.caption} style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
                  <p style={{ padding: '1rem', backgroundColor: 'var(--color-bg-card)', margin: 0 }}>{img.caption}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Next Project */}
      {nextProject && (
        <div style={{ padding: '3rem 2rem', textAlign: 'center', borderTop: '1px solid var(--color-border)' }}>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>Next Project</p>
          <Link to={`/project/${nextProject.id}`} style={{ display: 'inline-block', color: 'var(--color-accent)', fontSize: '1.25rem', fontWeight: '600' }}>
            {nextProject.title} →
          </Link>
        </div>
      )}

      <Footer />
    </div>
  );
}
