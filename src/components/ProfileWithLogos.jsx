import React, { useEffect, useRef, useState } from 'react';
import { Mail, Linkedin, Palette, ArrowUpRight, MapPin, Wind, Sun, Clock, Dribbble, BookOpen, Monitor, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

// Auto-scrolling Logos Carousel Component
const LogosCarousel = ({ heading = "Trusted by these companies", logos = [] }) => {
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId;
    let scrollPosition = 0;
    const speed = 0.5;

    const scroll = () => {
      if (!isHovered) {
        scrollPosition += speed;
        if (scrollPosition >= scrollContainer.scrollWidth / 2) {
          scrollPosition = 0;
        }
        scrollContainer.scrollLeft = scrollPosition;
      }
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationId);
  }, [isHovered, logos]);

  // Duplicate logos for seamless loop
  const duplicatedLogos = [...logos, ...logos];

  return (
    <section className="logos-section">
      <h2 className="logos-heading">{heading}</h2>
      <div className="carousel-container">
        <div
          className="carousel-track"
          ref={scrollRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {duplicatedLogos.map((logo, index) => (
            <div key={`${logo.id}-${index}`} className="logo-item">
              <img
                src={logo.image}
                alt={logo.name}
                className="logo-image"
              />
            </div>
          ))}
        </div>
        <div className="fade-left"></div>
        <div className="fade-right"></div>
      </div>
    </section>
  );
};

