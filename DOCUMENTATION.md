# Portfolio Documentation

This documentation provides an in-depth guide to understanding, managing, and extending the portfolio codebase. The project is designed to be **data-driven**, meaning most content updates can be made by modifying JSON-like data structures without touching the core UI components.

## 📚 Content Management

All dynamic content is managed within the `src/data/` directory.

### 1. Main Data File (`src/data/portfolioData.js`)

This file exports the `portfolioData` object, which acts as the central database for the site.

**Structure:**
- **`profile`**: Personal details (Name, Bio, Avatar, Location).
- **`socialLinks`**: URLs for your social profiles (LinkedIn, Behance, Email).
- **`trustedCompanies`**: Configuration for the logo carousel (Heading + Array of logos).
- **`workProjects`**: Array of case studies (imported from `case-studies/`).
- **`experiences`**: Timeline of your professional history.
- **`shots`**: Array of design shots (Images/Videos) for the grid view.
- **`about`**: Paragraphs for the "About" tab.
- **`hobby`**: Configuration for the "When I am not working" section (Photography stack).
- **`currentlyPlaying`**: Data for the footer music widget.

### 2. Managing Case Studies

Case studies are modularized in `src/data/case-studies/`. This keeps the main data file clean.

#### Adding a New Case Study:

1.  **Create a File**: Create `src/data/case-studies/my-new-project.js`.
2.  **Define Structure**:
    ```javascript
    export const myNewProject = {
        id: 4,
        slug: "my-new-project",
        title: "Project Title",
        image: "/images/Projects/cover.png",
        readTime: "5 m",
        wordCount: 1200,
        date: "JAN 2026",
        published: true,
        content: {
            // "sections" allows for rich content rendering
            sections: [
                { type: "image", src: "...", alt: "..." },
                { type: "heading", content: "The Challenge" },
                { type: "text", content: ["Paragraph 1", "Paragraph 2"] },
                { type: "note", content: "This is a highlighted note." },
                { type: "list", items: ["Point A", "Point B"] }
                // ... convert existing content formats like 'table' as well
            ]
        }
    };
    ```
3.  **Register It**:
    In `src/data/portfolioData.js`:
    ```javascript
    import { myNewProject } from './case-studies/my-new-project';
    
    // ... inside portfolioData object
    workProjects: [
        saasMetrics,
        referralStack,
        myNewProject // Add it here
    ],
    ```

#### Supported Content Types:
The `ProjectDetail` component supports a variety of section types for rich storytelling:
- **`heading`**: `<h3>` Section headers.
- **`subheading`**: `<h4>` Sub-headers.
- **`text`**: Paragraphs. Supports markdown-style bolding (e.g., `**bold text**`).
- **`image`**: Full-width images with optional captions.
- **`list`**: Bulleted lists.
- **`table`**: Data tables with headers.
- **`note`**: Styled blockquote for emphasis or disclaimers.

### 3. Updates to Other Sections

- **Hobby**: Add photos to `hobby.photos`. Ensure `rotation` values are varied for a natural "stack" look.

---

## ⚡ Media Optimization Workflow

To maintain high performance, we strictly use optimized **WebP** images for all static assets.

### 1. The Problem
High-fidelity design portfolios often suffer from large asset sizes (20MB+ PNGs). This kills load time and UX.

### 2. The Solution
We implemented a two-step node script workflow to automate optimization:

#### A. Optimization Script (`scripts/optimize-images.js`)
- Scans `public/images` recursively.
- Detects `.png`, `.jpg`, `.jpeg`.
- Converts them to `.webp` with 80% quality (visually lossless).
- Resizes extremely large images (max width 1920px).
- **Usage**: `node scripts/optimize-images.js`

#### B. Archival Script (`scripts/archive-originals.js`)
- After optimization, this script checks if a `.webp` version exists.
- If verified, it moves the original heavy file to `public/images/_archive`.
- This keeps the production build light while preserving original source files for future edits.
- **Usage**: `node scripts/archive-originals.js`

### 3. Usage in Code
ALWAYS reference `.webp` files in your React components and data files.

```javascript
// ✅ CORRECT
image: "/images/Projects/cover.webp"

// ❌ INCORRECT (File will not be found in production if archived)
image: "/images/Projects/cover.png"
```

---

## 🏗️ Architecture & components

### Core Layout
- **`App.jsx`**: Main wrapper. Handles global routes (though currently single-page focused).
- **`Home.jsx`**: The orchestrator. Manages state for:
  - Active Tab (`activeTab`: 'work', 'shots', 'experiences', 'about').
  - Selected Project (`selectedProject`): If set, renders `ProjectDetail`; otherwise renders `Home`.
- **`ProfileHeader.jsx`**: Displays avatar, validation badge, bio, and social links.

### Key Components
- **`ProjectDetail.jsx`**: The dynamic page for rendering case studies. It takes a `project` object and recursively renders its content based on the `type` field in `sections`.
- **`WorkSection.jsx`**: Displays the grid of project cards with hover effects.
- **`ShotsSection.jsx`**: Grid layout for design shots.
- **`LogosCarousel.jsx`**: Infinite scroll animation for partner logos.

### Styling
- **`index.css`**: Contains global styles, reset, and styles for many specific components.
- **Inline Styles**: Some dynamic layout styles (like hover animations or specific widths) are handled inline or via styled-components patterns where necessary.
- **Framer Motion**: Used extensively for page transitions and micro-interactions (e.g., `initial`, `animate`, `exit` props).

---

## 🚀 Deployment

Since this is a static React application, deployment is straightforward.

### Vercel / Netlify
1. Connect your GitHub repository.
2. Set the **Build Command** to: `npm run build`
3. Set the **Output Directory** to: `dist`
4. Deploy.

### GitHub Pages
1. Install `gh-pages` package.
2. Add a `base` in `vite.config.js` if deploying to a subdirectory.
3. Build and deploy the `dist` folder.

---

## 🎨 Design System

For detailed information on colors, typography, spacing, and design tokens, please refer to the dedicated [Design System](./docs/DESIGN_SYSTEM.md) document.
