import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Clock } from 'lucide-react';

const ProjectDetail = ({ project, onBack }) => {
  const formatText = (text) => {
    if (typeof text !== 'string') return text;
    // Split by **text**
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="page-container">
      <motion.div
        className="project-detail"
        initial={{ opacity: 0, y: 20, filter: 'blur(5px)', scale: 0.95 }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <button className="back-button" onClick={onBack}>
          <ArrowUpRight style={{ transform: 'rotate(-135deg)' }} />
          BACK
        </button>

        <div className="project-header">
          <p className="project-date">{project.date}</p>
          <div className="project-stats">
            <span className="word-count">
              <Clock size={16} />
              {project.wordCount} words
            </span>
            <span className="read-time">
              <Clock size={16} />
              {project.readTime}
            </span>
          </div>
        </div>

        <h1 className="project-detail-title">{project.title}</h1>

        <div className="project-content">
          {/* New Rich Content Rendering */}
          {project.content?.sections ? (
            <div className="rich-content">
              {project.content.sections.map((section, index) => {
                // Check if it's the new format (has title, no type, or explicit new structure)
                if (!section.type && (section.title || section.content || section.subsections)) {
                  return (
                    <div key={index} className="new-section-block">
                      {section.title && <h3 className="section-heading">{section.title}</h3>}

                      {/* Content Paragraphs */}
                      {section.content && Array.isArray(section.content) && section.content.map((p, idx) => (
                        <p key={idx} className="project-paragraph">{formatText(p)}</p>
                      ))}

                      {/* Tables */}
                      {section.table && (
                        <div className="table-container">
                          {section.table.title && <h4 className="section-subheading">{section.table.title}</h4>}
                          <table className="section-table">
                            <thead>
                              <tr>
                                {section.table.headers?.map((h, i) => <th key={i}>{h}</th>)}
                              </tr>
                            </thead>
                            <tbody>
                              {section.table.rows?.map((row, r) => (
                                <tr key={r}>
                                  {row.map((cell, c) => <td key={c}>{cell}</td>)}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {/* Stats */}
                      {section.stats && (
                        <div className="section-stats-list">
                          <ul className="section-list">
                            {section.stats.map((stat, i) => <li key={i}><strong>{stat}</strong></li>)}
                          </ul>
                        </div>
                      )}

                      {/* Lists - Simple Array */}
                      {section.list && Array.isArray(section.list) && (
                        <ul className="section-list">
                          {section.list.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                      )}

                      {/* Lists - Named Arrays (e.g. key insights) */}
                      {section.lists && section.lists.map((lst, lIdx) => (
                        <div key={lIdx}>
                          {lst.title && <h4 className="section-subheading">{lst.title}</h4>}
                          <ul className="section-list">
                            {lst.items?.map((item, i) => <li key={i}>{item}</li>)}
                          </ul>
                        </div>
                      ))}

                      {/* Subsections - Recursive-ish */}
                      {section.subsections && section.subsections.map((sub, sIdx) => (
                        <div key={sIdx} className="subsection">
                          {sub.title && <h4 className="section-subheading">{sub.title}</h4>}
                          {sub.list && (
                            <ul className="section-list">
                              {sub.list.map((item, i) => <li key={i}>{item}</li>)}
                            </ul>
                          )}
                          {sub.table && (
                            <div className="table-container">
                              <table className="section-table">
                                <thead>
                                  <tr>
                                    {sub.table.headers?.map((h, i) => <th key={i}>{h}</th>)}
                                  </tr>
                                </thead>
                                <tbody>
                                  {sub.table.rows?.map((row, r) => (
                                    <tr key={r}>
                                      {row.map((cell, c) => <td key={c}>{cell}</td>)}
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          )}
                        </div>
                      ))}

                      {/* Note */}
                      {section.note && (
                        <blockquote className="project-note">{section.note}</blockquote>
                      )}

                      {/* Image References (Placeholders) */}
                      {section.image_references && section.image_references.map((ref, i) => (
                        <div key={i} className="image-placeholder" style={{
                          background: 'var(--bg-secondary)',
                          padding: '20px',
                          textAlign: 'center',
                          borderRadius: '12px',
                          margin: '24px 0',
                          border: '1px dashed var(--border-default)',
                          color: 'var(--text-muted)'
                        }}>
                          [Image Reference: {ref}]
                        </div>
                      ))}
                    </div>
                  );
                }

                // Fallback to existing switch logic for old structure
                switch (section.type) {
                  case 'heading':
                    return (
                      <h3 key={index} className="section-heading">
                        {section.content}
                      </h3>
                    );

                  case 'subheading':
                    return (
                      <h4 key={index} className="section-subheading">
                        {section.content}
                      </h4>
                    );

                  case 'text':
                    return (
                      <div key={index} className="section-text">
                        {Array.isArray(section.content) ? (
                          section.content.map((p, pIndex) => (
                            <p key={pIndex} className="project-paragraph">{formatText(p)}</p>
                          ))
                        ) : (
                          <p className="project-paragraph">{formatText(section.content)}</p>
                        )}
                      </div>
                    );

                  case 'list':
                    return (
                      <ul key={index} className="section-list">
                        {section.items.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    );

                  case 'table':
                    return (
                      <div key={index} className="table-container">
                        <table className="section-table">
                          <thead>
                            <tr>
                              {section.headers.map((header, hIndex) => (
                                <th key={hIndex}>{header}</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {section.rows.map((row, rIndex) => (
                              <tr key={rIndex}>
                                {row.map((cell, cIndex) => (
                                  <td key={cIndex}>{cell}</td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    );

                  case 'image':
                    return (
                      <div key={index} className="section-image">
                        <img src={section.src} alt={section.alt || ''} />
                        {section.caption && <p className="image-caption">{section.caption}</p>}
                      </div>
                    );

                  case 'note':
                    return (
                      <blockquote key={index} className="project-note">
                        {section.content}
                      </blockquote>
                    );

                  default:
                    return null;
                }
              })}
            </div>
          ) : (
            // Legacy Rendering for Backward Compatibility
            <>
              {project.content?.intro?.map((paragraph, index) => (
                <p key={index} className="project-paragraph">{paragraph}</p>
              ))}

              {project.content?.projectsTitle && (
                <h2 className="project-section-title">{project.content.projectsTitle}</h2>
              )}

              {project.content?.projects?.length > 0 && (
                <>
                  <blockquote className="project-note">
                    <em>Attaching a single screenshot for context,</em> <strong>Email me,</strong> <em>or</em> <strong>schedule a call</strong> <em>for a detailed walkthrough.</em>
                  </blockquote>

                  {project.content.projects.map((proj, index) => (
                    <div key={index} className="project-item">
                      <h3 className="project-item-title">
                        {proj.name} {proj.description && `(${proj.description})`}
                      </h3>
                      <div className="project-item-image">
                        <img src={proj.image} alt={proj.name} />
                      </div>
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </div>
      </motion.div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Inter:wght@400;500;600;700&display=swap');


        .page-container {
          width: 100%;
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
          color: var(--text-muted);
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
          color: var(--text-muted);
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
          color: var(--text-muted);
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
          border-left: 3px solid var(--border-hover);
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

        /* Rich Content Styles */
        .section-heading {
          font-size: 32px;
          font-weight: 600;
          color: var(--text-primary);
          margin-top: 64px;
          margin-bottom: 32px;
          letter-spacing: -0.01em;
        }

        .section-subheading {
          font-size: 24px;
          font-weight: 500;
          color: var(--text-primary);
          margin-top: 48px;
          margin-bottom: 24px;
          letter-spacing: -0.01em;
        }

        .section-text {
          margin-bottom: 24px;
        }

        .section-list {
          list-style-type: disc;
          padding-left: 24px;
          margin-bottom: 32px;
          color: var(--text-secondary);
          font-size: 18px;
          line-height: 1.7;
        }

        .section-list li {
          margin-bottom: 12px;
          padding-left: 8px;
        }

        .table-container {
          width: 100%;
          overflow-x: auto;
          margin: 48px 0;
          border-radius: 12px;
          border: 1px solid var(--border-default);
        }

        .section-table {
          width: 100%;
          border-collapse: collapse;
          color: var(--text-secondary);
          font-size: 16px;
          min-width: 600px;
        }

        .section-table th,
        .section-table td {
          padding: 16px;
          text-align: left;
          border-bottom: 1px solid var(--border-default);
        }

        .section-table th {
          background-color: var(--bg-secondary);
          color: var(--text-primary);
          font-weight: 600;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .section-table tr:last-child td {
          border-bottom: none;
        }

        .section-image {
          margin: 48px 0;
        }

        .section-image img {
          width: 100%;
          border-radius: 12px;
          display: block;
        }

        .image-caption {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 13px;
          color: var(--text-muted);
          margin-top: 12px;
          text-align: center;
        }

        @media (max-width: 640px) {
          .page-container {
            overflow-x: hidden;
          }

          .project-detail {
            padding: 0 16px;
            width: 100%;
            box-sizing: border-box;
          }

          .project-detail-title {
            font-size: 32px;
            margin-bottom: 32px;
            word-wrap: break-word;
          }

          .project-paragraph {
            font-size: 16px;
          }

          .project-header {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            margin-bottom: 32px;
            flex-wrap: wrap;
          }

          .section-heading {
            font-size: 24px;
            margin-top: 48px;
            margin-bottom: 24px;
            word-wrap: break-word;
          }

          .section-subheading {
            font-size: 20px;
            margin-top: 32px;
            margin-bottom: 16px;
            word-wrap: break-word;
          }

          .section-list {
            padding-left: 20px;
            font-size: 16px;
          }

          .table-container {
            margin: 32px -16px;
            width: calc(100% + 32px);
            border-radius: 0;
            border-left: none;
            border-right: none;
          }
          
          .section-table {
            min-width: 600px;
            font-size: 14px;
          }

          .section-table th,
          .section-table td {
            padding: 12px;
          }

          .project-note {
            font-size: 16px;
            padding-left: 16px;
            margin-bottom: 32px;
          }

          .project-item-title {
            font-size: 18px;
            margin-bottom: 16px;
          }
          
          .project-item {
            margin-bottom: 32px;
          }

          .section-image {
            margin: 32px 0;
          }
        }
      `}</style>
    </div>
  );
};

export default ProjectDetail;
