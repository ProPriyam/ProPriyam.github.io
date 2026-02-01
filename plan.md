# 🎮 Finding My Valentine.exe - Implementation Plan

## Overview

A hidden pixel art side-scrolling platformer game that ends with a Valentine's Day ask. Accessible via Konami code (↑↑↓↓←→←→BA) from anywhere on the site, or directly at `/will-you-be-my-valentine`.

---

## 📁 Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `src/pages/will-you-be-my-valentine.astro` | **CREATE** | Complete self-contained game page |
| `src/layouts/BaseLayout.astro` | **MODIFY** | Add Konami code listener script |
| `public/valentine/valentine.png` | **USER ADDS** | Her photo (will be auto-pixelated) |

---

## 🎯 Game Specifications

### Technical Details
- **Canvas Size:** 800x500 pixels (scales responsively)
- **Frame Rate:** 60 FPS game loop
- **Controls:** Arrow keys or WASD (Left/Right/Jump)
- **Audio:** Web Audio API generated (no external files)
- **Sprites:** All drawn programmatically with Canvas API

### Player Character
- Size: 32x32 pixels
- Colors: Blue body, skin tone face
- Idle animation: Subtle bounce
- States: Standing, walking, jumping

### Physics
- Gravity: 0.5 per frame
- Jump strength: -12
- Move speed: 5
- Ground level: Dynamic per level

---

## 🧩 Level Design

### Level 1: "The Start of the Quest"
- **Background:** Pastel pink/green meadow gradient with pixel flowers
- **Ground:** Green grass platform
- **Obstacles:**
  - Overthinking Cloud (☁️) - Floating gray cloud, player jumps over
  - Wrong Timing Rock (🪨) - Static obstacle on ground
- **Collectibles:** 3 floating hearts
- **Story Text:**
  - Intro: "One day, I realized something was missing…"
  - End: "Okay… I should probably go find her."

