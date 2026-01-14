# StackReferee - An AI Tech Stack Decision Engine

![PHOTO-2026-01-12-10-53-37](https://github.com/user-attachments/assets/d17228fe-23e0-4c7a-9b60-9566e36a8a06)


A beautiful, production-ready web application that helps companies and students make informed technology stack decisions through AI-powered analysis, interactive visualizations, and expert guidance.

---

# 🧠 Kiro Heroes – Week 6: “The Referee”

![PHOTO-2026-01-12-10-42-13](https://github.com/user-attachments/assets/81ffce98-a97a-40f5-abbf-38b608d75190)

This project was built as part of **Kiro Heroes – Week 6 Challenge**, where the goal was to:

> **Build a tool that compares options and explains trade-offs instead of giving a single answer.**

StackReferee acts as a **neutral AI referee**, helping users *choose* the right tech stack based on real-world constraints.

---

# 🎯 Problem Solved

Developers, founders, and students frequently struggle with choosing the right tech stack:
- Firebase vs Supabase
- Node.js vs Django  
- AWS vs GCP vs Azure

![PHOTO-2026-01-12-10-56-59](https://github.com/user-attachments/assets/547a039e-5a91-4684-a578-ea6b32b1e1b4)

Wrong decisions cause months of rework, increased costs, and missed deadlines. StackReferee acts as a **neutral AI referee** that evaluates options using real constraints and engineering logic.

---

# ✨ Key Features

### 🎨 Beautiful Modern UI
- **Glassmorphism Design**: Modern glass-effect cards with backdrop blur
- **Interactive Animations**: Smooth transitions and hover effects
- **Three.js Visualizations**: 3D decision trees and floating tech elements
- **Responsive Design**: Perfect on desktop, tablet, and mobile
- **Theme Selector**: Multiple color themes (Default, Ocean, Sunset, Forest, Midnight)

<p align="center">
  <img src="https://github.com/user-attachments/assets/69c4185b-e4b7-400c-a3cd-30751d2bbda3" width="48%" />
  <img src="https://github.com/user-attachments/assets/91a0b4d5-7e77-4c00-977b-1f95440c07e9" width="48%" />
</p>

### 🧠 AI-Powered Analysis
- **Neutral Decision Making**: No biased recommendations
- **Multi Option Comparison**: Always compares 2-3 viable stacks
- **Trade-off Transparency**: Clear explanation of gains and losses
- **Context-Aware**: Tailored to budget, team, timeline, and scale
- **Future Planning**: Migration paths and evolution strategies

### 🎯 Interactive Experience
- **Step-by-Step Form**: Guided constraint collection
- **Visual Scoring**: Color-coded performance metrics
- **Real-time Analysis**: Instant AI-powered recommendations
- **Progress Tracking**: Clear step indicators
- **Smooth Navigation**: Seamless user flow

---

# 🏗️ Architecture

![PHOTO-2026-01-12-11-01-28](https://github.com/user-attachments/assets/f1c67039-fc74-4894-8c4f-29728979fad7)

### Tech Stack
- **Frontend**: Next.js 14 + React + TypeScript
- **Styling**: Tailwind CSS with custom design system
- **3D Graphics**: Three.js for interactive visualizations
- **State Management**: Zustand
- **AI Integration**: OpenAI/Gemini API (configurable)
- **Animations**: Custom CSS animations + Three.js
- **Hosting**: Vercel-ready

### Design System
- **Colors**: Primary (Blue), Accent (Purple), Success (Green), Warning (Orange)
- **Typography**: Inter font family with display variants
- **Components**: Glassmorphism cards, gradient buttons, interactive elements
- **Animations**: Fade-in, slide-up, float, glow, and bounce effects
 <img width="977" height="504" alt="Screenshot 2026-01-14 at 13 50 36" src="https://github.com/user-attachments/assets/63096164-df43-47a9-9160-13958457cb57" />

---

# 🚀 Getting Started

### Prerequisites
```
- Node.js 18+ 
- npm or yarn
```

### Installation

1. Clone the repository:
```bash
git clone <https://github.com/Niharika07-B/StackReferee>
cd tech-stack-referee
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Add your AI API keys:
```env
OPENAI_API_KEY=your_openai_key_here
GEMINI_API_KEY=your_gemini_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

# 🧠 AI Referee Logic

The system acts as a **senior technical architect** that:

1. **Never gives single answers** - Always compares 2-3 viable options
2. **Explains trade-offs** - What you gain and lose with each choice
3. **Considers context** - Tailors advice to budget, team, timeline, scale
4. **Plans for evolution** - Suggests migration paths as needs change

---

# Decision Framework

The AI evaluates stacks across:
- **Cost**: Development speed, learning curve, operational costs
- **Technical**: Performance, scalability, vendor lock-in, ecosystem
- **Risk**: Migration difficulty, maintenance burden, technology maturity
<img width="953" height="696" alt="Screenshot 2026-01-14 at 13 48 20" src="https://github.com/user-attachments/assets/a49b02d0-e491-42d6-9279-48737f69b0ce" />

---

# 📁 Project Structure

```
├── .kiro/                  # Kiro agent configuration
│   ├── config.yaml        # Project configuration
│   ├── reasoning.md       # AI decision logic
│   └── prompts.md         # AI prompt templates
├── app/                   # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Main page
├── components/            # React components
│   ├── FormStep.tsx       # Step wrapper component
│   ├── ProjectTypeStep.tsx # Step 1: Project context
│   ├── ResourcesStep.tsx  # Step 2: Budget & team
│   ├── RequirementsStep.tsx # Step 3: Timeline & scale
│   ├── AnalysisStep.tsx   # Step 4: Results display
│   ├── TechStackCard.tsx  # Stack comparison cards
│   ├── LoadingSpinner.tsx # Loading indicator
│   └── ProgressIndicator.tsx # Step progress
├── lib/                   # Utilities
│   ├── store.ts          # Zustand state management
│   └── ai-service.ts     # AI integration service
├── types/                 # TypeScript definitions
│   └── index.ts          # Core type definitions
└── README.md             # This file
```
---

# 🎨 Design System

### Colors
- **Primary**: Blue (#3b82f6) - Trust and reliability
- **Secondary**: Gray (#64748b) - Professional neutrality
- **Success**: Green - Positive outcomes
- **Warning**: Yellow - Important considerations
- **Error**: Red - Risks and concerns

### Components
- **Cards**: Clean, bordered containers with hover effects
- **Buttons**: Primary (blue) and secondary (outlined) variants
- **Form Fields**: Consistent styling with focus states
- **Progress**: Visual step indicator with completion states

---

# 🔧 Configuration

### AI Service
The AI service (`lib/ai-service.ts`) can be configured to use different providers:
- OpenAI GPT models
- Google Gemini
- Custom API endpoints

### Mock Mode
For development/demo purposes, the app includes realistic mock responses that simulate the AI decision logic without requiring API keys.

<img width="418" height="605" alt="Screenshot 2026-01-14 at 13 45 43" src="https://github.com/user-attachments/assets/a6c65cfe-1a34-4f94-b69b-fc016172606d" />

---

# 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
The app is a standard Next.js application and can be deployed to:
- Netlify
- AWS Amplify
- Railway
- Any Node.js hosting platform

---

# 🧪 Testing

### Manual Testing Scenarios
1. **Student Project**: Low budget, simple requirements
2. **Startup MVP**: Medium budget, fast timeline
3. **Enterprise Tool**: High budget, compliance needs
4. **AI Application**: Specific AI/ML requirements

### Expected Behaviors
- Different inputs should produce different recommendations
- Trade-offs should be clearly explained
- Migration paths should be realistic and actionable

---

# 📈 Success Metrics

The product is successful if:
- A startup can use it to choose a stack confidently
- A student can justify architecture decisions in reviews
- Different constraint sets produce meaningfully different recommendations
- Output feels like advice from a senior engineer

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## 📄 License

MIT License - see LICENSE file for details.

---

**Built for real technical decisions, not demos.**
