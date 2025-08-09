# Feelis - Mindful Emotion Wellness App Landing Page

A beautifully-crafted landing page for Feelis, a gentle emotion journaling and breathing app that helps users regulate emotions through micro-journaling, breathwork, and delightful visuals.

**Experience Qualities**:
1. **Gentle** - Every interaction should feel soft, non-judgmental, and supportive like a warm hug
2. **Peaceful** - The interface promotes calm through muted colors, smooth animations, and breathing room
3. **Delightful** - Subtle animations and beautiful visuals create moments of joy without overwhelming

**Complexity Level**: Content Showcase (information-focused)
The landing page focuses on presenting the app's features, gallery, and benefits in a visually compelling way with minimal interactive functionality beyond the lightbox gallery and video player.

## Essential Features

### Hero Section with Video Preview
- **Functionality**: Displays app title, description, and autoplay hero video
- **Purpose**: Immediately communicate the app's gentle, beautiful nature
- **Trigger**: Page load
- **Progression**: Auto-playing video → CTA buttons → feature badges
- **Success criteria**: Video plays smoothly, CTAs are prominent and accessible

### Feature Cards Grid
- **Functionality**: Showcase four key app features in a responsive grid
- **Purpose**: Explain core functionality without overwhelming detail
- **Trigger**: User scrolls to features section
- **Progression**: Title/description → 2x2 feature cards → call-to-action
- **Success criteria**: Features are clearly explained and visually distinct

### Interactive Gallery with Lightbox
- **Functionality**: Expandable image gallery with keyboard navigation
- **Purpose**: Show the app's beautiful UI and visual design
- **Trigger**: User clicks on gallery images
- **Progression**: Grid view → click image → lightbox opens → navigation/close
- **Success criteria**: Images load quickly, lightbox is accessible, keyboard navigation works

### Video Section with Lightbox
- **Functionality**: Embedded video player with optional lightbox viewing
- **Purpose**: Demonstrate app flow and interaction design
- **Trigger**: User clicks video or lightbox button
- **Progression**: Video preview → controls → optional lightbox → close
- **Success criteria**: Video plays in both embedded and lightbox modes

### Email Waitlist Signup
- **Functionality**: Capture email addresses for app launch notification
- **Purpose**: Build anticipation and user base before launch
- **Trigger**: User enters email and submits form
- **Progression**: Email input → validation → submission → confirmation
- **Success criteria**: Form validates properly, integrates with email system

## Edge Case Handling

- **Reduced Motion**: Respects user's motion preferences, pauses autoplay videos
- **Mobile Navigation**: Responsive design adapts to smaller screens gracefully
- **Video Loading**: Provides poster images as fallbacks for slow connections
- **Form Validation**: Handles invalid email formats with helpful messaging
- **Keyboard Navigation**: Full accessibility support for lightbox and navigation

## Design Direction

The design should evoke a sense of calm sanctuary and gentle support - like stepping into a peaceful meditation space. The interface feels minimal yet warm, with soft gradients and plenty of breathing room that invites rather than demands attention.

## Color Selection

**Analogous** - Using adjacent purple and blue tones to create a harmonious, calming palette that suggests twilight serenity and peaceful reflection.

- **Primary Color**: Soft purple `oklch(0.65 0.15 280)` - communicates creativity, calm, and introspection
- **Secondary Colors**: Lavender `oklch(0.85 0.08 285)` and sky blue `oklch(0.8 0.12 250)` for gentle accents
- **Accent Color**: Warm coral `oklch(0.75 0.15 25)` for call-to-action buttons and important highlights
- **Foreground/Background Pairings**:
  - Background (Soft cream `oklch(0.97 0.02 85)`): Dark purple text `oklch(0.2 0.05 280)` - Ratio 8.2:1 ✓
  - Card (Glass white `oklch(0.98 0.01 280)`): Dark purple text `oklch(0.2 0.05 280)` - Ratio 9.1:1 ✓
  - Primary (Soft purple `oklch(0.65 0.15 280)`): White text `oklch(0.98 0.01 280)` - Ratio 5.8:1 ✓
  - Accent (Warm coral `oklch(0.75 0.15 25)`): White text `oklch(0.98 0.01 280)` - Ratio 4.9:1 ✓

## Font Selection

The typography should feel approachable yet refined, like handwritten notes in a beautiful journal - supporting the gentle, personal nature of emotion journaling.

- **Typographic Hierarchy**:
  - H1 (Hero Title): Inter Bold/clamp(36px, 6vw, 72px)/tight letter spacing
  - H2 (Section Titles): Inter SemiBold/clamp(28px, 4.4vw, 44px)/normal spacing
  - H3 (Feature Titles): Inter SemiBold/20px/normal spacing
  - Body Text: Inter Regular/16px/relaxed line height (1.6)
  - Small Text: Inter Medium/14px/normal spacing

## Animations

Animations should feel like gentle breathing - subtle, rhythmic, and naturally calming rather than attention-grabbing or energetic.

- **Purposeful Meaning**: Motion communicates the app's core breathing exercises through subtle scaling and fading transitions
- **Hierarchy of Movement**: Hero video gets primary motion focus, with secondary gentle hover effects on cards and buttons

## Component Selection

- **Components**: Card for feature sections and testimonials, Button for CTAs, Dialog for lightbox functionality, Input for email capture
- **Customizations**: Custom video player component with poster fallbacks, responsive image gallery with keyboard navigation
- **States**: Buttons show gentle scale and shadow changes on hover, cards lift slightly with subtle shadow increases
- **Icon Selection**: Minimal iconography - play button for video, close X for lightbox, heart/sparkle accents sparingly
- **Spacing**: Generous padding using Tailwind's 4, 6, 8 scale for breathing room, 2-3 for tight relationships
- **Mobile**: Stacked layout on mobile with single-column grids, larger touch targets, simplified navigation