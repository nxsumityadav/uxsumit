# Sumit Kumar - Product Design Portfolio

Evidence-based product design portfolio built with **React**, **Vite**, and **Framer Motion**. A high-performance, responsive, and visually engaging personal website designed to showcase case studies, design shots, and professional experience.

![Portfolio Preview](/public/images/Shots/portfolio.png)

## 🚀 Key Features

- **Data-Driven Content**: All content (projects, bio, experience) is managed via a single structured data file (`portfolioData.js`), making updates effortless.
- **Rich Case Studies**: Support for complex case study layouts including headers, text blocks, images, lists, tables, and special notes.
- **Performance First**: Built on Vite for lightning-fast HMR and optimized production builds.
- **Smooth Animations**: Integrated `framer-motion` for page transitions, hover effects, and micro-interactions.
- **Responsive Design**: Mobile-first approach ensuring a perfect experience across all devices.
- **Clean Architecture**: Modular component structure for easy maintainability and scalability.

## 🛠️ Tech Stack

- **Framework**: [React](https://reactjs.org/) (v18)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: Modern CSS3 (Variables, Flexbox/Grid)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/) & FontAwesome
- **Routing**: Internal state-based routing for seamless transitions.

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nxsumityadav/uxsumit.git
   cd uxsumit
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### Building for Production

To create a production-ready build:

```bash
npm run build
```

The output will be in the `dist` directory.

## ⚡ Performance Optimization

This project includes automated tools to ensure high performance.

### Image Optimization
We use `sharp` to convert large media assets to WebP format, significantly reducing bundle size (e.g., from ~140MB to ~5MB).

**To optimize new images:**
1. Place high-res images in `public/images/` (or subfolders).
2. Run the optimization script:
   ```bash
   node scripts/optimize-images.js
   ```
3. Update your code to reference the new `.webp` files.
4. (Optional) Archive the originals:
   ```bash
   node scripts/archive-originals.js
   ```

### ☁️ Deployment (Netlify)

This project is configured for Netlify.
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Routing**: A `public/_redirects` file is included to handle Client-Side Routing (SPA), preventing 404 errors on refresh.

## 📂 Project Structure

```
uxsumit/
├── public/                 # Static assets (images, icons)
│   ├── _redirects          # Netlify routing configuration
│   ├── images/             # Optimized images (WebP)
│   └── images/_archive/    # Original heavy images (PNG/JPG) - not deployed
├── scripts/                # Build & Maintenance scripts
│   ├── optimize-images.js  # Converts PNG/JPG to WebP using sharp
│   └── archive-originals.js # Moves processed originals to archive
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── case-studies/   # Case study rendering logic
│   │   ├── common/         # Shared components (Carousel, etc.)
│   │   ├── layout/         # Header, Footer, Layouts
│   │   └── sections/       # Home page sections (Work, About, etc.)
│   ├── data/               # Content Data Source
│   │   ├── case-studies/   # Individual case study data files
│   │   └── portfolioData.js # Main data entry point
│   ├── pages/              # Page components (Home, etc.)
│   ├── App.jsx             # Main App component
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles & specific component styles
└── index.html              # HTML entry point
```

## 🎨 Customization

### Updating Content
Navigate to `src/data/portfolioData.js`. This file contains the "source of truth" for:
- Profile Information
- Experience Timeline
- Shots Gallery
- Hobby Section

### Adding a Case Study
1. Create a new file in `src/data/case-studies/`.
2. Import it into `src/data/portfolioData.js`.
3. Add it to the `workProjects` array.

For detailed documentation, please refer to [DOCUMENTATION.md](./DOCUMENTATION.md).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
