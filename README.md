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

## Getting Started

### Accessing MindForge

Visit the live application at: `https://mind-forge-snowy.vercel.app/`

No installation is required to use the web version. However, for the best experience, we recommend installing MindForge as a Progressive Web App (PWA) on your device.

### Installing as a PWA

#### Windows (Chrome/Edge)

1. Open MindForge in Chrome or Edge browser
2. Look for the "Install App" button in the sidebar, or
3. Click the install icon in the browser's address bar (appears as a monitor with a download arrow)
4. Click "Install" in the popup dialog
5. MindForge will now open as a standalone application
6. Access it from your Start Menu or Desktop shortcut

#### macOS (Chrome/Edge)

1. Open MindForge in Chrome or Edge browser
2. Click the "Install App" button in the sidebar, or
3. Click the install icon in the address bar
4. Select "Install"
5. MindForge will appear in your Applications folder and Dock

**Note:** Safari on macOS does not support PWA installation in the traditional sense.

#### Android (Chrome)

1. Open MindForge in Chrome browser
2. Tap the menu icon (three dots) in the top-right corner
3. Select "Add to Home screen" or "Install App"
4. Confirm the installation
5. MindForge will appear on your home screen as a native app icon
6. Launch it like any other Android app

#### iOS (Safari)

1. Open MindForge in Safari browser
2. Tap the Share button (square with an arrow pointing up)
3. Scroll down and tap "Add to Home Screen"
4. Customize the name if desired
5. Tap "Add"
6. MindForge will appear on your home screen
7. Launch it like any other iOS app

**Note:** iOS requires Safari for PWA installation. Chrome on iOS does not support this feature.

### Offline Access

Once installed as a PWA, MindForge will work offline. Your quizzes and progress are stored locally on your device, ensuring you can continue learning even without an internet connection.

## Using MindForge

### Creating Your First Quiz

1. **Navigate to Import Quiz:**
   - Click "Import Quiz" in the sidebar

2. **Generate Quiz Content:**
   - Open your preferred AI assistant (ChatGPT, Claude, Gemini)
   - Use the AI Prompt Template provided in the app
   - Copy the generated JSON output

3. **Import the Quiz:**
   - Enter a topic name (e.g., "Calculus Derivatives")
   - Paste the JSON content into the text area
   - Click "Import Quiz"

4. **Start Practicing:**
   - Your quiz will appear in the dashboard
   - Click on it to begin

### Taking a Quiz

**Desktop Experience:**
- Questions appear on the left
- NotePad (drawing + notes) appears on the right
- Use number keys `1-4` to select multiple choice answers
- Press `Enter` to submit or advance to the next question
- View mathematical graphs when included
- Track your time in the top-left corner

**Mobile Experience:**
- Switch between "Question" and "Notes" tabs
- Tap to select answers
- Tap "Check Answer" to submit
- View instant feedback with detailed explanations

### Understanding Your Progress

**Dashboard Features:**
- **Streak Counter:** Days of consecutive quiz activity
- **Questions Solved:** Total number of questions answered correctly
- **Quizzes Taken:** Total quiz sessions completed
- **Topic Mastery:** Visual chart showing performance across different subjects

**History:**
- View all completed quizzes
- See scores and completion times
- Review topic coverage

### Tips for Best Results

- **Use the NotePad:** Work through problems step-by-step using the drawing tool
- **Review Explanations:** Even for correct answers, read the explanations to deepen understanding
- **Practice Regularly:** Build and maintain your streak for consistent progress
- **Explore Graphs:** When available, examine function visualizations to understand concepts visually

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

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.