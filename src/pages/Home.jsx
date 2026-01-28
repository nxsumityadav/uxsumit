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
import ContactSection from '../components/sections/ContactSection';

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
        work: "Below are some selected case studies (as short-stories), full walk-throughs on calls.",
        experiences: "A quick tour of my professional life, designing user-centered experiences across products, platforms, and the occasional all-nighter.",
        shots: "Quick design explorations and visual experiments.",
        about: "A little more about me, my background, and what drives my design philosophy."
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

                <p className="work-description">
                    {descriptions[activeTab]}
                </p>

                {/* Tab Content Rendered Conditionally */}
                {activeTab === 'work' && (
                    <WorkSection
                        projects={workProjects}
                        onNavigate={onNavigate}
                    />
                )}

                {activeTab === 'experiences' && (
                    <ExperiencesSection experiences={experiences} />
                )}

                {activeTab === 'shots' && (
                    <ShotsSection shots={shots} />
                )}

                {activeTab === 'about' && (
                    <AboutSection aboutData={data.about} profileImage={profile?.avatar} />
                )}
            </section>

            {/* Hobby Section */}
            <HobbySection hobby={hobby} onSeeAllPhotos={onSeeAllPhotos} />

            {/* Contact & Music */}
            <ContactSection socialLinks={socialLinks} currentlyPlaying={currentlyPlaying} />

            {/* Footer */}
            <Footer profile={profile} />

            {/* Global Page Styles */}
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
          border: 3px solid #1a1a1a;
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
          color: #9ca3af;
          line-height: 1.6;
          margin-bottom: 32px;
        }

        .bio .company {
          color: #ffffff;
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
          margin-bottom: 80px;
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
        }

        .btn-primary:hover {
          background-color: #e5e5e5;
        }

        .btn-secondary {
          background-color: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          backdrop-filter: blur(10px);
        }

        .btn-secondary:hover {
          background-color: rgba(255, 255, 255, 0.15);
        }

        /* Logos Section */
        .logos-section {
          width: 100vw;
          margin-left: calc(-50vw + 50%);
          margin-bottom: 120px;
          overflow: hidden;
          background-color: #1a1a1a;
          padding: 40px 0;
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
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          filter: grayscale(100%) opacity(0.5);
          transition: filter 0.3s ease;
        }

        .carousel-track:hover .logo-item {
          filter: grayscale(0%) opacity(1);
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
          width: 200px;
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
          margin-bottom: 120px;
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
          padding: 8px 16px;
          border-radius: 100px;
          background-color: rgba(255, 255, 255, 0.05);
          color: #9ca3af;
          border: none;
          font-size: 14px;
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

        .work-description {
          font-size: 16px;
          color: #6b7280;
          margin-bottom: 40px;
          max-width: 500px;
        }

        /* Projects Grid */
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
          gap: 32px;
        }

        .project-card {
          cursor: pointer;
        }

        .project-thumbnail {
          width: 100%;
          height: 260px;
          background-color: #262626;
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 16px;
        }

        .thumbnail-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .project-card:hover .thumbnail-image {
          transform: scale(1.05);
        }

        .project-title {
          font-size: 18px;
          font-weight: 500;
          color: #ffffff;
          margin-bottom: 8px;
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
          border-radius: 20px;
          overflow: hidden;
        }

        .about-photo {
          width: 100%;
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
          background-color: rgba(255, 255, 255, 0.03);
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
        .site-footer {
          max-width: 900px;
          width: 100%;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: 60px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          padding-bottom: 40px;
        }

        .footer-signature-img {
          height: 60px;
          opacity: 0.8;
        }

        .footer-bottom {
          display: flex;
          gap: 24px;
        }

        .footer-location,
        .footer-weather {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12px;
          color: #6b7280;
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
