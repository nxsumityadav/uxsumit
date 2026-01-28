import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Common Components
import LogosCarousel from '../components/common/LogosCarousel';

// Layout Components
import ProfileHeader from '../components/layout/ProfileHeader';
import Footer from '../components/layout/Footer';

// Section Components
import WorkSection from '../components/sections/WorkSection';
import ShotsSection from '../components/sections/ShotsSection';
import ExperiencesSection from '../components/sections/ExperiencesSection';
import AboutSection from '../components/sections/AboutSection';
import HobbySection from '../components/sections/HobbySection';

// Case Study Component
import ProjectDetail from '../components/case-studies/ProjectDetail';

export default function Home({ data, onSeeAllPhotos, initialSlug, onNavigate }) {
  if (!data) return null;
  const { workProjects = [], experiences = [], shots = [], hobby = {}, profile = {}, trustedCompanies = {}, socialLinks = {}, currentlyPlaying = {} } = data;
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
    work: "Curated case studies reconstructed as visual stories. Full walk-throughs available on request.",
    experiences: "A journey through my professional life—crafting user-centered products, complex platforms, and the occasional pivot.",
    shots: "Design artifacts, visual experiments, and rapid explorations from my creative lab.",
    about: "A deep dive into my background, my journey into design, and the principles that guide my work."
  };

  // Case Study View
  if (selectedProject) {
    return (
      <ProjectDetail
        project={selectedProject}
        onBack={() => onNavigate('portfolio')}
      />
    );
  }

  // Main Home View
  return (
    <div className="page-container">
      {/* Profile Header */}
      <ProfileHeader profile={profile} socialLinks={socialLinks} />

      {/* Logos Carousel */}
      <LogosCarousel heading={trustedCompanies?.heading} logos={logos} />

      {/* Main Content Tabs */}
      <section className="work-section">
        <div className="tabs-header">
          <div className="tabs-container" style={{ marginBottom: '20px' }}>
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

        <div className="tab-content-container">
          {activeTab === 'work' ? (
            <motion.div
              key="work"
              initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(5px)' }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="work-content-wrapper"
            >
              <p className="work-description">
                {descriptions[activeTab]}
              </p>
              <WorkSection
                projects={workProjects}
                onNavigate={onNavigate}
              />
            </motion.div>
          ) : (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10, filter: 'blur(5px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(5px)' }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <p className="tab-description">
                {descriptions[activeTab]}
              </p>
              {activeTab === 'experiences' && (
                <ExperiencesSection experiences={experiences} />
              )}
              {activeTab === 'shots' && (
                <ShotsSection shots={shots} />
              )}
              {activeTab === 'about' && (
                <AboutSection aboutData={data.about} profileImage={profile?.avatar} />
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer
        profile={profile}
        socialLinks={socialLinks}
        hobby={hobby}
        currentlyPlaying={currentlyPlaying}
        onSeeAllPhotos={onSeeAllPhotos}
      />

      {/* Global Page Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Inter:wght@400;500;600;700&display=swap');


        .page-container {
          width: 100%;
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
          bottom: 2px;
          right: 2px;
          width: 14px;
          height: 14px;
          background-color: #22c55e;
          border-radius: 50%;
          border: 2px solid #1a1a1a;
        }

        .name {
          font-size: 24px;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 4px;
          letter-spacing: -0.02em;
        }

        .title {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 16px;
          font-weight: 400;
          color: #9ca3af;
          margin-bottom: 24px;
        }

        .bio {
          font-size: 18px;
          font-weight: 400;
          color: #6b7280;
          line-height: 1.6;
          margin-bottom: 32px;
          max-width: 600px;
        }

        .bio .company {
          color: #ffffff;
          font-weight: 400;
          text-decoration: none;
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
          margin-bottom: 64px;
        }

        .btn {
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.2s;
        }

        .btn-primary {
          background-color: #ffffff;
          color: #1a1a1a;
          border-radius: 100px;
          padding: 12px 32px;
          font-weight: 500;
        }

        .btn-primary:hover {
          background-color: #e5e5e5;
        }

        .btn-secondary {
          background-color: transparent;
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 100px;
          padding: 12px 32px;
          font-weight: 500;
        }

        .btn-secondary:hover {
          background-color: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.4);
        }

        /* Logos Section */
        .logos-section {
          width: 100%;
          max-width: 900px;
          margin-bottom: 100px;
          overflow: hidden;
          background-color: #1a1a1a;
          padding: 32px 0;
          position: relative;
        }

        .logos-heading {
          text-align: center;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 13px;
          color: #6b7280;
          margin-bottom: 40px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .carousel-container {
          width: 100%;
          position: relative;
          overflow: hidden;
        }

        .carousel-track {
          display: flex;
          gap: 60px;
          width: max-content;
          padding: 0 60px;
        }

        .logo-item {
          flex: 0 0 auto;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.8;
          transition: all 0.4s ease;
        }

        .logo-item:hover {
          filter: grayscale(0%) opacity(1);
          transform: scale(1.1);
        }

        .logo-image {
          height: 32px;
          width: auto;
          object-fit: contain;
        }

        .fade-left,
        .fade-right {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 100px;
          z-index: 2;
          pointer-events: none;
        }

        .fade-left {
          left: 0;
          background: linear-gradient(to right, #1a1a1a, transparent);
        }

        .fade-right {
          right: 0;
          background: linear-gradient(to left, #1a1a1a, transparent);
        }

        /* Work Section */
        .work-section {
          max-width: 900px;
          width: 100%;
          margin-bottom: 100px;
        }

        .tabs-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 24px;
        }

        .tabs-container {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .tab-chip {
          padding: 12px 24px;
          border-radius: 100px;
          background-color: rgba(255, 255, 255, 0.05);
          color: #9ca3af;
          border: none;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .tab-chip:hover {
          background-color: rgba(255, 255, 255, 0.1);
          color: #ffffff;
        }

        .tab-chip.active {
          background-color: #ffffff;
          color: #1a1a1a;
        }

        .work-label {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 13px;
          color: #6b7280;
          margin-bottom: 16px;
          letter-spacing: 0.05em;
        }

        .work-description {
          font-size: 20px;
          color: #9ca3af;
          margin-bottom: 60px;
          max-width: 800px;
          line-height: 1.5;
        }

        .tab-description {
          font-size: 20px;
          color: #9ca3af;
          margin-bottom: 40px;
          max-width: 800px;
          line-height: 1.5;
        }

        /* Projects Grid */
        .projects-grid {
          display: flex;
          flex-direction: column;
          gap: 60px;
        }

        .project-card {
          cursor: pointer;
          width: 100%;
        }

        .project-thumbnail {
          width: 100%;
          aspect-ratio: 16/10;
          background-color: #262626;
          border-radius: 20px;
          overflow: hidden;
          margin-bottom: 24px;
        }

        .thumbnail-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .project-card:hover .thumbnail-image {
          transform: scale(1.02);
        }

        .project-info {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
          width: 100%;
        }

        .project-title {
          font-size: 20px;
          font-weight: 500;
          color: #ffffff;
          margin-bottom: 0;
          letter-spacing: -0.01em;
          flex: 1;
        }

        .project-read-time {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #6b7280;
          font-size: 15px;
          font-family: 'IBM Plex Mono', monospace;
          flex-shrink: 0;
          padding-top: 4px;
        }

        .project-meta {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #6b7280;
          font-size: 14px;
        }

        /* Experiences Timeline */
        .experiences-timeline {
            display: flex;
            flex-direction: column;
            gap: 48px;
            max-width: 800px;
        }

        .experience-row {
            display: grid;
            grid-template-columns: 200px 1fr;
            gap: 40px;
        }

        .experience-period {
            font-family: 'IBM Plex Mono', monospace;
            font-size: 13px;
            color: #6b7280;
            padding-top: 6px;
        }

        .experience-title {
            font-size: 18px;
            font-weight: 500;
            color: #ffffff;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .experience-company-icon {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 20px;
            height: 20px;
            border-radius: 4px;
        }

        .experience-description {
            font-size: 16px;
            color: #9ca3af;
            line-height: 1.6;
        }

        /* Shots Grid */
        .shots-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
        }

        .shot-card {
            width: 100%;
        }

        .shot-wrapper {
            position: relative;
            width: 100%;
            aspect-ratio: 4/3;
            background-color: #262626;
            border-radius: 12px;
            overflow: hidden;
            cursor: pointer;
        }

        .shot-wrapper:hover .hover-tooltip {
            opacity: 1;
            transform: translate(-50%, -10px);
        }

        .shot-media {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .media-item {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.4s ease;
        }
        
        .shot-wrapper:hover .media-item {
            transform: scale(1.05) rotate(2deg);
        }

        .hover-tooltip {
            position: absolute;
            bottom: 10px;
            left: 50%;
            transform: translate(-50%, 0);
            background-color: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 6px 12px;
            border-radius: 6px;
            font-size: 12px;
            pointer-events: none;
            opacity: 0;
            transition: all 0.3s ease;
            white-space: nowrap;
            z-index: 10;
            backdrop-filter: blur(4px);
        }

        /* About Section */
        .about-content {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 60px;
          align-items: start;
        }

        .about-image {
          width: 280px;
          height: 360px;
          border-radius: 16px;
        }

        .about-image-wrapper {
          width: 100%;
          height: 100%;
          background: white;
          padding: 8px;
          border-radius: 16px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
        }

        .about-photo {
          width: 100%;
          height: 100% !important;
          object-fit: cover;
          border-radius: 10px;
          display: block;
        }

        .about-text {
          font-size: 18px;
          color: #9ca3af;
          line-height: 1.7;
        }

        .about-text p {
          margin-bottom: 24px;
        }

        .about-text a {
          color: #ffffff;
          text-decoration: underline;
        }

        /* Hobby Section */
        .hobby-section {
          max-width: 900px;
          width: 100%;
          margin-bottom: 120px;
        }

        .section-label {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 13px;
          color: #6b7280;
          margin-bottom: 24px;
        }

        .hobby-description {
          font-size: 24px;
          color: #ffffff;
          margin-bottom: 60px;
          max-width: 600px;
          line-height: 1.4;
        }

        .photo-stack {
          position: relative;
          height: 400px;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .stacked-photo {
          position: absolute;
          width: 320px;
          height: 400px;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
          border: 4px solid #ffffff;
          cursor: pointer;
        }

        .stacked-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .photo-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 40px;
        }

        .see-all-link {
          display: flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: none;
          color: #ffffff;
          font-size: 18px;
          cursor: pointer;
        }

        .camera-info {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 13px;
          color: #6b7280;
        }

        /* Contact Section */
        .contact-section {
          max-width: 900px;
          width: 100%;
          margin-bottom: 120px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
        }

        .music-player {
          background-color: #262626;
          padding: 24px;
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .music-artwork {
          width: 60px;
          height: 60px;
          border-radius: 8px;
          overflow: hidden;
        }

        .music-artwork img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .music-title {
          font-size: 16px;
          font-weight: 500;
          color: #ffffff;
          margin-bottom: 4px;
        }

        .music-artist {
          font-size: 14px;
          color: #9ca3af;
        }

        .music-link {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12px;
          color: #6b7280;
          text-decoration: none;
          margin-top: auto;
        }

        .contact-links {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .contact-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          background-color: rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          text-decoration: none;
          color: #ffffff;
          transition: all 0.2s;
        }

        .contact-row:hover {
          background-color: rgba(255, 255, 255, 0.08);
          transform: translateY(-2px);
        }

        .contact-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .contact-right {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #6b7280;
        }

        /* Footer */
        .footer-container {
          max-width: 900px;
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 32px;
          padding: 0 0 60px;
          margin-top: 0;
        }

        .footer-hobby-section {
          margin-bottom: 20px;
        }

        .footer-section-label {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 13px;
          color: #616161;
          margin-bottom: 20px;
          letter-spacing: 0.05em;
        }

        .footer-hobby-description {
          font-size: 20px;
          color: #ffffff;
          line-height: 1.5;
          margin-bottom: 40px;
          max-width: 700px;
        }

        .footer-photo-grid {
          display: flex;
          margin: 60px 0;
          height: 400px;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .footer-stacked-photo {
          width: 280px;
          height: 360px;
          background: white;
          border-radius: 12px;
          padding: 8px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.5);
          flex-shrink: 0;
          position: relative;
          margin-left: -80px;
          transition: transform 0.3s ease, z-index 0s;
        }

        .footer-stacked-photo:first-child {
          margin-left: 0;
        }

        .footer-stacked-photo:nth-child(even) {
          transform: rotate(4deg);
        }

        .footer-stacked-photo:nth-child(odd) {
          transform: rotate(-4deg);
        }

        .footer-stacked-photo:hover {
          transform: rotate(0deg) scale(1.1) translateY(-10px);
          z-index: 50;
        }

        .footer-stacked-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 8px;
        }

        .footer-photo-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 20px;
        }

        .footer-see-all {
          display: flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: none;
          color: #9ca3af;
          font-size: 16px;
          cursor: pointer;
          padding: 0;
          transition: color 0.2s;
        }

        .footer-see-all:hover {
          color: #ffffff;
        }

        .footer-camera-info {
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          color: #404040;
        }

        .footer-music-card {
          background-color: rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 16px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 0;
          border: 1px solid rgba(255,255,255,0.05);
          width: 100%;
        }

        .music-card-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .music-card-artwork {
          width: 48px;
          height: 48px;
          border-radius: 8px;
          overflow: hidden;
        }

        .music-card-artwork img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .music-card-title {
          font-size: 16px;
          font-weight: 500;
          color: #ffffff;
          margin-bottom: 2px;
        }

        .music-card-artist {
          font-size: 14px;
          color: #888888;
        }

        .music-card-link {
          color: #888888;
          text-decoration: none;
          font-size: 13px;
          transition: color 0.2s;
        }

        .music-card-link:hover {
          color: #ffffff;
        }

        .footer-social-links {
          display: flex;
          flex-direction: column;
          gap: 20px;
          width: 100%;
          padding-top: 0;
        }

        .footer-social-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          text-decoration: none;
          color: #ffffff;
          padding: 4px 0;
          transition: opacity 0.2s;
        }

        .footer-social-row:hover {
          opacity: 0.7;
        }

        .footer-social-left {
          display: flex;
          align-items: center;
          gap: 16px;
          font-size: 18px;
          color: #9ca3af;
        }

        .footer-social-left span {
          color: #9ca3af;
        }

        .footer-social-right {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 16px;
          color: #9ca3af;
        }

        .footer-signature-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          margin: 40px 0 20px;
        }

        .footer-signature-img-large {
          height: 240px;
          filter: brightness(0) invert(1);
          opacity: 1;
        }

        .footer-owner-name {
          font-size: 16px;
          color: #6b7280;
          font-weight: 400;
        }

        .footer-bottom-bar {
          display: flex;
          justify-content: space-between;
          width: 100%;
          padding-top: 40px;
        }

        .footer-meta-info {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12px;
          color: #6b7280;
          letter-spacing: 0.05em;
        }
        
        @media (max-width: 768px) {
            .projects-grid {
                grid-template-columns: 1fr;
            }
            
            .shots-grid {
                grid-template-columns: repeat(2, 1fr);
            }

            .experience-row {
                grid-template-columns: 1fr;
                gap: 12px;
            }
            
            .about-content {
                grid-template-columns: 1fr;
            }
            
            .contact-section {
                grid-template-columns: 1fr;
            }

            .logo-item {
              filter: grayscale(0%) opacity(1);
            }

            .tabs-container {
              flex-wrap: nowrap;
              overflow-x: auto;
              padding-bottom: 8px;
              margin-left: -20px;
              margin-right: -20px;
              padding-left: 20px;
              padding-right: 20px;
              width: calc(100% + 40px);
              scrollbar-width: none;
            }

            .project-info {
              align-items: center;
            }

            .project-title {
              font-size: 18px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }

            .project-read-time {
              font-size: 13px;
            }

            .tabs-container::-webkit-scrollbar {
              display: none;
            }

            .tab-chip {
              white-space: nowrap;
              flex-shrink: 0;
            }

            .footer-stacked-photo:nth-child(n+3) {
              display: none;
            }

            .footer-photo-grid {
              height: 300px;
              margin: 40px 0;
            }

            .footer-stacked-photo {
              width: 200px;
              height: 260px;
              margin-left: -40px;
            }

            .footer-stacked-photo:first-child {
              margin-left: 0;
            }
        }
        
        @media (max-width: 480px) {
            .shots-grid {
                grid-template-columns: 1fr;
            }
        }
      `}</style>
    </div>
  );
};
