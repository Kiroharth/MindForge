# MindForge

**MindForge** is a modern, cross-platform progressive web application designed to transform AI-generated content into interactive learning experiences. Built with Next.js and React, it provides a comprehensive platform for creating, practicing, and tracking progress through customizable quizzes.

## Overview

MindForge bridges the gap between AI content generation and interactive learning by parsing structured JSON output from AI models (ChatGPT, Gemini, Claude) and converting it into feature-rich, interactive quiz sessions. The application emphasizes user experience with real-time feedback, progress tracking, and advanced learning tools.

## Key Features

### Core Functionality
- **AI Content Import**: Seamless integration with AI-generated quiz content via JSON parsing
- **Interactive Quiz Interface**: Clean, distraction-free environment with instant feedback and visual confirmation
- **Progress Tracking**: Comprehensive dashboard displaying streak counters, question statistics, and topic mastery analytics
- **Historical Records**: Complete quiz history with detailed performance metrics and timestamps

### Advanced Capabilities
- **Mathematical Rendering**: Full LaTeX support via KaTeX for precise mathematical notation
- **Function Visualization**: Interactive graph rendering using `function-plot` for mathematical functions
- **Integrated NotePad**: Dual-mode note-taking system featuring both freehand drawing and text input
- **Keyboard Navigation**: Streamlined interaction via keyboard shortcuts (1-4 for selection, Enter for submission)
- **Performance Metrics**: Built-in timer tracking for performance analysis
- **Progressive Web App**: Installable on Windows and Android with offline capabilities

### User Experience
- **Responsive Design**: Adaptive layouts optimized for desktop (side-by-side) and mobile (tabbed) interfaces
- **Dark Mode Interface**: Premium glassmorphism design with carefully calibrated contrast ratios
- **Smooth Animations**: Framer Motion integration for fluid transitions and micro-interactions

## Technology Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4 with custom CSS variables
- **Animations**: Framer Motion
- **Icons**: Lucide React

### Features & Utilities
- **Math Rendering**: KaTeX
- **Graph Visualization**: function-plot
- **Drawing Canvas**: react-sketch-canvas
- **Charts**: Recharts
- **Date Handling**: date-fns

### Development
- **Language**: TypeScript 5
- **Build Tool**: Webpack
- **PWA**: @ducanh2912/next-pwa
- **State Management**: LocalStorage (no backend required)

## Installation

### Prerequisites
- Node.js 20.x or higher
- npm or yarn package manager

### Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd AI-Output-to-Learning-APP
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:3000`

## Development

### Available Scripts

- `npm run dev` - Start development server with Webpack
- `npm run build` - Create production build
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Project Structure

```
├── app/                    # Next.js app directory
│   ├── page.tsx           # Dashboard
│   ├── import/            # Quiz import interface
│   ├── quiz/[id]/         # Interactive quiz page
│   └── history/           # Quiz history
├── components/            # React components
│   ├── Layout.tsx         # Main layout with navigation
│   ├── MathRenderer.tsx   # LaTeX rendering
│   ├── GraphRenderer.tsx  # Function plotting
│   ├── NotePad.tsx        # Drawing and notes
│   └── StatsGraph.tsx     # Analytics visualization
├── lib/                   # Utility functions
│   ├── storage.ts         # LocalStorage management
│   └── parser.ts          # AI output parser
└── types/                 # TypeScript definitions
```

## Usage

### Creating a Quiz

1. Navigate to the "Import Quiz" page
2. Generate quiz content using an AI model with the following structure:

```json
[
  {
    "question": "What is the derivative of $x^2$?",
    "type": "short-answer",
    "correctAnswer": "2x",
    "explanation": "Use the power rule: $\\frac{d}{dx}x^n = nx^{n-1}$",
    "graph": "x^2"
  }
]
```

3. Paste the JSON content and submit
4. Begin the interactive quiz session

### Taking a Quiz

- Use number keys (1-4) to select multiple choice answers
- Press Enter to submit answers or advance to the next question
- Access the NotePad for calculations and notes
- View mathematical graphs when provided
- Track elapsed time throughout the session

## Deployment

### Production Build

```bash
npm run build
npm start
```

The application will be available at `http://localhost:3000`

### Network Access

To access from other devices on the same network:

1. Determine your local IP address:
   - Windows: `ipconfig`
   - Mac/Linux: `ifconfig`

2. Configure Windows Firewall (if applicable):
   - Search for "Allow an app through Windows Firewall"
   - Enable both Private and Public network access for Node.js

3. Access from mobile devices:
   ```
   http://<your-ip-address>:3000
   ```

### PWA Installation

The application can be installed as a native app:

- **Desktop (Chrome/Edge)**: Click the "Install App" button in the sidebar
- **Mobile (Chrome)**: Menu → "Add to Home Screen"
- **Mobile (Safari)**: Share → "Add to Home Screen"

## Features in Detail

### Keyboard Shortcuts
- `1`, `2`, `3`, `4` - Select multiple choice options
- `Enter` - Submit answer or proceed to next question

### NotePad Integration
- **Draw Mode**: Freehand drawing with pen/eraser tools
- **Notes Mode**: Text-based note taking
- State persistence across tab switches

### Graph Rendering
- Automatic visualization of mathematical functions
- Dark theme optimized styling
- Configurable domain and range

## AI Prompt Template

For optimal results, use the following template when generating quiz content:

```
Create [N] practice questions about [Topic] in JSON format.

Structure for each question:
- question: string (use LaTeX with $...$ for math)
- type: "multiple-choice" or "short-answer"
- options: array of strings (for multiple-choice only)
- correctAnswer: string (must match one option exactly for multiple-choice)
- explanation: detailed step-by-step explanation with markdown formatting
- graph: optional mathematical function (e.g., "x^2", "sin(x)")

Include the graph field only when a function visualization would enhance understanding.
```

## Browser Compatibility

- Chrome/Edge: Full support (recommended)
- Firefox: Full support
- Safari: Full support (desktop PWA installation not available)

## Performance

- Initial load: ~2-3 seconds
- Page transitions: <300ms
- Quiz interaction: Real-time (<50ms)

## License

This project is provided as-is for educational and portfolio purposes.

## Contact

For questions or collaboration opportunities, please reach out via GitHub.