// Main Profile Component
export default function ProfileWithLogos({ data, onSeeAllPhotos, initialSlug, onNavigate, theme = 'system', setTheme }) {
  if (!data) return null;
  const { workProjects = [], experiences = [], shots = [], hobby = {}, profile = {}, trustedCompanies = {}, socialLinks = {}, currentlyPlaying = {} } = data;
  const personalPhotos = hobby?.photos || [];
  const logos = trustedCompanies?.logos || [];

  const [activeTab, setActiveTab] = useState('work');
  const [selectedProject, setSelectedProject] = useState(() => {
    if (initialSlug) {
      return workProjects.find(p => p.slug === initialSlug) || null;
    }
    return null;
  });

  useEffect(() => {
    if (initialSlug) {
      const project = workProjects.find(p => p.slug === initialSlug);
      if (project) setSelectedProject(project);
    } else {
      setSelectedProject(null);
    }
  }, [initialSlug, workProjects]);

  const tabs = [
    { id: 'work', label: 'Case Studies' },
    { id: 'shots', label: 'Shots' },
    { id: 'experiences', label: 'Experiences' },
    { id: 'about', label: 'About' }
  ];

  const descriptions = {
    work: "Below are some selected case studies (as short-stories), full walk-throughs on calls.",
    experiences: "A quick tour of my professional life, designing user-centered experiences across products, platforms, and the occasional all-nighter.",
    shots: "Quick design explorations and visual experiments.",
    about: "A little more about me, my background, and what drives my design philosophy."
  };

  // Project Detail View
  if (selectedProject) {
    return (
      <div className="page-container">
        <div className="project-detail">
          <button className="back-button" onClick={() => onNavigate('portfolio')}>
            <ArrowUpRight style={{ transform: 'rotate(-135deg)' }} />
            BACK
          </button>

          <div className="project-header">
            <p className="project-date">{selectedProject.date}</p>
            <div className="project-stats">
              <span className="word-count">
                <Clock size={16} />
                {selectedProject.wordCount} words
              </span>
              <span className="read-time">
                <Clock size={16} />
                {selectedProject.readTime}
              </span>
            </div>
          </div>

          <h1 className="project-detail-title">{selectedProject.title}</h1>

          <div className="project-content">
            {selectedProject.content?.intro?.map((paragraph, index) => (
              <p key={index} className="project-paragraph">{paragraph}</p>
            ))}

            {selectedProject.content?.projectsTitle && (
              <h2 className="project-section-title">{selectedProject.content.projectsTitle}</h2>
            )}

            {selectedProject.content?.projects?.length > 0 && (
              <>
                <blockquote className="project-note">
                  <em>Attaching a single screenshot for context,</em> <strong>Email me,</strong> <em>or</em> <strong>schedule a call</strong> <em>for a detailed walkthrough.</em>
                </blockquote>

                {selectedProject.content.projects.map((project, index) => (
                  <div key={index} className="project-item">
                    <h3 className="project-item-title">
                      {project.name} {project.description && `(${project.description})`}
                    </h3>
                    <div className="project-item-image">
                      <img src={project.image} alt={project.name} />
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Inter:wght@400;500;600;700&display=swap');

          :root {
            --bg-color: #1a1a1a;
            --text-primary: #ffffff;
            --text-secondary: #9ca3af;
            --text-tertiary: #6b7280;
            --card-bg: #0a0a0a;
            --border-color: #4b5563;
            --chip-bg: transparent;
            --chip-border: #4b5563;
            --chip-active-bg: #ffffff;
            --chip-active-text: #1a1a1a;
            --project-note-border: #4b5563;
            --tooltip-bg: #ffffff;
            --tooltip-text: #1a1a1a;
            --music-player-bg: #252525;
            --toggle-bg: #262626;
            --toggle-border: #404040;
          }

          [data-theme="light"] {
            --bg-color: #ffffff;
            --text-primary: #111827;
            --text-secondary: #4b5563;
            --text-tertiary: #6b7280;
            --card-bg: #f9fafb;
            --border-color: #e5e7eb;
            --chip-bg: #f3f4f6;
            --chip-border: #e5e7eb;
            --chip-active-bg: #111827;
            --chip-active-text: #ffffff;
            --project-note-border: #d1d5db;
            --tooltip-bg: #111827;
            --tooltip-text: #ffffff;
            --music-player-bg: #f3f4f6;
            --toggle-bg: #f3f4f6;
            --toggle-border: #e5e7eb;
          }

          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          .page-container {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background-color: var(--bg-color);
            min-height: 100vh;
            padding: 40px 20px 80px;
          }

          .project-detail {
            max-width: 900px;
            margin: 0 auto;
          }

          .back-button {
            display: flex;
            align-items: center;
            gap: 8px;
            background: none;
            border: none;
            color: var(--text-tertiary);
            font-family: 'IBM Plex Mono', monospace;
            font-size: 13px;
            letter-spacing: 0.05em;
            cursor: pointer;
            padding: 0;
            margin-bottom: 48px;
            transition: color 0.2s ease;
          }

          .back-button:hover {
            color: var(--text-primary);
          }

          .back-button svg {
            width: 18px;
            height: 18px;
          }

          .project-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 24px;
          }

          .project-date {
            font-family: 'IBM Plex Mono', monospace;
            font-size: 13px;
            color: var(--text-tertiary);
            letter-spacing: 0.05em;
          }

          .project-stats {
            display: flex;
            align-items: center;
            gap: 20px;
          }

          .word-count,
          .read-time {
            display: flex;
            align-items: center;
            gap: 6px;
            font-family: 'IBM Plex Mono', monospace;
            font-size: 13px;
            color: var(--text-tertiary);
          }

          .word-count svg,
          .read-time svg {
            width: 16px;
            height: 16px;
          }

          .project-detail-title {
            font-size: 48px;
            font-weight: 700;
            color: var(--text-primary);
            line-height: 1.15;
            margin-bottom: 48px;
            letter-spacing: -0.02em;
          }

          .project-content {
            max-width: 800px;
          }

          .project-paragraph {
            font-size: 20px;
            color: var(--text-secondary);
            line-height: 1.7;
            margin-bottom: 24px;
          }

          .project-section-title {
            font-size: 18px;
            font-weight: 600;
            color: var(--text-primary);
            margin-top: 48px;
            margin-bottom: 24px;
          }

          .project-note {
            border-left: 3px solid var(--border-color);
            padding-left: 20px;
            margin-bottom: 48px;
            font-size: 18px;
            color: var(--text-secondary);
            line-height: 1.6;
          }

          .project-note em {
            font-style: italic;
          }

          .project-note strong {
            color: var(--text-primary);
            font-weight: 600;
          }

          .project-item {
            margin-bottom: 48px;
          }

          .project-item-title {
            font-size: 20px;
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 24px;
          }

          .project-item-image {
            border-radius: 12px;
            overflow: hidden;
          }

          .project-item-image img {
            width: 100%;
            height: auto;
            display: block;
          }

          @media (max-width: 640px) {
            .project-detail-title {
              font-size: 32px;
            }

            .project-paragraph {
              font-size: 16px;
            }

            .project-header {
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
              gap: 12px;
            }

            .project-note {
              font-size: 16px;
            }

            .project-item-title {
              font-size: 18px;
            }
          }
        `}</style>
      </div>
    );
  }



  return (
    <div className="page-container">
      {/* Profile Section */}
      <div className="profile-card">
        <div className="avatar-container">
          <img
            src={profile?.avatar}
            alt="Profile"
            className="avatar"
          />
          {profile?.isOnline && <div className="status-indicator"></div>}
        </div>

        <h1 className="name">{profile?.name}</h1>
        <p className="title">{profile?.title}</p>

        <p className="bio">
          {profile?.bio?.split(profile?.company?.name).map((part, i, arr) => (
            <React.Fragment key={i}>
              {part}
              {i < arr.length - 1 && (
                <>
                  <span className="company">{profile?.company?.name}</span>
                  <span className="company-icon" style={{ backgroundColor: profile?.company?.color, overflow: 'hidden' }}>
                    {profile?.company?.logo ? (
                      <img src={profile.company.logo} alt={profile.company.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M8 12h8" />
                        <path d="M12 8v8" />
                      </svg>
                    )}
                  </span>
                </>
              )}
            </React.Fragment>
          ))}
        </p>

        <div className="buttons">
          <a href={socialLinks?.cal || "#"} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Get in Touch</a>
          <a href={socialLinks?.resume || "#"} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">Resume</a>
        </div>
      </div>

      {/* Logos Carousel Section */}
      <LogosCarousel heading={trustedCompanies?.heading} logos={logos} />

      {/* Work Section */}
      <section className="work-section">
        <div className="tabs-header">
          <div className="tabs-container">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab-chip ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <p className="work-description">
          {descriptions[activeTab]}
        </p>

        {/* Work Tab Content */}
        {activeTab === 'work' && (
          <motion.div
            className="projects-grid"
            initial={{ opacity: 0, y: 20, filter: 'blur(5px)', scale: 0.95 }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {workProjects.map((project) => (
              <div
                key={project.id}
                className="project-card"
                onClick={() => onNavigate('work', project.slug)}
              >
                <div className="project-thumbnail">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="thumbnail-image"
                  />
                </div>
                <div className="project-info">
                  <p className="project-title">{project.title}</p>
                  <div className="project-meta">
                    <Clock size={18} />
                    <span>{project.readTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Experiences Tab Content */}
        {activeTab === 'experiences' && (
          <motion.div
            className="experiences-timeline"
            initial={{ opacity: 0, y: 20, filter: 'blur(5px)', scale: 0.95 }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {experiences.map((exp) => (
              <div key={exp.id} className="experience-row">
                <div className="experience-period">
                  {exp.period}
                </div>
                <div className="experience-content">
                  <h3 className="experience-title">
                    {exp.role} at{" "}
                    <span className="experience-company-icon" style={{ backgroundColor: exp.companyColor, overflow: 'hidden' }}>
                      {exp.logo ? (
                        <img src={exp.logo} alt={exp.company} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="8" />
                        </svg>
                      )}
                    </span>
                    {" "}{exp.company}
                  </h3>
                  <p className="experience-description">{exp.description}</p>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Shots Tab Content */}
        {activeTab === 'shots' && (
          <motion.div
            className="shots-grid"
            initial={{ opacity: 0, y: 20, filter: 'blur(5px)', scale: 0.95 }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {shots.map((shot) => {
              const isVideo = shot.image?.toLowerCase().endsWith('.mp4');
              // Extract a short title or keyword for the tooltip/address bar
              const shortTitle = shot.title.split(' ')[0].toLowerCase();

              return (
                <div key={shot.id} className="shot-card">
                  <div className="shot-wrapper">
                    <div className="shot-media">
                      {isVideo ? (
                        <video
                          src={shot.image}
                          className="media-item"
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="metadata"
                        />
                      ) : (
                        <img
                          src={shot.image}
                          alt={shot.title}
                          className="media-item"
                          loading="lazy"
                          decoding="async"
                        />
                      )}
                    </div>

                    {/* Floating Tooltip (Visible on Hover) */}
                    <div className="hover-tooltip">
                      Motion design for {shortTitle}
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}

        {/* About Tab Content */}
        {activeTab === 'about' && (
          <motion.div
            className="about-content"
            initial={{ opacity: 0, y: 20, filter: 'blur(5px)', scale: 0.95 }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="about-image">
              <img
                src={profile?.avatar}
                alt="About me"
                className="about-photo"
              />
            </div>
            <div className="about-text">
              {data.about?.paragraphs?.map((para, index) => (
                <p key={index} dangerouslySetInnerHTML={{ __html: para }} />
              ))}
            </div>
          </motion.div>
        )}
      </section>

      {/* When I Am Not Working Section */}
      <section className="hobby-section">
        <p className="section-label">WHEN I AM NOT WORKING</p>
        <p className="hobby-description">
          {hobby?.description}
        </p>

        <div className="photo-stack">
          {personalPhotos.map((photo) => (
            <div
              key={photo.id}
              className="stacked-photo"
              style={{ transform: `rotate(${photo.rotation}deg)` }}
            >
              <img src={photo.image} alt="Personal photo" />
            </div>
          ))}
        </div>

        <div className="photo-footer">
          <button className="see-all-link" onClick={onSeeAllPhotos}>
            See all
            <ArrowUpRight size={24} />
          </button>
          <p className="camera-info">{hobby?.cameraInfo}</p>
        </div>
      </section>

      {/* Music Player & Contact Section */}
      <section className="contact-section">
        {/* Music Player */}
        <div className="music-player">
          <div className="music-artwork">
            <img
              src={currentlyPlaying?.artwork}
              alt="Album artwork"
            />
          </div>
          <div className="music-info">
            <p className="music-title">{currentlyPlaying?.title}</p>
            <p className="music-artist">{currentlyPlaying?.artist}</p>
          </div>
          <a href={currentlyPlaying?.link} target="_blank" rel="noopener noreferrer" className="music-link">
            Listen on YT Music
          </a>
        </div>

        {/* Contact Links */}
        <div className="contact-links">
          <a href={`mailto:${socialLinks?.email}`} className="contact-row">
            <div className="contact-left">
              <Mail className="contact-icon" strokeWidth={1.5} />
              <span>Email</span>
            </div>
            <div className="contact-right">
              <span>{socialLinks?.email}</span>
              <ArrowUpRight className="arrow-icon" strokeWidth={2} />
            </div>
          </a>

          <a href={`https://linkedin.com${socialLinks?.linkedin}`} target="_blank" rel="noopener noreferrer" className="contact-row">
            <div className="contact-left">
              <Linkedin className="contact-icon" strokeWidth={1.5} />
              <span>LinkedIn</span>
            </div>
            <div className="contact-right">
              <span>{socialLinks?.linkedin}</span>
              <ArrowUpRight className="arrow-icon" strokeWidth={2} />
            </div>
          </a>

          <a href={`https://behance.net/${socialLinks?.behance?.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="contact-row">
            <div className="contact-left">
              <i className="fa-brands fa-behance contact-icon" style={{ fontSize: '20px', width: '24px', textAlign: 'center' }}></i>
              <span>Behance</span>
            </div>
            <div className="contact-right">
              <span>{socialLinks?.behance}</span>
              <ArrowUpRight className="arrow-icon" strokeWidth={2} />
            </div>
          </a>

          <a href={`https://dribbble.com/${socialLinks?.dribbble}`} target="_blank" rel="noopener noreferrer" className="contact-row">
            <div className="contact-left">
              <Dribbble className="contact-icon" strokeWidth={1.5} />
              <span>Dribbble</span>
            </div>
            <div className="contact-right">
              <span>{socialLinks?.dribbble}</span>
              <ArrowUpRight className="arrow-icon" strokeWidth={2} />
            </div>
          </a>

          <a href={`https://medium.com/${socialLinks?.medium}`} target="_blank" rel="noopener noreferrer" className="contact-row">
            <div className="contact-left">
              <i className="fa-brands fa-medium contact-icon" style={{ fontSize: '20px', width: '24px', textAlign: 'center' }}></i>
              <span>Medium</span>
            </div>
            <div className="contact-right">
              <span>{socialLinks?.medium}</span>
              <ArrowUpRight className="arrow-icon" strokeWidth={2} />
            </div>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-signature">
          <motion.img
            src="/images/sign2.png"
            alt="Signature"
            className="footer-signature-img"
            initial={{ opacity: 0, y: 20, filter: 'blur(5px)', scale: 0.95 }}
            whileInView={{ opacity: 0.9, y: 0, filter: 'blur(0px)', scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          />

        </div>

        <div className="footer-bottom">
          <div className="footer-location">
            <MapPin size={18} />
            <span>{profile?.location?.toUpperCase()}</span>
          </div>

          <div className="theme-toggle">
            <button
              className={`theme-btn ${theme === 'system' ? 'active' : ''}`}
              onClick={() => setTheme && setTheme('system')}
              title="System Theme"
            >
              <Monitor size={14} />
            </button>
            <button
              className={`theme-btn ${theme === 'light' ? 'active' : ''}`}
              onClick={() => setTheme && setTheme('light')}
              title="Light Mode"
            >
              <Sun size={14} />
            </button>
            <button
              className={`theme-btn ${theme === 'dark' ? 'active' : ''}`}
              onClick={() => setTheme && setTheme('dark')}
              title="Dark Mode"
            >
              <Moon size={14} />
            </button>
          </div>

          <div className="footer-weather">
            <Sun size={18} />
            <span>{profile?.weather}</span>
          </div>
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Inter:wght@400;500;600&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .page-container {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background-color: #1a1a1a;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 60px 20px;
        }

        .profile-card {
          max-width: 900px;
          width: 100%;
        }

        .avatar-container {
          position: relative;
          width: 80px;
          height: 80px;
          margin-bottom: 20px;
        }

        .avatar {
          width: 80px;
          height: 80px;
          border-radius: 16px;
          object-fit: cover;
        }

        .status-indicator {
          position: absolute;
          bottom: -4px;
          right: -4px;
          width: 20px;
          height: 20px;
          background-color: #22c55e;
          border-radius: 50%;
          border: 3px solid var(--bg-color);
        }

        .name {
          font-size: 24px;
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 4px;
          letter-spacing: -0.02em;
        }

        .title {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 16px;
          font-weight: 400;
          color: var(--text-secondary);
          margin-bottom: 24px;
        }

        .bio {
          font-size: 18px;
          font-weight: 400;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 32px;
        }

        .bio .company {
          color: var(--text-primary);
          font-weight: 500;
        }

        .company-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          background-color: #9333ea;
          border-radius: 4px;
          vertical-align: middle;
          margin-left: 2px;
        }

        .company-icon svg {
          width: 16px;
          height: 16px;
          color: white;
        }

        .buttons {
          display: flex;
          gap: 12px;
        }

        .btn {
          padding: 12px 24px;
          border-radius: 9999px;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: inherit;
          text-decoration: none;
          display: inline-block;
        }

        .btn-primary {
          background-color: var(--text-primary);
          color: var(--bg-color);
          border: none;
        }

        .btn-primary:hover {
          opacity: 0.9;
        }

        .btn-secondary {
          background-color: transparent;
          border: 1.5px solid var(--chip-border);
          color: var(--text-primary);
          background: var(--chip-bg);
        }

        .btn-secondary:hover {
          border-color: var(--text-tertiary);
        }

        /* Logos Section Styles */
        .logos-section {
          width: 100%;
          max-width: 900px;
          margin: 80px auto 40px;
          text-align: center;
          padding: 0 20px;
        }

        .logos-heading {
          font-size: 20px;
          font-weight: 500;
          color: var(--text-secondary);
          margin-bottom: 40px;
          letter-spacing: 0.05em;
        }

        .carousel-container {
          position: relative;
          width: 100%;
          overflow: hidden;
        }

        .carousel-track {
          display: flex;
          gap: 60px;
          overflow-x: scroll;
          scrollbar-width: none;
          -ms-overflow-style: none;
          padding: 20px 0;
        }

        .carousel-track::-webkit-scrollbar {
          display: none;
        }

        .logo-item {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logo-image {
          height: 40px;
          width: auto;
          border-radius: 4px;
          opacity: 1;
          filter: none;
          transition: transform 0.3s ease;
        }

        .logo-image:hover {
          transform: scale(1.1);
        }

        .fade-left,
        .fade-right {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 80px;
          pointer-events: none;
          z-index: 10;
        }

        .fade-left {
          left: 0;
          background: linear-gradient(to right, var(--bg-color), transparent);
        }

        .fade-right {
          right: 0;
          background: linear-gradient(to left, var(--bg-color), transparent);
        }

        @media (max-width: 640px) {
          .logos-heading {
            font-size: 22px;
          }

          .carousel-track {
            gap: 40px;
          }

          .logo-image {
            height: 22px;
          }
        }

        /* Work Section Styles */
        .work-section {
          width: 100%;
          max-width: 900px;
          margin-top: 100px;
        }

        .tabs-header {
          margin-bottom: 16px;
        }

        .tabs-container {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          gap: 12px;
          margin: 40px 0;
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          padding: 8px 4px; /* Add padding for focus rings/shadows */
          scrollbar-width: none; /* Firefox */
        }
        
        .tabs-container::-webkit-scrollbar {
          display: none; /* Chrome, Safari */
        }

        .tab-chip {
          padding: 10px 20px;
          border-radius: 9999px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: inherit;
          background-color: transparent;
          color: var(--text-tertiary);
          border: 1.5px solid var(--chip-border);
        }

        .tab-chip:hover {
          border-color: var(--text-secondary);
          color: var(--text-secondary);
        }

        .tab-chip.active {
          background-color: var(--chip-active-bg);
          color: var(--chip-active-text);
          border-color: var(--chip-active-bg);
        }

        .work-label {
          font-size: 14px;
          font-weight: 500;
          color: var(--text-tertiary);
          letter-spacing: 0.05em;
          margin-bottom: 16px;
        }

        .work-description {
          font-size: 28px;
          font-weight: 400;
          color: var(--text-tertiary);
          line-height: 1.4;
          margin-bottom: 48px;
        }

        .projects-grid {
          display: flex;
          flex-direction: column;
          gap: 48px;
        }

        .project-card {
          width: 100%;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .project-card:hover {
          transform: translateY(-4px);
        }

        .project-thumbnail {
          width: 100%;
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 20px;
        }

        .thumbnail-image {
          width: 100%;
          height: auto;
          display: block;
        }

        .project-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .project-title {
          font-size: 18px;
          font-weight: 400;
          color: var(--text-primary);
        }

        .exp-company {
          font-size: 14px;
          color: var(--text-tertiary);
          margin-top: 4px;
        }

        .project-meta {
          display: flex;
          align-items: center;
          gap: 6px;
          color: var(--text-tertiary);
          font-size: 14px;
        }

        .clock-icon {
          width: 18px;
          height: 18px;
        }

        /* Shots Grid */
        .shots-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        .shot-card {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          background: var(--card-bg);
          aspect-ratio: 16/10;
          transition: transform 0.3s ease;
        }

        .shot-card:hover {
          transform: translateY(-4px);
        }

        .shot-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .shot-media {
          width: 100%;
          height: 100%;
          transition: transform 0.4s ease;
        }
        
        /* Optional: slight push down on hover to simulate content being below browser bar,
           or just keep it as is if overlay is preferred. */
        .shot-card:hover .shot-media {
          /* transform: translateY(10px); */ 
        }

        .media-item {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        /* Tooltip Styles */
        .hover-tooltip {
          position: absolute;
          bottom: 16px;
          left: 16px;
          background: var(--tooltip-bg);
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 500;
          color: var(--tooltip-text);
          box-shadow: 0 4px 20px rgba(0,0,0,0.3);
          transform: translateY(20px) scale(0.95);
          opacity: 0;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          z-index: 20;
          pointer-events: none;
        }

        .shot-card:hover .hover-tooltip {
          transform: translateY(0) scale(1);
          opacity: 1;
        }

        /* About Content */
        .about-content {
          display: flex;
          gap: 48px;
          align-items: flex-start;
        }

        .about-image {
          flex-shrink: 0;
          padding: 10px;
        }

        .about-photo {
          width: 200px;
          height: 280px;
          border-radius: 16px;
          background: white;
          padding: 8px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
          transform: rotate(-3deg);
          transition: transform 0.3s ease;
        }

        .about-photo:hover {
          transform: rotate(0deg) scale(1.05);
        }

        .about-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 10px;
          display: block;
        }

        .about-text {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .about-text p {
          font-size: 16px;
          color: var(--text-secondary);
          line-height: 1.7;
        }

        /* Experiences Timeline */
        .experiences-timeline {
          display: flex;
          flex-direction: column;
          gap: 48px;
        }

        .experience-row {
          display: grid;
          grid-template-columns: 180px 1fr;
          gap: 40px;
        }

        .experience-period {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 13px;
          color: var(--text-tertiary);
          letter-spacing: 0.02em;
          padding-top: 4px;
        }

        .experience-content {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .experience-title {
          font-size: 22px;
          font-weight: 500;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
        }

        .experience-company-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 6px;
        }

        .experience-company-icon svg {
          width: 16px;
          height: 16px;
          color: white;
        }

        .experience-description {
          font-size: 18px;
          color: var(--text-secondary);
          line-height: 1.6;
        }

        /* Hobby Section */
        .hobby-section {
          width: 100%;
          max-width: 900px;
          margin-top: 120px;
        }

        .section-label {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 13px;
          color: var(--text-tertiary);
          letter-spacing: 0.1em;
          margin-bottom: 16px;
        }

        .hobby-description {
          font-size: 28px;
          font-weight: 400;
          color: var(--text-secondary);
          line-height: 1.4;
          margin-bottom: 48px;
        }

        .hobby-description em {
          font-style: italic;
          color: var(--text-primary);
        }

        .photo-stack {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          height: 380px;
          margin-bottom: 40px;
        }

        .stacked-photo {
          position: absolute;
          width: 240px;
          height: 320px;
          border-radius: 16px;
          overflow: hidden;
          background: white;
          padding: 8px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
          transform: rotate(-3deg);
          transition: transform 0.3s ease;
        }

        .stacked-photo:nth-child(1) {
          left: calc(50% - 340px);
        }

        .stacked-photo:nth-child(2) {
          left: calc(50% - 180px);
          z-index: 1;
        }

        .stacked-photo:nth-child(3) {
          left: calc(50% - 20px);
          z-index: 2;
        }

        .stacked-photo:nth-child(4) {
          left: calc(50% + 100px);
          z-index: 3;
        }

        .stacked-photo:hover {
          z-index: 10;
          transform: scale(1.05) rotate(0deg) !important;
        }

        .stacked-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 10px;
        }

        .photo-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .see-all-link {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 16px;
          font-family: inherit;
          color: var(--text-secondary);
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          transition: color 0.2s ease;
        }

        .see-all-link:hover {
          color: var(--text-primary);
        }

        .see-all-icon {
          width: 24px;
          height: 24px;
        }

        .camera-info {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 14px;
          color: var(--text-tertiary);
        }

        /* Footer Styles */
        .site-footer {
          width: 100%;
          max-width: 900px;
          margin-top: 120px;
          padding-bottom: 60px;
        }

        .footer-signature {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 80px;
        }

        .signature-svg {
          width: 200px;
          height: 120px;
          margin-bottom: 24px;
        }

        .footer-name {
          font-size: 18px;
          color: var(--text-secondary);
        }

        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .footer-location,
        .footer-weather {
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-tertiary);
          font-size: 13px;
          letter-spacing: 0.05em;
        }

        .theme-toggle {
          display: flex;
          align-items: center;
          gap: 4px;
          background: var(--toggle-bg);
          padding: 4px;
          border-radius: 9999px;
          border: 1px solid var(--toggle-border);
        }

        .theme-btn {
          background: transparent;
          border: none;
          color: var(--text-tertiary);
          padding: 6px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .theme-btn:hover {
          color: var(--text-primary);
        }

        .theme-btn.active {
          background: var(--bg-color);
          color: var(--text-primary);
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }

        .footer-icon {
          width: 18px;
          height: 18px;
        }

        @media (max-width: 640px) {
          .experience-row {
            grid-template-columns: 1fr;
            gap: 12px;
          }

          .logos-section {
             margin: 24px auto 0px;
          }
          
          .logos-heading {
             margin-bottom: 20px;
          }

          .tabs-container {
             margin: 16px 0 24px;
          }

          .experience-title {
            font-size: 18px;
          }

          .experience-description {
            font-size: 16px;
          }

          .hobby-description {
            font-size: 20px;
          }

          .photo-stack {
            height: 280px;
            overflow-x: auto;
            justify-content: flex-start;
            padding: 0 20px;
          }

          .stacked-photo {
            position: relative;
            left: auto !important;
            width: 180px;
            height: 240px;
            flex-shrink: 0;
            margin-right: -60px;
          }

          .stacked-photo:nth-child(n+4) {
            display: none;
          }

          .camera-info {
            font-size: 12px;
          }

          .footer-bottom {
            flex-direction: row;
            justify-content: space-between;
            width: 100%;
          }
        }

        @media (max-width: 640px) {
          .work-description {
            font-size: 20px;
          }

          .project-title {
            font-size: 16px;
          }

          .project-info {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            gap: 12px;
          }

          .shots-grid {
            grid-template-columns: 1fr;
          }

          .about-content {
            flex-direction: column;
          }

          .about-photo {
            width: 100%;
            height: auto;
          }

          .tabs-container {
            justify-content: flex-start;
            padding-left: 20px;
            padding-right: 20px; 
            margin-left: -20px;
            width: calc(100% + 40px);
          }
          
          .tab-chip {
            white-space: nowrap;
            flex-shrink: 0;
          }

          .tab-chip {
            padding: 8px 16px;
            font-size: 13px;
          }
        }

          /* Signature Styles */
          .footer-signature-img {
             width: 240px;
             height: auto;
             margin-bottom: 12px;
          }

        /* Contact Section Styles */
        .contact-section {
          width: 100%;
          max-width: 900px;
          margin-top: 120px;
        }

        .music-player {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 20px;
          background-color: var(--music-player-bg);
          border-radius: 12px;
          margin-bottom: 48px;
        }

        .music-artwork {
          width: 64px;
          height: 64px;
          border-radius: 8px;
          overflow: hidden;
          flex-shrink: 0;
        }

        .music-artwork img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .music-info {
          flex: 1;
        }

        .music-title {
          font-size: 16px;
          font-weight: 500;
          color: var(--text-primary);
          margin-bottom: 4px;


        .music-artist {
          font-size: 14px;
          color: var(--text-tertiary);
        }

        .music-link {
          font-size: 14px;
          color: var(--text-secondary);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .music-link:hover {
          color: var(--text-primary);
        }

        .contact-links {
          display: flex;
          flex-direction: column;
          gap: 0;
          margin-bottom: 80px;
        }

        .contact-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px 0;
          text-decoration: none;
          transition: opacity 0.2s ease;
        }

        .contact-row:hover {
          opacity: 0.7;
        }

        .contact-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .contact-icon {
          width: 24px;
          height: 24px;
          color: var(--text-tertiary);
        }

        .contact-left span {
          font-size: 18px;
          color: var(--text-tertiary);
        }

        .contact-right {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .contact-right span {
          font-size: 18px;
          color: var(--text-secondary);
        }

        .arrow-icon {
          width: 24px;
          height: 24px;
          color: var(--text-tertiary);
        }

        @media (max-width: 640px) {
          .music-player {
            flex-wrap: wrap;
          }

          .music-link {
            width: 100%;
            margin-top: 12px;
            text-align: center;
          }

          .contact-left span,
          .contact-right span {
            font-size: 14px;
          }

          .contact-icon,
          .arrow-icon {
            width: 20px;
            height: 20px;
          }
        }
      `}</style>
    </div>
  );
}
