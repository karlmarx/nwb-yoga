# NWB Yoga

A Progressive Web App (PWA) for non-weight-bearing yoga practice, designed around a **left femoral neck stress fracture protocol**. The app enforces a strict NWB constraint — the left leg is always passive — while delivering a complete, structured yoga practice with animated pose breakdowns.

## What It Does

NWB Yoga provides three timed practice tiers, each with curated sections, poses, and safety cues:

| Tier | Duration | Focus |
|------|----------|-------|
| **Prana** | 25 min | Breath & Restore — pranayama-heavy, gentle mobility, supported inversions. For recovery days or low-energy. |
| **Tapas** | 45 min | Strength & Flow — upper body vinyasa, parallette work, inversions, and seated flexibility. Standard daily practice. |
| **Agni** | 70 min | Full Practice — Ashtanga-inspired, comprehensive pranayama, advanced parallette series, deep inversion work, primary series adaptations. |

Each pose card includes hold time / breath cues, practitioner notes explaining the NWB adaptation, props required, safety callouts, and inline animated diagrams for key poses.

### Key Medical Constraint

- Zero active left hip flexor (iliopsoas) recruitment throughout
- Left leg is always passive or guided into position by hand
- All poses explain *why* the modification is safe
- Crow / tuck planche and other bilateral hip-flexor moves are explicitly contraindicated

### Animated Pose Library

The Pose Guide view provides a full animation reference using HTML5 Canvas 2D with `requestAnimationFrame`, color-coded:
- **Dark** — active structures / right-side limbs
- **Red** — left leg (passive)
- **Green** — glute activation

Included animations: `tabletop`, `transition`, `plank`, `chaturanga`, `updog`, `downdog`, `dolphin`, `threadneedle`, `lsit`, `pseudoplanche`, `headstand`, `inversion`, `cars`, `navasana_mod`.

### App Features

- Built-in **pose timer** with hold-time parsing from text descriptions
- **Bell sound** (synthesized 528 Hz + 396 Hz) on timer completion via Web Audio API
- **Screen Wake Lock** — screen stays on during practice
- Two views: **Practice** (routine with inline animations) and **Pose Guide** (full animation reference)
- Touch swipe support for multi-animation poses on mobile
- Offline-capable via service worker
- Installable as a standalone PWA

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18.2 |
| Build tool | Vite 5.4 |
| Language | JSX (ES Modules) |
| Animation | HTML5 Canvas 2D, `requestAnimationFrame` |
| Audio | Web Audio API (synthesized bell) |
| PWA | Service Worker, Web App Manifest |
| Deployment | Vercel (auto-deploy from `main`) |

No CSS frameworks, no routing library, no state management library — single-file component architecture.

## Prerequisites

- Node.js 18+
- npm 9+

## Installation

```bash
git clone https://github.com/karlmarx/nwb-yoga.git
cd nwb-yoga
npm install
```

## Running

```bash
# Development
npm run dev        # http://localhost:5173

# Production build
npm run build      # output to dist/

# Preview production build
npm run preview
```

## Project Structure

```
nwb-yoga/
├── index.html              # App shell
├── vite.config.js
├── vercel.json
├── public/
│   ├── manifest.json       # PWA manifest
│   ├── sw.js               # Service worker
│   └── icon.svg
└── src/
    ├── main.jsx            # Entry point + service worker registration
    ├── App.jsx             # All UI components: PoseCanvas, PoseCard, Section, App
    ├── data.js             # Three practice tiers with all sections and poses
    └── animations.js       # 14 animated pose definitions
```

## Deployment

Auto-deploys to Vercel from `main`. Purely static — no server-side logic.

## PWA / Offline Usage

Install on mobile via "Add to Home Screen" in Chrome (Android) or Safari (iOS). Launches in standalone mode and works offline after first load.

The service worker uses network-first for HTML navigation and cache-first for hashed JS/CSS assets.

## Medical Disclaimer

This app is a personal tool designed around a specific clinical protocol (left femoral neck stress fracture, NWB phase). It is not general medical advice. Consult your physician or physical therapist before following any protocol described here.
