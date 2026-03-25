# CLAUDE.md

## Project Overview

NWB Yoga — a PWA for non-weight-bearing yoga practice, designed around a left femoral neck stress fracture protocol. Three tiers (Prana 25min / Tapas 45min / Agni 70min) with animated pose breakdowns showing why each modification is safe.

## Development

- Vite + React 18.2 (JSX)
- `npm run dev` for local development
- `npm run build` for production build
- Deployed on Vercel (auto-deploy from main)

## Architecture

- `src/App.jsx` — All UI components (PoseCanvas, PoseCard, Section, AnimationGuide, App)
- `src/data.js` — TIERS data (three difficulty tiers with sections and poses)
- `src/animations.js` — Canvas drawing utilities and animated pose definitions (8 poses)
- Two views: **Practice** (routine with inline animations) and **Pose Guide** (full animation reference)

## Key Constraints

- Strict NWB left leg — zero active left hip flexor (iliopsoas) recruitment
- Left leg is always passive/trailing in all poses
- Animations use HTML5 Canvas 2D with requestAnimationFrame
- Color coding: dark = active structures, red = left leg (passive), green = glute activation
- Mobile-first design for use during practice on phone
- PWA with offline support
