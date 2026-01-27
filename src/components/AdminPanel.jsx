import React, { useState, useEffect } from 'react';
import { Briefcase, Image as ImageIcon, Camera, Layout, FileText, Share2, Music, Building2, User, Globe, Mail, Linkedin, Palette, ArrowUpRight } from 'lucide-react';

/**
 * ============================================================================
 * PORTFOLIO ADMIN PANEL
 * ============================================================================
 * 
 * A comprehensive content management system for the portfolio website.
 * 
 * FEATURES:
 * - Dashboard overview with statistics
 * - Full CRUD operations for all content sections
 * - Real-time preview
 * - Publish/unpublish functionality
 * - Image URL management
 * - localStorage persistence
 * 
 * SECTIONS MANAGED:
 * 1. Profile - Personal info, avatar, bio
 * 2. Work Projects - Case studies with full content
 * 3. Experiences - Timeline-based work history
 * 4. Shots - Design explorations gallery
 * 5. About - Bio paragraphs
 * 6. Hobby - Personal interests section
 * 7. Social Links - Contact information
 * 8. Currently Playing - Music widget
 * 9. Trusted Companies - Logo carousel
 * 
 * ============================================================================
 */

// Default data structure
const defaultPortfolioData = {
  version: "2.2",
  profile: {
    name: "Sumit Kumar",
    title: "Product Designer",
    bio: "Product Designer at Spreetail and building Taiyari AI. Currently at Vibe crafting digital experiences.",
    avatar: "/images/sumit.png",
    isOnline: true,
    company: { name: "Spreetail", color: "#3b82f6", logo: "/images/Logo/spreetail.avif" },
    location: "Bangalore, India",
    weather: "34°C"
  },
  socialLinks: {
    email: "wrk.sumit@gmail.com",
    linkedin: "/in/nxsumityadav",
    behance: "sumitkumar196",
    dribbble: "nxsumityadav",
    medium: "@nxsumityadav",
    resume: "https://drive.google.com/file/d/1VJH37IC6r5k3ZDZ7C2qbw-Ck4HdWb1WF/view?usp=sharing",
    cal: "https://cal.com/nxsumityadav/15?overlayCalendar=true"
  },
  trustedCompanies: {
    heading: "Helping these brands grow 🤝",
    logos: [
      { id: "logo-1", name: "Adaapt", image: "/images/Logo/adaapt.avif" },
      { id: "logo-2", name: "Beckn", image: "/images/Logo/beckn-athon.avif" },
      { id: "logo-3", name: "Google", image: "/images/Logo/google.avif" },
      { id: "logo-4", name: "Kolo", image: "/images/Logo/koloapp.avif" },
      { id: "logo-5", name: "Microsoft", image: "/images/Logo/microsoft.png" },
      { id: "logo-6", name: "NUS", image: "/images/Logo/nus.png" },
      { id: "logo-7", name: "Outbox", image: "/images/Logo/outbox.avif" },
      { id: "logo-8", name: "Reachinbox", image: "/images/Logo/reachinbox.avif" },
      { id: "logo-9", name: "Spreetail", image: "/images/Logo/spreetail.avif" },
      { id: "logo-10", name: "Instead", image: "/images/Logo/instead.jpeg" }
    ]
  },
  workProjects: [
    {
      id: 1,
      title: "How I helped Spreetail scale their design systems",
      image: "https://framerusercontent.com/images/kbQs2PrfTeYETEoke9znkZrF1d4.png?width=1440&height=880",
      readTime: "2 m",
      wordCount: 286,
      date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }).toUpperCase(),
      published: true,
      content: {
        intro: [
          "As a popular saying goes, you don't realise the passing of time when you're enjoying what you do.",
          "I have seen the Spreetail products grow from a vague idea to a fully functional tool."
        ],
        projectsTitle: "Case Studies I contributed to:",
        projects: [
          { name: "Spreetail Commerce", description: "unifying data silos", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop" }
        ]
      }
    },
    {
      id: 2,
      title: "Building SaaSMetrics From Scratch in 3 Months (0 to 1)",
      image: "/images/Projects/saasmetrics-hero.png",
      readTime: "4 m",
      wordCount: 450,
      date: "1 JAN 2025",
      published: true,
      content: {
        intro: [
          "As the product designer at SaaSMetrics, I led the design of a revolutionary SaaS analytics platform from concept to MVP launch.",
          "This case study details our journey of transforming complex financial data into actionable insights through intuitive design."
        ],
        projectsTitle: "Case Studies I contributed to:",
        projects: [
          { name: "SaaSMetrics Dashboard", description: "unifying data silos", image: "/images/Projects/saasmetrics-1.png" },
          { name: "Financial Insights", description: "intuitive data visualization", image: "/images/Projects/saasmetrics-2.png" },
          { name: "Customer Analytics", description: "tracking growth metrics", image: "/images/Projects/saasmetrics-3.png" }
        ]
      }
    },
    {
      id: 3,
      title: "Referral Stack: Cut Onboarding Time by 66%",
      image: "/images/Projects/referral-hero.png",
      readTime: "6 m",
      wordCount: 850,
      date: "1 JAN 2025",
      published: true,
      content: {
        intro: [
          "Referral Stack is a SaaS platform helping startups and creators manage affiliate programs effortlessly.",
          "We designed and shipped the product in one month, reducing onboarding time from 30 minutes to under 10."
        ],
        projectsTitle: "Key Features & Results:",
        projects: [
          { name: "Instant Onboarding", description: "setup in <10 mins", image: "/images/Projects/referral-hero.png" },
          { name: "Automated Payouts", description: "paypal & stripe", image: "/images/Projects/referral-hero.png" },
          { name: "Real-time Analytics", description: "fraud detection", image: "/images/Projects/referral-hero.png" }
        ]
      }
    },
    {
      id: 4,
      title: "Jiraaf: Increasing Daily Active Users by 18%",
      image: "/images/Projects/jiraaf-hero.png",
      readTime: "4 m",
      wordCount: 600,
      date: "1 JAN 2023",
      published: true,
      content: {
        intro: [
          "Digitizing the cafeteria experience for Kamal Bhai’s Kitchen to reduce wait times and boost engagement.",
          "We achieved an 18% increase in DAU and a 50% reduction in queue wait times."
        ],
        projectsTitle: "Impact Highlights:",
        projects: [
          { name: "Queue Management", description: "50% faster checkout", image: "/images/Projects/jiraaf-hero.png" },
          { name: "Gamification", description: "boosted engagement", image: "/images/Projects/jiraaf-hero.png" }
        ]
      }
    }
  ],
  experiences: [
    {
      id: 1,
      company: "Spreetail",
      companyColor: "#3b82f6",
      logo: "/images/Logo/spreetail.avif",
      role: "Product Designer",
      period: "OCT 2024 — PRESENT",
      description: "Led design initiatives for multi-channel commerce platforms.",
      published: true
    },
    {
      id: 2,
      company: "Adaapt",
      companyColor: "#10b981",
      logo: "/images/Logo/adaapt.avif",
      role: "Product designer",
      period: "JUN 2023 — OCT 2024",
      description: "Designed end-to-end product experiences for internal tools.",
      published: true
    },
    {
      id: 3,
      company: "Koloapp",
      companyColor: "#f59e0b",
      logo: "/images/Logo/koloapp.avif",
      role: "Product Designer Intern",
      period: "JAN 2022 — APR 2022",
      description: "Assisted in UI/UX research and design for mobile platforms.",
      published: true
    }
  ],
  shots: [
    { id: "s1", title: "Charts Design", image: "/images/shots/charts.mp4", published: true },
    { id: "s2", title: "Mountain App", image: "/images/shots/mountain.mp4", published: true },
    { id: "s3", title: "Inview App", image: "/images/shots/inviw.mp4", published: true },
    { id: "s4", title: "Light Beam", image: "/images/shots/light_beam.mp4", published: true },
    { id: "s5", title: "SEO Strategy", image: "/images/shots/seo.gif", published: true },
    { id: "s6", title: "MacBook Air Concept", image: "/images/shots/MacBook Air - 4.png", published: true },
    { id: "s7", title: "Adaapt Dashboard", image: "/images/shots/adaapt.png", published: true },
    { id: "s8", title: "Digital Agency", image: "/images/shots/digencial.png", published: true },
    { id: "s9", title: "FitnessX App", image: "/images/shots/fitnessx.png", published: true },
    { id: "s10", title: "Ghumantu Travel", image: "/images/shots/ghumantu.png", published: true },
    { id: "s11", title: "Growzilla Brand", image: "/images/shots/growzilla.png", published: true },
    { id: "s12", title: "Nike Concept", image: "/images/shots/nike.png", published: true },
    { id: "s13", title: "Portfolio 2024", image: "/images/shots/portfolio.png", published: true },
    { id: "s14", title: "Saas Platform", image: "/images/shots/saas-2.webp", published: true },
    { id: "s15", title: "Security App", image: "/images/shots/secure.avif", published: true },
    { id: "s16", title: "Poster Design", image: "/images/shots/Poster.png", published: true },
    { id: "s17", title: "Hustler X Icons", image: "/images/shots/hustler_x_icons.png", published: true },
    { id: "s18", title: "HustlerX Platform", image: "/images/shots/hustlerx.png", published: true },
    { id: "s19", title: "HustlerX Logo", image: "/images/shots/logo_hustlerx.png", published: true },
    { id: "s20", title: "Ludo Game Design", image: "/images/shots/ludo.png", published: true },
    { id: "s21", title: "Pricing Plans", image: "/images/shots/plans.png", published: true },
    { id: "s22", title: "Supreme Concept", image: "/images/shots/supreme.jpg", published: true },
    { id: "s23", title: "Trell Agency", image: "/images/shots/trell.png", published: true },
    { id: "s24", title: "Kiyaray App", image: "/images/shots/kiyaray .webp", published: true },
    { id: "s25", title: "Microscope View", image: "/images/shots/microscop[e.jpg", published: true }
  ],
  about: {
    paragraphs: [
      "Hey, I’m Sumit a Product designer obsessed with crafting digital experiences that actually matter. My journey kicked off in the world of visual art, but I quickly got hooked on building products that solve real problems.",
      "Right now, you’ll find me at Vibe, blending code and design to help businesses build products their users love. I’ve done everything from designing end-to-end products to taking my own ideas through the YC application grind.",
      "When I’m not deep in design, I’m experimenting with my own B2B SaaS projects (some live, some resting in my ever-growing side project graveyard 🥀). Always building, always learning.",
      "Check out my latest project: <a href='https://taiyaryai.com' target='_blank' rel='noopener noreferrer' style='color: #ffffff; text-decoration: underline;'>Taiyari AI</a>"
    ]
  },
  hobby: {
    label: "WHEN I AM NOT WORKING",
    description: "I love taking photos, playing cricket and badminton, binging Modern Family, and generously feeding the algorithm my data for \"better\" ads.",
    photos: [
      { id: "h1", image: "/images/Capture/cyber.jpg", rotation: -6, title: "Cyber" },
      { id: "h2", image: "/images/Capture/delhi_bus_stop.jpg", rotation: 4, title: "Delhi Bus Stop" },
      { id: "h3", image: "/images/Capture/delhi_metro.jpg", rotation: -3, title: "Delhi Metro" },
      { id: "h4", image: "/images/Capture/india_gate.jpg", rotation: 5, title: "India Gate" },
      { id: "h5", image: "/images/Capture/night.jpg", rotation: -2, title: "Night Walk" },
      { id: "h6", image: "/images/Capture/nitj.jpg", rotation: 3, title: "NITJ Days" }
    ],
    cameraInfo: "Shot with my Pixel 6a"
  },
  currentlyPlaying: {
    title: "90s Night: Hindi",
    artist: "Melodious songs from 90s to soothe your heart and soul",
    artwork: "https://lh3.googleusercontent.com/tTY3keD6v1y_IThrZ369FkHilmEPDZE1tS6175yO1rhDkruQ5muwvAPlCafkkjarCo_T-DM1aSq1LA=w544-h544-l90-rj",
    link: "https://music.youtube.com/playlist?list=RDCLAK5uy_lbXtmLX1HAR8xjLUzI0NPfwMbj2qqMXKY&playnext=1&si=XqBlpOn5jXYAgEpR"
  }
};

