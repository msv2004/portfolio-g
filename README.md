# Marri Shashe Vikaash — 3D Portfolio

A premium, futuristic 3D portfolio built with cutting-edge web technologies.

## 🚀 Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 15** | Framework (App Router) |
| **Tailwind CSS** | Styling |
| **Framer Motion** | Animations |
| **Three.js + R3F** | 3D rendering |
| **Drei** | Three.js helpers |
| **EmailJS** | Contact form |
| **Lucide React** | Icons |
| **Vercel** | Deployment |

## 🎨 Design Features

- Dark glassmorphism theme
- Interactive AI neural network background
- Rotating 3D sphere with orbit rings
- Scroll-triggered animations
- Typewriter title effect
- Animated skill bars
- Filterable project cards
- Animated trophy award cards
- Publication research wall
- EmailJS contact form

## 📦 Setup

```bash
# Install dependencies
npm install --legacy-peer-deps

# Run dev server
npm run dev

# Build for production
npm run build
```

## 📧 EmailJS Setup

1. Create account at [emailjs.com](https://www.emailjs.com)
2. Create a service and email template
3. Update `components/sections/Contact.tsx`:
   - `EMAILJS_SERVICE_ID`
   - `EMAILJS_TEMPLATE_ID`
   - `EMAILJS_PUBLIC_KEY`

## 🚀 Deploy to Vercel

```bash
npm install -g vercel
vercel --prod
```

Or connect your GitHub repository to Vercel for automatic deployments.

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx      # Root layout + metadata
│   ├── page.tsx        # Main page
│   └── globals.css     # Global styles + design tokens
├── components/
│   ├── three/
│   │   ├── NeuralNetworkBg.tsx   # Canvas neural network
│   │   └── RotatingSphere.tsx    # React Three Fiber sphere
│   ├── ui/
│   │   ├── Navbar.tsx
│   │   ├── SectionHeader.tsx
│   │   └── Footer.tsx
│   └── sections/
│       ├── Hero.tsx
│       ├── About.tsx
│       ├── Skills.tsx
│       ├── Experience.tsx
│       ├── Projects.tsx
│       ├── Research.tsx
│       ├── Awards.tsx
│       ├── Certifications.tsx
│       └── Contact.tsx
├── public/
├── vercel.json
└── package.json
```

## 👤 About

**Marri Shashe Vikaash**
- 📧 shashevikaash@gmail.com
- 🔗 [LinkedIn](https://linkedin.com/in/shashe-vikaash)
- 💻 [GitHub](https://github.com/msv2004)
