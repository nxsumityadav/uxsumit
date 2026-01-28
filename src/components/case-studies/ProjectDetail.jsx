import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Clock } from 'lucide-react';

const ProjectDetail = ({ project, onBack }) => {
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
                            <p key={pIndex} className="project-paragraph">{p}</p>
                          ))
                        ) : (
                          <p className="project-paragraph">{section.content}</p>
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
          color: #6b7280;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 13px;
          letter-spacing: 0.05em;
          cursor: pointer;
          padding: 0;
          margin-bottom: 48px;
          transition: color 0.2s ease;
        }

        .back-button:hover {
          color: #ffffff;
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
          color: #6b7280;
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
          color: #6b7280;
        }

        .word-count svg,
        .read-time svg {
          width: 16px;
          height: 16px;
        }

        .project-detail-title {
          font-size: 48px;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.15;
          margin-bottom: 48px;
          letter-spacing: -0.02em;
        }

        .project-content {
          max-width: 800px;
        }

        .project-paragraph {
          font-size: 20px;
          color: #9ca3af;
          line-height: 1.7;
          margin-bottom: 24px;
        }

        .project-section-title {
          font-size: 18px;
          font-weight: 600;
          color: #ffffff;
          margin-top: 48px;
          margin-bottom: 24px;
        }

        .project-note {
          border-left: 3px solid #4b5563;
          padding-left: 20px;
          margin-bottom: 48px;
          font-size: 18px;
          color: #9ca3af;
          line-height: 1.6;
        }

        .project-note em {
          font-style: italic;
        }

        .project-note strong {
          color: #ffffff;
          font-weight: 600;
        }

        .project-item {
          margin-bottom: 48px;
        }

        .project-item-title {
          font-size: 20px;
          font-weight: 600;
          color: #ffffff;
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
          color: #ffffff;
          margin-top: 64px;
          margin-bottom: 32px;
          letter-spacing: -0.01em;
        }

        .section-subheading {
          font-size: 24px;
          font-weight: 500;
          color: #ffffff;
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
          color: #9ca3af;
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
          border: 1px solid #333;
        }

        .section-table {
          width: 100%;
          border-collapse: collapse;
          color: #9ca3af;
          font-size: 16px;
          min-width: 600px;
        }

        .section-table th,
        .section-table td {
          padding: 16px;
          text-align: left;
          border-bottom: 1px solid #333;
        }

        .section-table th {
          background-color: #1a1a1a;
          color: #ffffff;
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
          color: #6b7280;
          margin-top: 12px;
          text-align: center;
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
};

export default ProjectDetail;