const STORAGE_KEY = 'portfolio_admin_data';

// Utility functions
const loadData = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultPortfolioData;
  } catch { return defaultPortfolioData; }
};

const saveData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  // Dispatch event for portfolio to listen
  window.dispatchEvent(new CustomEvent('portfolioDataUpdate', { detail: data }));
};

const generateId = () => Date.now() + Math.random().toString(36).substr(2, 9);

// ============================================================================
// ADMIN PANEL COMPONENT
// ============================================================================

export default function AdminPanel({ data, setData }) {
  const [activeSection, setActiveSection] = useState('work');
  const [editingItem, setEditingItem] = useState(null);
  const [notification, setNotification] = useState(null);

  // Auto-save logic
  useEffect(() => {
    if (editingItem && editingItem.id) {
      const timer = setTimeout(() => {
        setData(prev => {
          // Check if this is a work project
          const isProject = prev.workProjects.some(p => p.id === editingItem.id);
          const isNewProject = editingItem.content && editingItem.content.intro;

          if (isProject || isNewProject) {
            const newProjects = isProject
              ? prev.workProjects.map(p => p.id === editingItem.id ? editingItem : p)
              : [...prev.workProjects, editingItem];

            // Only update if changed to avoid infinite loops
            const currentProj = prev.workProjects.find(p => p.id === editingItem.id);
            if (JSON.stringify(currentProj) !== JSON.stringify(editingItem)) {
              return { ...prev, workProjects: newProjects };
            }
          }
          return prev;
        });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [editingItem, setData]);

  // Show notification
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Update nested data helper
  const updateData = (path, value) => {
    setData(prev => {
      const newData = { ...prev };
      const keys = path.split('.');
      let current = newData;
      for (let i = 0; i < keys.length - 1; i++) {
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newData;
    });
    showNotification('Changes saved!');
  };

  const handleFileUpload = (e, callback) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        callback(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const calculateStats = (introArray) => {
    const text = introArray.join(' ');
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const readTime = Math.max(1, Math.ceil(words / 200));
    return { words, readTime: `${readTime} m` };
  };

  // Navigation items
  const navItems = [
    { id: 'work', label: 'Case Studies', icon: <Briefcase size={20} /> },
    { id: 'shots', label: 'Shots', icon: <ImageIcon size={20} /> },
    { id: 'hobby', label: 'Hobby Section', icon: <Camera size={20} /> },
    { id: 'social', label: 'Social Links', icon: <Share2 size={20} /> },
  ];

  // Stats for dashboard
  const stats = {
    projects: data.workProjects?.length || 0,
    publishedProjects: data.workProjects?.filter(p => p.published).length || 0,
    experiences: data.experiences?.length || 0,
    shots: data.shots?.length || 0,
    companies: data.trustedCompanies?.logos?.length || 0
  };

  // ============================================================================
  // RENDER SECTIONS
  // ============================================================================

  // Sections removed: Dashboard, Profile


  const renderWorkProjects = () => (
    <div className="section-content">
      <div className="section-header">
        <h2>Case Studies</h2>
        <button
          className="add-btn"
          onClick={() => {
            const newProject = {
              id: generateId(),
              title: "New Project",
              image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1440&h=880&fit=crop",
              readTime: "1 m",
              wordCount: 0,
              date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }).toUpperCase(),
              published: true,
              content: { intro: [""], projectsTitle: "", projects: [] }
            };
            setEditingItem(newProject);
          }}
        >
          + Add Project
        </button>
      </div>

      {editingItem && editingItem.readTime !== undefined ? (
        <div className="edit-form">
          <h3>Edit Project</h3>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={editingItem.title}
              onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Cover Image</label>
            <div className="image-upload-wrapper">
              <input
                type="text"
                placeholder="Image URL"
                value={editingItem.image}
                onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
              />
              <span className="or-divider">OR</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, (url) => setEditingItem({ ...editingItem, image: url }))}
                className="file-input"
              />
            </div>
            {editingItem.image && <img src={editingItem.image} alt="Preview" className="image-preview large" />}
          </div>

          <div className="form-group">
            <label>Introduction Paragraphs (double newline for new paragraph)</label>
            <textarea
              value={editingItem.content?.intro?.join('\n\n') || ''}
              onChange={(e) => {
                const intro = e.target.value.split('\n\n').filter(p => p.trim());
                const stats = calculateStats(intro);
                setEditingItem({
                  ...editingItem,
                  content: { ...editingItem.content, intro },
                  wordCount: stats.words,
                  readTime: stats.readTime,
                  date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }).toUpperCase()
                });
              }}
              rows={10}
              placeholder="Start writing your story..."
            />
          </div>

          <div className="form-group stats-preview">
            <span>Auto-calculated: <strong>{editingItem.wordCount} words</strong></span>
            <span>Estimated: <strong>{editingItem.readTime} read</strong></span>
            <span>Date: <strong>{editingItem.date}</strong></span>
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={editingItem.published}
                onChange={(e) => setEditingItem({ ...editingItem, published: e.target.checked })}
              />
              Published
            </label>
          </div>

          <div className="form-actions">
            <button
              className="save-btn"
              onClick={() => {
                const newProjects = data.workProjects.map(p => p.id === editingItem.id ? editingItem : p);
                if (!data.workProjects.find(p => p.id === editingItem.id)) {
                  newProjects.push(editingItem);
                }
                updateData('workProjects', newProjects);
                setEditingItem(null);
              }}
            >
              Save Project
            </button>
            <button className="cancel-btn" onClick={() => setEditingItem(null)}>Cancel</button>
            {data.workProjects.find(p => p.id === editingItem.id) && (
              <button
                className="delete-btn"
                style={{ marginLeft: 'auto' }}
                onClick={() => {
                  if (confirm('Delete this project?')) {
                    updateData('workProjects', data.workProjects.filter(p => p.id !== editingItem.id));
                    setEditingItem(null);
                  }
                }}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="items-grid">
          {data.workProjects?.map(project => (
            <div key={project.id} className="grid-card" onClick={() => setEditingItem(project)}>
              <div className="card-thumb">
                <img src={project.image} alt={project.title} />
              </div>
              <div className="card-content">
                <h4>{project.title}</h4>
                <p>{project.date} • {project.readTime}</p>
                <span className={`status-badge ${project.published ? 'published' : 'draft'}`}>
                  {project.published ? 'Published' : 'Draft'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Section removed: Experiences


  const renderShots = () => (
    <div className="section-content">
      <div className="section-header">
        <h2>Design Shots</h2>
        <div className="shots-actions">
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            id="shot-upload"
            onChange={(e) => handleFileUpload(e, (url) => {
              const newShot = { id: generateId(), title: "Uploaded Shot", image: url, published: true };
              updateData('shots', [...(data.shots || []), newShot]);
            })}
          />
          <button className="add-btn" onClick={() => document.getElementById('shot-upload').click()}>
            Upload Shot
          </button>
        </div>
      </div>

      <div
        className="shots-paste-area"
        onPaste={(e) => {
          const items = e.clipboardData.items;
          for (let i = 0; i < items.length; i++) {
            if (items[i].type.indexOf("image") !== -1) {
              const blob = items[i].getAsFile();
              const reader = new FileReader();
              reader.onload = (event) => {
                const newShot = { id: generateId(), title: "Pasted Shot", image: event.target.result, published: true };
                updateData('shots', [...(data.shots || []), newShot]);
              };
              reader.readAsDataURL(blob);
            }
          }
        }}
      >
        <p>Tip: You can paste images directly here (Ctrl+V)</p>

        <div className="shots-grid">
          {data.shots?.map(shot => (
            <div key={shot.id} className="shot-card-admin">
              <img src={shot.image} alt={shot.title} />
              <div className="shot-overlay">
                <input
                  type="text"
                  value={shot.title}
                  placeholder="Shot Title"
                  onChange={(e) => {
                    updateData('shots', data.shots.map(s => s.id === shot.id ? { ...s, title: e.target.value } : s));
                  }}
                />
                <div className="shot-actions">
                  <button
                    className="delete"
                    onClick={() => {
                      if (confirm('Delete this shot?')) {
                        updateData('shots', data.shots.filter(s => s.id !== shot.id));
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Section removed: About


  const renderHobby = () => (
    <div className="section-content">
      <h2>Hobby Section</h2>
      <div className="form-group">
        <label>Section Label</label>
        <input
          type="text"
          value={data.hobby?.label || ''}
          onChange={(e) => updateData('hobby.label', e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea
          value={data.hobby?.description || ''}
          onChange={(e) => updateData('hobby.description', e.target.value)}
          rows={3}
        />
      </div>
      <div className="form-group">
        <label>Camera Info</label>
        <input
          type="text"
          value={data.hobby?.cameraInfo || ''}
          onChange={(e) => updateData('hobby.cameraInfo', e.target.value)}
        />
      </div>

      <h3>Photos</h3>
      <div className="photos-grid">
        {data.hobby?.photos?.map((photo, index) => (
          <div key={photo.id} className="photo-item">
            <img src={photo.image} alt={`Photo ${index + 1}`} />
            <div className="photo-controls">
              <input
                type="text"
                placeholder="Image URL"
                value={photo.image}
                onChange={(e) => {
                  const newPhotos = [...data.hobby.photos];
                  newPhotos[index] = { ...photo, image: e.target.value };
                  updateData('hobby.photos', newPhotos);
                }}
              />
              <input
                type="number"
                placeholder="Rotation"
                value={photo.rotation}
                onChange={(e) => {
                  const newPhotos = [...data.hobby.photos];
                  newPhotos[index] = { ...photo, rotation: parseInt(e.target.value) || 0 };
                  updateData('hobby.photos', newPhotos);
                }}
                style={{ width: '80px' }}
              />
              <button
                className="delete"
                onClick={() => {
                  updateData('hobby.photos', data.hobby.photos.filter((_, i) => i !== index));
                }}
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        className="add-btn"
        onClick={() => {
          const newPhoto = {
            id: generateId(),
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=500&fit=crop",
            rotation: 0
          };
          updateData('hobby.photos', [...(data.hobby?.photos || []), newPhoto]);
        }}
      >
        + Add Photo
      </button>
    </div>
  );

  // Sections removed: Social, Music, Companies


  const renderSocialLinks = () => (
    <div className="section-content">
      <div className="section-header">
        <h2>Social & Contact Links</h2>
      </div>

      <div className="edit-form">
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            value={data.socialLinks?.email || ''}
            onChange={(e) => updateData('socialLinks.email', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>LinkedIn ID (e.g. /in/username)</label>
          <input
            type="text"
            value={data.socialLinks?.linkedin || ''}
            onChange={(e) => updateData('socialLinks.linkedin', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Behance ID</label>
          <input
            type="text"
            value={data.socialLinks?.behance || ''}
            onChange={(e) => updateData('socialLinks.behance', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Dribbble ID</label>
          <input
            type="text"
            value={data.socialLinks?.dribbble || ''}
            onChange={(e) => updateData('socialLinks.dribbble', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Medium ID (e.g. @username)</label>
          <input
            type="text"
            value={data.socialLinks?.medium || ''}
            onChange={(e) => updateData('socialLinks.medium', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Resume Link (Google Drive/Dropbox)</label>
          <input
            type="text"
            value={data.socialLinks?.resume || ''}
            onChange={(e) => updateData('socialLinks.resume', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Call Booking Link (Cal.com/Calendly)</label>
          <input
            type="text"
            value={data.socialLinks?.cal || ''}
            onChange={(e) => updateData('socialLinks.cal', e.target.value)}
          />
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'work': return renderWorkProjects();
      case 'shots': return renderShots();
      case 'hobby': return renderHobby();
      case 'social': return renderSocialLinks();
      default: return renderWorkProjects();
    }
  };

  return (
    <div className="admin-container">
      {/* Notification */}
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>Portfolio Admin</h1>
          <span className="version">v1.0</span>
        </div>
        <nav className="sidebar-nav">
          {navItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={() => {
                setActiveSection(item.id);
                setEditingItem(null);
              }}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <button
            className="reset-btn"
            onClick={() => {
              if (confirm('Reset all data to defaults? This cannot be undone.')) {
                setData(defaultPortfolioData);
                showNotification('Data reset to defaults', 'info');
              }
            }}
          >
            Reset to Defaults
          </button>
          <a href="#" className="view-site" onClick={() => window.open('/', '_blank')}>
            View Live Site →
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {renderContent()}
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .admin-container {
          font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;
          display: flex;
          min-height: 100vh;
          background: #0f0f0f;
          color: #e5e5e5;
        }

        /* Notification */
        .notification {
          position: fixed;
          bottom: 20px;
          right: 20px;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 500;
          z-index: 1000;
          animation: slideInBottom 0.3s ease;
        }
        
        @keyframes slideInBottom {
          from { transform: translateY(100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .notification.success {
          background: #10b981;
          color: white;
        }
        
        .notification.info {
          background: #3b82f6;
          color: white;
        }

        /* Sidebar */
        .sidebar {
          width: 260px;
          background: #161616;
          border-right: 1px solid #2a2a2a;
          display: flex;
          flex-direction: column;
          position: fixed;
          height: 100vh;
          overflow-y: auto;
        }

        .sidebar-header {
          padding: 24px;
          border-bottom: 1px solid #2a2a2a;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .sidebar-header h1 {
          font-size: 18px;
          font-weight: 700;
          color: white;
        }

        .version {
          font-size: 11px;
          padding: 4px 8px;
          background: #2a2a2a;
          border-radius: 4px;
          color: #888;
        }

        .sidebar-nav {
          flex: 1;
          padding: 16px 12px;
        }

        .nav-item {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border: none;
          background: transparent;
          color: #888;
          font-size: 14px;
          font-family: inherit;
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.2s ease;
          text-align: left;
          margin-bottom: 4px;
        }

        .nav-item:hover {
          background: #222;
          color: #e5e5e5;
        }

        .nav-item.active {
          background: #2563eb;
          color: white;
        }

        .nav-icon {
          font-size: 16px;
        }

        .sidebar-footer {
          padding: 16px;
          border-top: 1px solid #2a2a2a;
        }

        .reset-btn {
          width: 100%;
          padding: 10px;
          background: #1f1f1f;
          border: 1px solid #333;
          color: #888;
          font-size: 13px;
          border-radius: 6px;
          cursor: pointer;
          margin-bottom: 12px;
          transition: all 0.2s ease;
        }

        .reset-btn:hover {
          background: #2a2a2a;
          color: #e5e5e5;
        }

        .view-site {
          display: block;
          text-align: center;
          color: #3b82f6;
          text-decoration: none;
          font-size: 13px;
        }

        .view-site:hover {
          text-decoration: underline;
        }

        /* Main Content */
        .main-content {
          flex: 1;
          margin-left: 260px;
          padding: 32px;
          overflow-y: auto;
        }

        /* Dashboard */
        .dashboard h2 {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 32px;
          color: white;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 16px;
          margin-bottom: 48px;
        }

        .stat-card {
          background: #1a1a1a;
          border: 1px solid #2a2a2a;
          border-radius: 12px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .stat-number {
          font-size: 36px;
          font-weight: 700;
          color: white;
        }

        .stat-label {
          font-size: 14px;
          color: #888;
        }

        .quick-actions {
          margin-bottom: 48px;
        }

        .quick-actions h3 {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 16px;
          color: white;
        }

        .action-btn {
          padding: 10px 20px;
          background: #222;
          border: 1px solid #333;
          color: #e5e5e5;
          font-size: 14px;
          border-radius: 6px;
          cursor: pointer;
          margin-right: 12px;
          transition: all 0.2s ease;
        }

        .action-btn:hover {
          background: #2a2a2a;
          border-color: #444;
        }

        .recent-activity h3 {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 16px;
          color: white;
        }

        .activity-list {
          background: #1a1a1a;
          border: 1px solid #2a2a2a;
          border-radius: 12px;
          overflow: hidden;
        }

        .activity-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          border-bottom: 1px solid #2a2a2a;
        }

        .activity-item:last-child {
          border-bottom: none;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .status-dot.published {
          background: #10b981;
        }

        .status-dot.draft {
          background: #f59e0b;
        }

        .activity-title {
          flex: 1;
          font-size: 14px;
        }

        .activity-date {
          font-size: 12px;
          color: #666;
        }

        /* Section Content */
        .section-content h2 {
          font-size: 24px;
          font-weight: 700;
          margin-bottom: 24px;
          color: white;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .section-header h2 {
          margin-bottom: 0;
        }

        .section-desc {
          color: #888;
          margin-bottom: 24px;
        }

        /* Forms */
        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          font-size: 13px;
          font-weight: 500;
          color: #888;
          margin-bottom: 8px;
        }

        .form-group input[type="text"],
        .form-group input[type="email"],
        .form-group input[type="url"],
        .form-group input[type="number"],
        .form-group textarea {
          width: 100%;
          padding: 12px 16px;
          background: #1a1a1a;
          border: 1px solid #2a2a2a;
          border-radius: 8px;
          color: #e5e5e5;
          font-size: 14px;
          font-family: inherit;
          transition: border-color 0.2s ease;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #3b82f6;
        }

        .form-group input[type="color"] {
          width: 60px;
          height: 40px;
          padding: 4px;
          background: #1a1a1a;
          border: 1px solid #2a2a2a;
          border-radius: 8px;
          cursor: pointer;
        }

        .form-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .checkbox-group label {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }

        .checkbox-group input[type="checkbox"] {
          width: 18px;
          height: 18px;
          accent-color: #3b82f6;
        }

        .image-preview {
          margin-top: 12px;
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 8px;
        }

        .image-preview.large {
          width: 100%;
          max-width: 400px;
          height: auto;
        }

        /* Buttons */
        .add-btn {
          padding: 10px 20px;
          background: #2563eb;
          border: none;
          color: white;
          font-size: 14px;
          font-weight: 500;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .add-btn:hover {
          background: #1d4ed8;
        }

        .add-btn.small {
          padding: 8px 16px;
          font-size: 13px;
        }

        .save-btn {
          padding: 12px 32px;
          background: #10b981;
          border: none;
          color: white;
          font-size: 14px;
          font-weight: 500;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .save-btn:hover {
          background: #059669;
        }

        .cancel-btn {
          padding: 12px 32px;
          background: transparent;
          border: 1px solid #333;
          color: #888;
          font-size: 14px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .cancel-btn:hover {
          background: #1a1a1a;
          color: #e5e5e5;
        }

        .delete-btn {
          padding: 8px 16px;
          background: #ef4444;
          border: none;
          color: white;
          font-size: 13px;
          border-radius: 6px;
          cursor: pointer;
        }

        .delete-btn.small {
          padding: 4px 12px;
          font-size: 12px;
        }

        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid #2a2a2a;
        }

        .image-upload-wrapper {
          display: flex;
          align-items: center;
          gap: 16px;
          background: #1a1a1a;
          padding: 8px;
          border: 1px solid #2a2a2a;
          border-radius: 8px;
        }

        .or-divider {
          color: #666;
          font-size: 11px;
          font-weight: 700;
        }

        .file-input {
          font-size: 12px;
          color: #888;
        }

        .stats-preview {
          display: flex;
          gap: 24px;
          padding: 16px;
          background: #1a1a1a;
          border: 1px solid #2a2a2a;
          border-radius: 8px;
          color: #888;
          font-size: 13px;
        }

        .stats-preview strong {
          color: #e5e5e5;
        }

        /* Items Grid */
        .items-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 24px;
        }

        .grid-card {
          background: #161616;
          border: 1px solid #2a2a2a;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .grid-card:hover {
          transform: translateY(-4px);
          border-color: #3b82f6;
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.4);
        }

        .card-thumb {
          width: 100%;
          aspect-ratio: 16/10;
          overflow: hidden;
        }

        .card-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .card-content {
          padding: 16px;
        }

        .card-content h4 {
          font-size: 16px;
          font-weight: 600;
          color: white;
          margin-bottom: 8px;
          line-height: 1.4;
        }

        .card-content p {
          font-size: 13px;
          color: #666;
          margin-bottom: 12px;
        }

        .status-badge {
          display: inline-block;
          padding: 4px 10px;
          font-size: 11px;
          font-weight: 500;
          border-radius: 4px;
        }

        .status-badge.published {
          background: #10b98120;
          color: #10b981;
        }

        .status-badge.draft {
          background: #f59e0b20;
          color: #f59e0b;
        }

        .item-actions {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .item-actions button {
          padding: 8px 16px;
          background: #222;
          border: 1px solid #333;
          color: #e5e5e5;
          font-size: 13px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .item-actions button:hover {
          background: #2a2a2a;
        }

        .item-actions button.delete {
          background: #1f1f1f;
          border-color: #ef444440;
          color: #ef4444;
        }

        .item-actions button.delete:hover {
          background: #ef444420;
        }

        .color-dot {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          flex-shrink: 0;
        }

        /* Edit Form */
        .edit-form {
          background: #161616;
          border: 1px solid #2a2a2a;
          border-radius: 12px;
          padding: 24px;
        }

        .edit-form h3 {
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 24px;
          color: white;
        }

        .edit-form h4 {
          font-size: 16px;
          font-weight: 600;
          margin: 24px 0 16px;
          color: white;
        }

        .sub-item {
          display: flex;
          gap: 12px;
          margin-bottom: 12px;
          align-items: center;
        }

        .sub-item input {
          flex: 1;
          padding: 10px 14px;
          background: #1a1a1a;
          border: 1px solid #2a2a2a;
          border-radius: 6px;
          color: #e5e5e5;
          font-size: 13px;
        }

        .sub-item button {
          padding: 10px 14px;
          background: #ef444420;
          border: none;
          color: #ef4444;
          border-radius: 6px;
          cursor: pointer;
        }

        /* Shots */
        .shots-paste-area {
          border: 2px dashed #333;
          border-radius: 16px;
          padding: 24px;
          transition: all 0.2s ease;
        }

        .shots-paste-area:focus-within {
          border-color: #3b82f6;
          background: #1a1a1a;
        }

        .shots-paste-area p {
          text-align: center;
          color: #666;
          font-size: 13px;
          margin-bottom: 24px;
        }

        .shots-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }

        .shot-card-admin {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          aspect-ratio: 16/10;
        }

        .shot-card-admin img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .shot-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 16px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .shot-card-admin:hover .shot-overlay {
          opacity: 1;
        }

        .shot-overlay input {
          margin-bottom: 12px;
          padding: 8px 12px;
          background: #1a1a1a;
          border: 1px solid #333;
          border-radius: 6px;
          color: white;
          font-size: 13px;
        }

        .shot-actions {
          display: flex;
          gap: 8px;
          align-items: center;
          flex-wrap: wrap;
        }

        .shot-actions label {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          color: #888;
        }

        .shot-actions button {
          padding: 6px 12px;
          background: #222;
          border: none;
          color: #e5e5e5;
          font-size: 12px;
          border-radius: 4px;
          cursor: pointer;
        }

        .shot-actions button.delete {
          background: #ef444440;
          color: #ef4444;
        }

        /* Photos Grid */
        .photos-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 16px;
          margin-bottom: 20px;
        }

        .photo-item {
          background: #1a1a1a;
          border: 1px solid #2a2a2a;
          border-radius: 8px;
          overflow: hidden;
        }

        .photo-item img {
          width: 100%;
          height: 150px;
          object-fit: cover;
        }

        .photo-controls {
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .photo-controls input {
          padding: 8px;
          background: #0f0f0f;
          border: 1px solid #2a2a2a;
          border-radius: 4px;
          color: #e5e5e5;
          font-size: 12px;
        }

        .photo-controls button {
          padding: 6px 12px;
          background: #ef444420;
          border: none;
          color: #ef4444;
          font-size: 12px;
          border-radius: 4px;
          cursor: pointer;
        }

        /* Logos List */
        .logos-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .logo-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 12px;
          background: #1a1a1a;
          border: 1px solid #2a2a2a;
          border-radius: 8px;
        }

        .logo-preview {
          width: 80px;
          height: 32px;
          object-fit: contain;
          filter: brightness(0) invert(1);
        }

        .logo-item input {
          flex: 1;
          padding: 8px 12px;
          background: #0f0f0f;
          border: 1px solid #2a2a2a;
          border-radius: 6px;
          color: #e5e5e5;
          font-size: 13px;
        }

        .logo-item button {
          padding: 8px 12px;
          background: #ef444420;
          border: none;
          color: #ef4444;
          border-radius: 6px;
          cursor: pointer;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .sidebar {
            width: 100%;
            height: auto;
            position: relative;
          }

          .main-content {
            margin-left: 0;
          }

          .admin-container {
            flex-direction: column;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
