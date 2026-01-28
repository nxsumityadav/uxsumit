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
                </div>
            </motion.div>

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Inter:wght@400;500;600;700&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .page-container {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background-color: #1a1a1a;
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
