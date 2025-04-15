# VietRocHack Website

Official website for VietRocHack, a Vietnamese hackathon team composed of students from the University of Rochester.

## Project Overview

The VietRocHack website serves as a public portfolio to showcase the team, their projects, hackathon achievements, and long-term vision. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Responsive design that works across desktop, tablet, and mobile
- Dark theme with accent colors
- Interactive animations and hover effects
- Component-based architecture for easy maintenance and scalability

## UI Component Library

The project includes a comprehensive UI component library:

### Core Layout Components

- **Layout**: Page wrapper with consistent header and footer
- **Container**: Content container with responsive padding and max-width

### Navigation Components

- **Navbar**: Responsive navigation bar with active link detection
- **Footer**: Multi-column footer with links, social media, and contact button

### UI Elements

- **Button**: Multi-variant button component with animations
  - Variants: primary (red), secondary (cyan), ghost
  - Sizes: sm, md, lg
  - Interactive states: hover, active, disabled
  - Hover animations: pulsing, glowing, shimmering effects

- **Card**: Multi-variant card component with hover effects
  - Variants: default, project, team, zoom
  - Dynamic hover effects per variant
  - Shadow and transform animations

### Animation System

Custom animation system built with CSS and Tailwind extensions:
- Pulsing effects for primary buttons
- Glowing effects for secondary buttons
- Shine/reveal effects for ghost buttons
- Lift and glow effects for cards
- Consistent animation timings and durations

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Development

The `/dev/components` page provides a showcase of all UI components for easy reference and design iteration.

## Color Scheme

- Background: #0F0F0F (primary), #121212 (secondary)
- Text: #F4F4F5 (primary), #A1A1AA (secondary)
- Accents:
  - Red: #FF3C38
  - Yellow: #FFDC00
  - Cyan: #22D3EE

## Typography

- Font: Space Grotesk (Google Fonts)
- Headings: font-weight 600–700
- Body: font-weight 400

## Project Structure

```
/src
  /app - Next.js app directory
    /dev - Development pages
      /components - Component showcase
    /globals.css - Global styles and CSS variables
    /layout.tsx - Root layout
    /page.tsx - Homepage
  /components - Reusable components
    /Button.tsx
    /Card.tsx
    /Container.tsx
    /Footer.tsx
    /Layout.tsx
    /Navbar.tsx
/public - Static assets
```

## License

All rights reserved.
