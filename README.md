# Prabhu P — Modern Portfolio Website

A modern, high-performance personal developer portfolio built with **Next.js (App Router)**, **React**, **TypeScript**, and **Tailwind CSS**, migrated and upgraded from the core PHP portfolio in `portfolio-main`.

---

## 🌟 Key Features

- **Next.js 14 App Router & TypeScript**: Modular, type-safe component architecture.
- **Dual Theme Mode**: Polished light mode (default) and dark mode with persistent user preference and anti-FOUC initialization.
- **Dynamic Multi-Theme Engine**:
  - 8 curated color palettes: *Ocean Blue, Royal Purple, Emerald Green, Sunset Orange, Rose Pink, Midnight Indigo, Monochrome Slate, Cyber Neon*.
  - Full 40+ color swatches palette.
  - 4 interface corner radius presets (*Sharp, Soft, Rounded, Curved*).
  - "Surprise Me" randomized theme selector.
  - Zero layout shifts and instant CSS variable synchronization.
- **Interactive Developer Terminal**:
  - macOS style window with interactive CLI.
  - Supports commands: `help`, `resume`, `skills`, `contact`, `about`, `clear`, `sudo`.
- **Recruiter Fast-Track Mode**:
  - Highlighting key metrics, production impact, and direct action items for talent scouts.
- **Hero Typing Animation**:
  - Smooth typewriter effect cycling through Prabhu's real roles (*Full Stack Developer, LAMP Stack Specialist, AI Integration Engineer, Modern Web Architect*) without cumulative layout shifts.
- **Production Projects Gallery**:
  - Noxlay Cyber Tech enterprise projects (*Grocerzap.in, Agent Platform, Smartmenu, Niranyafashions.in, Noxlay.com, Foodcher.com*).
  - Personal & AI projects.
  - 4 Frontend Utility Tools (*Image Cropper, QR Code Generator, PDF to Image, WebP Converter*).
  - "How I Build" 5-step engineering process visualization.
- **Interactive Certificates & PDF Viewer**:
  - All 9 verified certifications from AWS Academy, TCS iON NQT, CADD Expert, Noxlay Cyber Tech, LearnCorp, and Gradtwin.
  - Dedicated preview modal with zoom in/out, rotation, and original file downloads.
- **Resume Preview Modal**:
  - macOS style modal embedding Prabhu's verified resume PDF with direct download.
- **AI Chatbot Assistant**:
  - Powered by the Google Gemini API with intelligent local contextual fallback for Prabhu's skills, background, and projects.
- **Contact Form & Recruiter Offer Letter Dropzone**:
  - Next.js Route Handler at `/api/contact` using Nodemailer.
  - Recruiter express pipeline supporting drag & drop PDF/Word offer letter uploads (up to 5MB) with HR reply routing.
  - Graceful sandbox mode handling when SMTP credentials are not yet configured.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Configure your SMTP and Gemini credentials in `.env`:
```env
# SMTP Configuration for Contact Form
SMTP_EMAIL=your-email@gmail.com
SMTP_PASSWORD=your-app-specific-password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587

# Contact Form Recipient
CONTACT_RECIPIENT_EMAIL=0xdevprabhu@gmail.com

# Optional Gemini API Key for AI Chatbot Assistant
GEMINI_API_KEY=your-gemini-api-key-here
```

> **Note**: If `SMTP_EMAIL` and `SMTP_PASSWORD` are left blank, the `/api/contact` route automatically operates in diagnostic sandbox mode, validating inputs and returning success responses without throwing errors.

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Production Build
```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
portfolio/
├── public/
│   └── assets/
│       ├── certificates/     # 9 verified certificates (.webp, .jpeg)
│       ├── documents/        # Prabhu's Resume PDF
│       ├── images/           # Profile picture and tech stack SVGs
│       └── projects/         # Production project screenshots
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── chat/         # Gemini AI Chatbot Route Handler
│   │   │   └── contact/      # Contact & Offer Letter Route Handler
│   │   ├── globals.css       # Tailwind CSS & theme variable tokens
│   │   ├── layout.tsx        # SEO metadata, Open Graph, and JSON-LD schema
│   │   ├── page.tsx          # Single-page portfolio composition
│   │   ├── loading.tsx
│   │   ├── not-found.tsx
│   │   └── error.tsx
│   ├── components/
│   │   ├── certificates/     # Certificate preview modal
│   │   ├── layout/           # Navbar & Footer
│   │   ├── sections/         # Hero, About, Skills, Experience, Projects, Certificates, Contact
│   │   ├── theme/            # ThemeProvider & ThemeCustomizer modal
│   │   └── ui/               # ChatbotWidget & ResumeModal
│   ├── data/                 # Profile, skills, projects, certificates, themes
│   └── types/                # TypeScript interface definitions
├── .env.example
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🔒 Security & Privacy

- Sensitive SMTP credentials and API keys are strictly kept on the server inside Next.js Route Handlers.
- Contact form submissions are validated and sanitized on both client and server sides.
- File uploads for offer letters are strictly restricted to document mime-types and capped at 5MB.
- `portfolio-main` source files were inspected and preserved unmodified.
