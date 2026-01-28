# Design System

This document outlines the design system used in the portfolio website, including colors, typography, spacing, radius, and core components.

## 1. Colors

The color palette is primarily monochromatic, using shades of gray and black/white, with specific brand colors used for logos and accents.

### Core Palette
| Name | Hex Code | Usage |
|------|----------|-------|
| **Background** | `#1a1a1a` | Main page background |
| **Card Background** | `#0a0a0a` | Project and Shot cards |
| **White** | `#ffffff` | Primary text, Headings, Icons |
| **Gray 400** | `#9ca3af` | Secondary text, Descriptions |
| **Gray 500** | `#6b7280` | Tertiary text, Dates, Metadata |
| **Border** | `#4b5563` | Borders, Separators |
| **Success** | `#22c55e` | Online Status Indicator |

### Brand Colors (Examples)
| Name | Hex Code | Usage |
|------|----------|-------|
| **Spreetail Blue** | `#3b82f6` | Company Icon Background |
| **Adaapt Green** | `#10b981` | Company Icon Background |
| **Kolo Amber** | `#f59e0b` | Company Icon Background |
| **Taiyary Pink** | `#FF385C` | Company Icon Fill |

---

## 2. Typography

Two primary font families are used to create a distinct visual hierarchy.

### Font Families
- **Primary (UI/Body)**: `'Inter', sans-serif`
  - Usage: Headings, body text, buttons, general UI.
- **Secondary (Data/Mono)**: `'IBM Plex Mono', monospace`
  - Usage: Dates, read times, word counts, metadata tags, back buttons.

### Scale & Weights
| Role | Size | Weight | Line Height |
|------|------|--------|-------------|
| **Display Heading** | `48px` | 700 (Bold) | `1.15` |
| **Section Heading** | `32px` | 600 (SemiBold) | - |
| **Subheading** | `24px` | 500 (Medium) | - |
| **Body Large** | `20px` | 400 (Regular) | `1.7` |
| **Body Medium** | `16px` | 400 (Regular) | `auto` |
| **Body Small** | `13px` | 400 (Regular) | `auto` |
| **Caption/Mono** | `12-13px` | 400/500 | `auto` |

---

## 3. Spacing & Layout

The system uses a consistent spacing scale to ensure breathing room and visual rhythm.

### Container
- **Max Width**: `900px` (Main Content)
- **Padding**: `40px 20px 80px` (Page Container)

### Grid Gaps
- **Standard Gap**: `24px` (Project Cards, Shots Grid)
- **Small Gap**: `12px` (Experience Items, Badges)
- **Section Margin**: `80px - 120px` (Between major sections)
- **Component Margin**: `48px` (Between paragraphs/items)

---

## 4. Radius (Border Radius)

Consistent rounding is applied to UI elements to create a friendly yet professional feel.

- **Cards (Projects/Shots)**: `16px` - `20px`
- **Buttons / Pills**: `9999px` (Full rounding)
- **Icons / Logos**: `4px` (Slight rounding) or `Circular`
- **Avatar**: `16px`
- **Tables**: `12px`

---

## 5. Components

### Buttons & Chips
- **Tab Chip**:
  - Border: `none`
  - Background: `rgba(255, 255, 255, 0.05)`
  - Active State: Background `#ffffff`, Text `#1a1a1a`
  - Hover: Background lighter `rgba(255, 255, 255, 0.1)`

### Cards
- **Project Card**:
  - Layout: Thumbnail Image + Title/Meta below
  - Hover Effect: Thumbnail Scale `1.02`
- **Shot Card**:
  - Aspect Ratio: `4/3`
  - Background: `#262626`
  - Hover Effect: Image Scale `1.05`, Rotate `2deg`, Tooltip Reveal

### Rich Content Blocks (Case Studies)
- **Note Block**:
  - Style: Left border `3px solid #4b5563`, Padding Left `20px`
  - Text: Italicized, Gray 400
- **Data Table**:
  - Headers: Uppercase, Mono, Dark Background (`#1a1a1a`)
  - Borders: `#333` dividers

### Navigation
- **Back Button**:
  - Font: Mono
  - Icon: Arrow Up Right (Rotated -135deg)
  - Hover: Color shift to White

---

## 6. Motion & Animation

- **Transitions**: `0.2s - 0.4s ease` for hover states.
- **Page Transitions**: `framer-motion` variants using `opacity`, `y` position, and `blur` filters.
- **Logos Carousel**: Continuous linear scrolling using CSS `@keyframes` or `requestAnimationFrame`.

---

## 7. Mobile & Responsiveness

### Breakpoints
- **Mobile**: `max-width: 640px`

### Behaviors
- **Project Cards**: 
  - Layout: Stacked -> Row (Title and Meta aligned horizontally).
- **Tabs**: Horizontally scrollable container with left alignment.
- **Tables**: Horizontally scrollable container with fixed min-width to prevent squishing.
- **Footer**: Stacked elements become row-aligned (Location | Weather) with `space-between`.
