import React, { useEffect } from 'react';
import { MousePointer2, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const CapturePage = ({ photos, onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="capture-container">
      <div className="capture-header">
        <button className="back-button-details" onClick={onBack}>
          <ArrowUpRight size={20} style={{ transform: 'rotate(-135deg)' }} />
          BACK
        </button>
      </div>

      <motion.div
        className="bento-grid"
        initial={{ opacity: 0, y: 20, filter: 'blur(5px)', scale: 0.95 }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            className={`bento-item ${index % 5 === 0 ? 'large' : index % 3 === 0 ? 'tall' : 'standard'}`}
            whileHover={{ y: -8, scale: 1.02, zIndex: 50, transition: { duration: 0.3 } }}
          >
            <div className="photo-wrapper">
              <img src={photo.image} alt={photo.title} loading="lazy" />
              <div className="photo-overlay">
                <span className="photo-label">{photo.title}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <style>{`
        .capture-container {
          min-height: 100vh;
          background: #0a0a0a;
          color: #ffffff;
          padding: 60px 20px;
          font-family: 'Inter', sans-serif;
        }

        .capture-header {
          max-width: 1200px;
          margin: 0 auto 60px;
          text-align: center;
          position: relative;
        }

        .back-button-details {
          position: absolute;
          left: 0;
          top: 0;
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
          transition: color 0.2s ease;
        }

        .back-button-details:hover {
          color: #ffffff;
        }

        .capture-title {
          font-size: 48px;
          font-weight: 700;
          margin-bottom: 8px;
          letter-spacing: -0.02em;
        }

        .capture-subtitle {
          color: #6b7280;
          font-size: 18px;
          font-family: 'IBM Plex Mono', monospace;
        }

        .bento-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          grid-auto-rows: 240px;
          gap: 20px;
          grid-auto-flow: dense;
        }

        .bento-item {
          border-radius: 20px;
          overflow: hidden;
          background: #1a1a1a;
          position: relative;
          transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .bento-item:hover {
          transform: translateY(-8px);
          border-color: rgba(255, 255, 255, 0.1);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
          z-index: 10;
        }

        .bento-item.large {
          grid-column: span 2;
          grid-row: span 2;
        }

        .bento-item.tall {
          grid-row: span 2;
        }

        .photo-wrapper {
          width: 100%;
          height: 100%;
          position: relative;
        }

        .photo-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .bento-item:hover .photo-wrapper img {
          transform: scale(1.05);
        }

        .photo-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 24px;
          background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
          display: flex;
          align-items: flex-end;
        }

        .bento-item:hover .photo-overlay {
          opacity: 1;
        }

        .photo-label {
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        @media (max-width: 768px) {
          .bento-grid {
            grid-template-columns: 1fr;
            grid-auto-rows: 300px;
          }
          
          .bento-item.large, .bento-item.tall {
            grid-column: span 1;
            grid-row: span 1;
          }

          .capture-title {
            font-size: 32px;
          }

          .back-btn {
            position: relative;
            margin-bottom: 24px;
            display: inline-flex;
          }
        }
      `}</style>
    </div>
  );
};

export default CapturePage;
