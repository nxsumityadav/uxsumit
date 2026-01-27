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

### Brand Colors (Examples)
| Name | Hex Code | Usage |
|------|----------|-------|
| **Spreetail Blue** | `#3b82f6` | Comapny Icon Background |
| **Adaapt Green** | `#10b981` | Comapny Icon Background |
| **Kolo Amber** | `#f59e0b` | Comapny Icon Background |

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
| **Section Heading** | `20px` | 600 (SemiBold) | - |
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

- **Cards (Projects/Shots)**: `16px`
- **Buttons / Pills**: `9999px` (Full rounding)
- **Icons / Logos**: `4px` (Slight rounding) or `Circular`
- **About Photo**: `16px`

---

## 5. Components

### Buttons & Chips
- **Tab Chip**:
  - Border: `1.5px solid #4b5563`
  - Active State: Background `#ffffff`, Text `#1a1a1a`
  - Inactive State: Transparent Background, Text `#ffffff`
  - Hover: Border color lighter `#6b7280`

### Cards
- **Project Card**:
  - Layout: Thumbnail Image + Title/Meta below
  - Hover Effect: Scale `1.02`
- **Shot Card**:
  - Aspect Ratio: `16/10`
  - Background: `#0a0a0a`
  - Hover Effect: Translate Y `-4px`, Tooltip Reveal

### Experience Item
- **Layout**: Time Period (Left) + Content (Right) [Grid on Desktop]
- **Company Icon**: `24px x 24px` circle/rounded square with brand color background.

### Navigation
- **Back Button**:
  - Font: Mono
  - Icon: Arrow Up Right (Rotated)
  - Hover: Color shift to White

---

## 6. Motion & Animation

- **Transitions**: `0.2s - 0.3s ease` for hover states.
- **Signature Reveal**: Custom keyframe animation (`signReveal`) with `2s cubic-bezier(0.16, 1, 0.3, 1)`.
- **Logos Carousel**: Continuous linear scrolling using `requestAnimationFrame`.

---

## 7. Mobile & Responsiveness

### Breakpoints
- **Mobile**: `max-width: 640px`

### Behaviors
- **Project Cards**: 
  - Layout: Stacked -> Row (Title and Meta aligned horizontally).
  - Truncation: Project titles truncate with ellipsis (...) if they exceed the available width, ensuring the read time/meta data remains visible and aligned to the right.
- **Tabs**: Horizontally scrollable container with left alignment.
- **Footer**: Stacked elements become row-aligned (Location | Weather) with `space-between`.
