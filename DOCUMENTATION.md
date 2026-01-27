# Portfolio System Documentation

## Table of Contents
1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Design System](#design-system)
4. [Components](#components)
5. [Data Structure](#data-structure)
6. [Admin Panel](#admin-panel)
7. [Styling Guidelines](#styling-guidelines)
8. [Workflow](#workflow)
9. [Deployment](#deployment)

---

## Overview

This portfolio system consists of two main parts:
1. **Portfolio Website** (`src/components/ProfileWithLogos.jsx`) - The public-facing portfolio
2. **Admin Panel** (`src/components/AdminPanel.jsx`) - Content management system

### Key Features
- Real-time content management
- localStorage persistence
- Live preview capability
- Publish/Draft workflow
- Responsive design
- Dark theme throughout

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         PORTFOLIO SYSTEM                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────┐         ┌──────────────────┐                  │
│  │              │         │                  │                  │
│  │  Admin Panel │ ──────▶ │   localStorage   │                  │
│  │              │  saves  │                  │                  │
│  └──────────────┘         └────────┬─────────┘                  │
│                                    │                            │
│                               reads│                            │
│                                    ▼                            │
│                           ┌──────────────────┐                  │
│                           │                  │                  │
│                           │    Portfolio     │                  │
│                           │    Website       │                  │
│                           │                  │                  │
│                           └──────────────────┘                  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Data Flow
1. Admin makes changes in the Admin Panel
2. Changes are saved to localStorage with key `portfolio_admin_data`
3. A custom event `portfolioDataUpdate` is dispatched
4. Portfolio website listens for this event and updates in real-time
5. On page load, portfolio reads from localStorage

---

## Design System

### Color Palette

```css
/* Primary Colors */
--bg-primary: #1a1a1a;       /* Main background */
--bg-secondary: #161616;      /* Card backgrounds */
--bg-tertiary: #252525;       /* Elevated elements */

/* Text Colors */
--text-primary: #ffffff;      /* Headings, important text */
--text-secondary: #9ca3af;    /* Body text */
--text-muted: #6b7280;        /* Subtle text, labels */

/* Accent Colors */
--accent-brand: #3b82f6;       /* Brand accent (Spreetail) */
--accent-green: #22c55e;      /* Online status */
--accent-blue: #2563eb;       /* Links, buttons */

/* Status Colors */
--status-published: #10b981;  /* Published items */
--status-draft: #f59e0b;      /* Draft items */
--status-error: #ef4444;      /* Errors, delete */

/* Border Colors */
--border-default: #2a2a2a;    /* Default borders */
--border-hover: #4b5563;      /* Hover state borders */
```

### Typography

```css
/* Font Families */
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
--font-mono: 'IBM Plex Mono', monospace;
--font-admin: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;

/* Font Sizes */
--text-xs: 13px;    /* Labels, metadata */
--text-sm: 14px;    /* Body small */
--text-base: 16px;  /* Body default */
--text-lg: 18px;    /* Body large */
--text-xl: 22px;    /* Subheadings */
--text-2xl: 24px;   /* Section titles */
--text-3xl: 28px;   /* Page headings */
--text-4xl: 48px;   /* Hero titles */

/* Font Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Spacing Scale

```css
/* Spacing (based on 4px grid) */
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;
--space-30: 120px;
```

### Border Radius

```css
--radius-sm: 4px;    /* Small elements */
--radius-md: 8px;    /* Buttons, inputs */
--radius-lg: 12px;   /* Cards */
--radius-xl: 16px;   /* Large cards, avatars */
--radius-full: 9999px; /* Pills, circular elements */
```

---

## Components

### Portfolio Components

#### 1. Profile Section
```jsx
<div className="profile-card">
  <Avatar />
  <Name />
  <Title />           /* Uses IBM Plex Mono */
  <Bio />
  <ActionButtons />
</div>
```

#### 2. Logos Carousel
```jsx
<LogosCarousel heading="Trusted by these companies">
  /* Auto-scrolling infinite loop */
  /* Pauses on hover */
  /* Fade edges on left/right */
</LogosCarousel>
```

#### 3. Tab Navigation
```jsx
<TabNavigation>
  <Tab id="shots" />       /* Design shots & video grid */
  <Tab id="work" />        /* Case Studies */
  <Tab id="experiences" /> /* Timeline experiences */
  <Tab id="about" />       /* About section */
</TabNavigation>
```

#### 4. Work Projects
- Card layout with thumbnail
- Click to open detail view
- Shows: title, read time, date
- Detail view includes: back button, content, sub-projects

#### 5. Experiences Timeline
```jsx
<Experience>
  <Period />           /* Left column: MAY-JULY 2023 */
  <Content>            /* Right column */
    <Role /> at <Company />
    <Description />
  </Content>
</Experience>
```

#### 6. Hobby Section
- Stacked/fanned photo cards
- Rotation animations
- "See all" link
- Camera info footer

#### 7. Contact Section
- Music player widget
- Social links (Email, LinkedIn, Behance)
- Arrow icons for external links

#### 8. Footer
- Signature SVG
- Name
- Location with icon
- Weather with icon

---

## Data Structure

### Complete Data Schema

```javascript
{
  profile: {
    name: String,
    title: String,
    bio: String,
    avatar: String (URL),
    isOnline: Boolean,
    company: {
      name: String,
      color: String (hex)
    },
    location: String,
    weather: String
  },
  
  socialLinks: {
    email: String,
    linkedin: String,
    behance: String,
    dribbble: String,
    medium: String,
    resume: String,
    cal: String
  },
  
  trustedCompanies: {
    heading: String,
    logos: [{
      id: String,
      name: String,
      image: String (URL)
    }]
  },
  
  workProjects: [{
    id: String/Number,
    title: String,
    image: String (URL),
    readTime: String,
    wordCount: Number,
    date: String,
    published: Boolean,
    content: {
      intro: [String],
      projectsTitle: String,
      projects: [{
        name: String,
        description: String,
        image: String (URL)
      }]
    }
  }],
  
  experiences: [{
    id: String/Number,
    company: String,
    companyColor: String (hex),
    role: String,
    period: String,
    description: String,
    published: Boolean
  }],
  
  shots: [{
    id: String/Number,
    title: String,
    image: String (URL),
    published: Boolean
  }],
  
  about: {
    paragraphs: [String]
  },
  
  hobby: {
    label: String,
    description: String,
    photos: [{
      id: String/Number,
      image: String (URL),
      rotation: Number (degrees)
    }],
    cameraInfo: String
  },
  
  currentlyPlaying: {
    title: String,
    artist: String,
    artwork: String (URL),
    link: String (URL)
  }
}
```

---

## Admin Panel

### Sections

| Section | Description | Actions |
|---------|-------------|---------|
| Dashboard | Overview stats, quick actions | View stats, navigate |
| Profile | Personal info, avatar | Edit all fields |
| Work Projects | Case studies | CRUD, publish/unpublish |
| Experiences | Work history | CRUD, publish/unpublish |
| Shots | Design gallery | CRUD, publish/unpublish |
| About | Bio paragraphs | Add/edit/remove |
| Hobby | Personal section | Edit text, manage photos |
| Social Links | Contact info | Edit URLs |
| Now Playing | Music widget | Edit song info |
| Companies | Logo carousel | Add/remove logos |

### Admin UI Components

```
┌─────────────────────────────────────────────────────────────────┐
│ ┌──────────┐  ┌──────────────────────────────────────────────┐ │
│ │          │  │                                              │ │
│ │ Sidebar  │  │              Main Content Area               │ │
│ │          │  │                                              │ │
│ │ - Nav    │  │  ┌────────────────────────────────────────┐  │ │
│ │ - Items  │  │  │         Section Header                 │  │ │
│ │          │  │  │  Title              [+ Add Button]     │  │ │
│ │          │  │  └────────────────────────────────────────┘  │ │
│ │          │  │                                              │ │
│ │          │  │  ┌────────────────────────────────────────┐  │ │
│ │          │  │  │         Content List/Grid              │  │ │
│ │          │  │  │                                        │  │ │
│ │          │  │  │  [Item Card]  [Item Card]              │  │ │
│ │          │  │  │  [Item Card]  [Item Card]              │  │ │
│ │          │  │  │                                        │  │ │
│ │          │  │  └────────────────────────────────────────┘  │ │
│ │          │  │                                              │ │
│ └──────────┘  └──────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

---

## Styling Guidelines

### CSS Organization

```css
/* 1. Reset & Base */
* { margin: 0; padding: 0; box-sizing: border-box; }

/* 2. Layout Components */
.page-container { }
.section { }
.grid { }

/* 3. Typography */
.heading { }
.text { }
.label { }

/* 4. Components */
.card { }
.button { }
.input { }

/* 5. Utilities */
.flex { }
.hidden { }

/* 6. Responsive */
@media (max-width: 640px) { }
```

### Animation Patterns

```css
/* Transitions */
transition: all 0.2s ease;        /* Fast interactions */
transition: all 0.3s ease;        /* Standard transitions */
transition: transform 0.3s ease;  /* Movement */

/* Hover Effects */
.card:hover {
  transform: translateY(-4px);
}

/* Focus States */
input:focus {
  outline: none;
  border-color: var(--accent-blue);
}
```

### Responsive Breakpoints

```css
/* Mobile first approach */
/* Base styles for mobile */

/* Tablet */
@media (min-width: 640px) { }

/* Desktop */
@media (min-width: 1024px) { }

/* Large desktop */
@media (min-width: 1280px) { }
```

---

## Workflow

### Content Update Workflow

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Open      │───▶│   Make      │───▶│   Preview   │
│   Admin     │    │   Changes   │    │   Changes   │
└─────────────┘    └─────────────┘    └──────┬──────┘
                                             │
                   ┌─────────────┐           │
                   │   Publish   │◀──────────┘
                   │   Content   │
                   └──────┬──────┘
                          │
                          ▼
                   ┌─────────────┐
                   │   Live on   │
                   │   Website   │
                   └─────────────┘
```

### Development Workflow

1. **Setup**
   ```bash
   # Clone/download files
   # Install dependencies if using npm
   npm install react react-dom
   ```

2. **Development**
   ```bash
   # Start development server
   # Open portfolio and admin in separate tabs
   ```

3. **Testing**
   - Test all CRUD operations
   - Test responsive design
   - Test data persistence

4. **Build**
   ```bash
   npm run build
   ```

---

## Deployment

### Files to Deploy

```
/portfolio
├── index.html          # Portfolio entry point
├── admin.html          # Admin entry point
├── profile-with-logos.jsx
├── admin-panel.jsx
└── assets/
    └── (any static assets)
```

### Environment Considerations

1. **localStorage** - Works in all modern browsers
2. **No backend required** - Pure frontend solution
3. **Cross-tab sync** - Uses custom events for real-time updates

### Production Checklist

- [ ] All images use HTTPS URLs
- [ ] localStorage is available
- [ ] Responsive design tested
- [ ] All links working
- [ ] Meta tags configured
- [ ] Favicon added

---

## API Reference

### localStorage Keys

| Key | Description |
|-----|-------------|
| `portfolio_admin_data` | Main data store for all portfolio content |

### Custom Events

| Event | Description | Payload |
|-------|-------------|---------|
| `portfolioDataUpdate` | Fired when admin saves changes | `{ detail: portfolioData }` |

### Utility Functions

```javascript
// Load data from localStorage
const loadData = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : defaultData;
};

// Save data to localStorage
const saveData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  window.dispatchEvent(new CustomEvent('portfolioDataUpdate', { detail: data }));
};

// Generate unique ID
const generateId = () => Date.now() + Math.random().toString(36).substr(2, 9);
```

---

## Troubleshooting

### Common Issues

1. **Data not persisting**
   - Check if localStorage is available
   - Check browser privacy settings
   - Clear cache and try again

2. **Changes not showing on portfolio**
   - Refresh the portfolio page
   - Check if published flag is true
   - Verify localStorage key matches

3. **Images not loading**
   - Verify URLs are correct
   - Check for CORS issues
   - Use HTTPS URLs only

4. **Styling issues**
   - Check CSS specificity
   - Verify media queries
   - Test in different browsers

---

## Future Enhancements

- [ ] Add image upload (base64 or cloud storage)
- [ ] Add drag-and-drop reordering
- [ ] Add undo/redo functionality
- [ ] Add export/import JSON
- [ ] Add multi-language support
- [ ] Add dark/light theme toggle
- [ ] Add analytics dashboard
- [ ] Add SEO meta editing
- [ ] Add password protection for admin

---

## Credits

- **Design**: Sumit Kumar's portfolio design
- **Icons**: Lucide Icons (SVG)
- **Fonts**: Google Fonts (Inter, IBM Plex Mono, DM Sans)
- **Images**: Unsplash (placeholder images)

---

*Documentation Version: 1.0*
*Last Updated: January 2025*