### Level 2: "Doubts & Distractions"
- **Background:** Orange/purple sunset city skyline
- **Ground:** Gray concrete platform
- **Obstacles:**
  - Notification popups (📱) - Bouncing rectangles with "!" marks
  - NPC character saying "You sure about this?" (can't say no)
- **Collectibles:** 4 floating hearts
- **Story Text:**
  - Intro: "The world had distractions… but only one destination."
  - End: "Yeah. Definitely worth it."

### Level 3: "Almost There"
- **Background:** Dark blue night sky with twinkling stars
- **Ground:** Cloud/ethereal platform
- **Obstacles:**
  - Self-Doubt Monster - Big scary looking pixel monster that:
    - Looks intimidating (red eyes, dark colors)
    - Does absolutely nothing
    - Disappears with sparkle effect when touched
- **Collectibles:** 5 floating hearts
- **Story Text:**
  - Intro: "What if she says no?"
  - End: "Oh. That wasn't so bad."

### Level 4: "Found You" (Final)
- **Background:** Warm cozy room with heart-shaped decorations
- **No obstacles** - Pure reveal scene
- **Elements:**
  - Her photo fades in (auto-pixelated)
  - Floating hearts animation around photo
  - Soft glow effect
- **Story Text:**
  - "Quest complete."
  - "Will you be my Valentine? 💕"
- **Buttons:**
  - "Yes 💖"
  - "Yes (but louder) 💖"
- **Victory Screen:**
  - "Thank you for playing."
  - "Date unlocked: Feb 14 💘"
  - Confetti/hearts explosion

---

## 🎵 Audio System (Web Audio API)

All sounds generated programmatically - no external files needed!

| Sound | Trigger | Description |
|-------|---------|-------------|
| `jump` | Space/Up/W pressed | Quick ascending blip (200Hz → 400Hz) |
| `collect` | Heart collected | Happy chime (440Hz + 880Hz) |
| `levelComplete` | Reach end of level | Ascending arpeggio |
| `victory` | Final reveal | Sparkle fanfare |
| `bgMusic` | Game start | Simple looping 8-bit melody |

### Audio Implementation
```javascript
// Example structure for Web Audio API
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  // Configure based on type...
}
```

---

## 💬 Story Text System

### Typewriter Effect
- Characters appear one at a time (50ms delay)
- Soft blip sound per character
- Click/Space to skip to full text
- Click/Space again to dismiss

### Funny Mid-Game Popups
Random chance to appear during gameplay:
- "This seemed easier in my head."
- "Why are feelings harder than platformers?"
- "Okay wow, I'm actually doing this."
- "At least there's no fall damage."
- "Save point would be nice right about now."
- "My palms are sweaty... wait, wrong reference."
- "Is this what they call a side quest?"

---

## 🖼️ Photo Pixelation System

```javascript
function pixelateImage(img, pixelSize = 8) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  // Draw small, then scale up for pixel effect
  const w = img.width / pixelSize;
  const h = img.height / pixelSize;
  
  ctx.drawImage(img, 0, 0, w, h);
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(canvas, 0, 0, w, h, 0, 0, img.width, img.height);
  
  return canvas;
}
```

---

## 🕹️ Konami Code Implementation

Add to `BaseLayout.astro`:

```javascript
const konamiCode = [
  'ArrowUp', 'ArrowUp', 
  'ArrowDown', 'ArrowDown', 
  'ArrowLeft', 'ArrowRight', 
  'ArrowLeft', 'ArrowRight', 
  'KeyB', 'KeyA'
];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
  if (e.code === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      // Secret found! Redirect to game
      window.location.href = '/will-you-be-my-valentine';
    }
  } else {
    konamiIndex = 0;
  }
});
```

---

## 🎨 Color Palette

| Element | Color Code |
|---------|------------|
| Player Body | #4A90D9 |
| Player Face | #FFD5B5 |
| Hearts | #FF6B9D |
| Level 1 Sky | #FFE4EC |
| Level 1 Ground | #7BC96F |
| Level 2 Sky | #FF9966 → #CC66FF (gradient) |
| Level 3 Sky | #1A1A2E |
| Level 4 BG | #FFF0F5 |
| UI Text | #333333 |
| UI Buttons | #FF6B9D |

---

## 📋 Implementation Order

### Phase 1: Foundation
1. Create `will-you-be-my-valentine.astro` with:
   - Basic HTML structure
   - Canvas element
   - CSS styling (full-screen game layout)
   - Game loop skeleton

### Phase 2: Game Engine
2. Implement core systems:
   - Game state management
   - Player class with physics
   - Input handling (keyboard)
   - Collision detection
   - Camera/viewport

### Phase 3: Content
3. Create Level 1 (meadow)
4. Create Level 2 (city)
5. Create Level 3 (night sky + Self-Doubt monster)
6. Create Final Level (reveal scene)

### Phase 4: Polish
7. Add story text system with typewriter
8. Add funny popup system
9. Implement Web Audio API sounds
10. Add photo reveal with pixelation
11. Create victory screen with animations

### Phase 5: Integration
12. Add Konami code to BaseLayout.astro
13. Test everything
14. Add placeholder for photo

---

## 📐 Game Structure (Code Architecture)

```javascript
// Main game structure
const Game = {
  // State
  state: 'title', // title, playing, story, paused, victory
  currentLevel: 0,
  
  // Systems
  player: { x, y, vx, vy, width, height, grounded },
  levels: [...],
  hearts: [],
  obstacles: [],
  
  // Methods
  init(),
  update(deltaTime),
  render(ctx),
  handleInput(e),
  
  // Level management
  loadLevel(index),
  nextLevel(),
  
  // UI
  showStory(text, callback),
  showVictory(),
};
```

---

## 🔧 Required User Action

After implementation, user needs to:
1. Add her photo to `public/valentine/valentine.png`
2. Test the game at `/will-you-be-my-valentine`
3. Test Konami code from any page

---

## 🚀 Ready to Execute

When ready, we will:
1. Create the complete game page (`will-you-be-my-valentine.astro`)
2. Add Konami code listener to `BaseLayout.astro`
3. Test that everything works

**Estimated file size:** ~800-1000 lines (all self-contained)

---

Let's build this legendary Valentine's quest! 🎮💖
