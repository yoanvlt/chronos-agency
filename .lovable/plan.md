

# TimeTravel Agency — Interactive MVP

## Overview
An immersive, futuristic web app for a fictional time travel agency featuring 3 temporal destinations, an AI chat assistant, and a personality quiz. Built with React, TypeScript, Tailwind CSS, and React Router.

---

## Pages & Navigation

### 1. Landing Page (`/`)
- **Hero section** with animated gradient background and particle-like effects
- Tagline: "Voyagez dans le temps. Vivez l'histoire."
- Two CTAs: "Choisir une destination" → `/destinations` and "Passer le quiz" → `/quiz`
- Sleek futuristic navbar with links to all sections
- Brief teaser cards for the 3 destinations

### 2. Destinations Page (`/destinations`)
- 3 interactive cards with hover animations
- Each card shows: image placeholder, name, period, short pitch, tags (Culture, Danger, Art, etc.)
- Click navigates to the detail page

### 3. Destination Detail Pages (`/destinations/:slug`)
- Dynamic route rendering from local data file
- Sections: "À propos", "Activités", "Conseils & sécurité", "Prix"
- Duration options displayed as selectable chips
- CTA button "Parler à un agent" → `/chat`

### 4. Chat Page (`/chat`)
- Messaging-style UI with chat bubbles
- Pre-filled suggestion chips ("Quel budget ?", "Risques ?", "Meilleure saison ?")
- Simulated AI responses — professional, warm, history-passionate tone
- Responses are client-side placeholders with comments showing where to connect a real AI API later

### 5. Quiz Page (`/quiz`)
- 5 multiple-choice questions (danger level, interests, duration, budget, preference)
- Step-by-step flow with progress indicator
- Results screen showing: recommended destination, 3-step mini-itinerary, CTAs to destination page and chat

---

## Data
- All 3 destinations stored in a local `data/destinations.ts` file
- Each destination includes: slug, name, period, location, shortPitch, longDescription, activities, warnings, price, durationOptions, image, tags
- **Paris 1889** — Exposition universelle, Belle Époque
- **Crétacé** — Dinosaurs, guided expedition, high danger
- **Florence 1504** — Renaissance, art workshops, political intrigue

---

## Design & UX
- **Theme**: Futuristic premium agency (dark background, glowing accents, smooth gradients)
- Mobile-first, fully responsive
- Subtle animations on hover, page transitions, and interactive elements
- Consistent navigation header across all pages

---

## README
- Updated with project description, available routes, where to configure AI API key, and how to run locally

