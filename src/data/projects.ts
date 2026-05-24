import type { Project } from '@/types'

export const projects: Project[] = [
  {
    id: 'nest-rooftop',
    title: { he: 'Nest Rooftop', en: 'Nest Rooftop' },
    description: {
      he: 'דף נחיתה ייצוגי לוונאו רופטופ יוקרתי באשדוד — מרפסת פנורמית, בר, טאבון ועיצוב ויזואלי עשיר.',
      en: 'Landing page for a luxury rooftop event venue in Ashdod — panoramic views, bar, taboon, and image-driven design.',
    },
    tags: ['Landing Page', 'React', 'Tailwind'],
    category: { he: 'דף נחיתה / אירועים', en: 'Landing Page / Events' },
    image: '/images/projects/nest-rooftop.jpg',
    liveUrl: 'https://nestroof.top',
    year: 2024,
    featured: true,
  },
  {
    id: 'avitans-group',
    title: { he: "Avitan's Group", en: "Avitan's Group" },
    description: {
      he: 'אתר שיווק רב-עמודי בעברית לחברת השקעות נדל"ן אמריקאית המלווה משקיעים ישראלים ברכישה, שיפוץ וניהול נכסים בקליבלנד.',
      en: 'Multi-page Hebrew marketing site for a US real-estate investment company guiding Israeli investors through buying, renovating, and managing rental properties in Cleveland.',
    },
    tags: ['Website', 'Multi-page', 'RTL'],
    category: { he: 'אתר עסקי', en: 'Business Website' },
    image: '/images/projects/avitans-group.jpg',
    liveUrl: 'https://avitansgroup.com',
    year: 2024,
    featured: true,
  },
  {
    id: 'merav-arditi',
    title: { he: 'מרב ארדיטי', en: 'Merav Arditi' },
    description: {
      he: 'אתר Next.js ליועצת שינה ומאמנת הורות מוסמכת: שירותים, המלצות, טופס יצירת קשר ותהליך תשלום לרכישת מדריך דיגיטלי.',
      en: 'Next.js site for a certified sleep consultant & parenting coach: services, testimonials, contact form, and a checkout flow for a paid digital guide.',
    },
    tags: ['Next.js', 'E-commerce', 'Payments'],
    category: { he: 'מיתוג אישי / E-commerce', en: 'Personal Brand / E-commerce' },
    image: '/images/projects/merav-arditi.jpg',
    liveUrl: 'https://meravrdt.com',
    year: 2024,
    featured: true,
  },
  {
    id: 'momenties',
    title: { he: 'Momenties', en: 'Momenties' },
    description: {
      he: 'אפליקציית לוח שנה מבוססת AI עם קלט קולי (Gemini + Deepgram), בנויה על Next.js ו-Supabase.',
      en: 'AI-powered calendar app with voice input (Gemini + Deepgram), built on Next.js + Supabase.',
    },
    tags: ['Next.js', 'AI', 'Supabase', 'TypeScript'],
    category: { he: 'אפליקציית ווב', en: 'Web App' },
    image: '/images/projects/momenties.jpg',
    repoUrl: 'https://github.com/ofek122122/calendro',
    liveUrl: undefined,
    year: 2024,
    featured: false,
  },
  {
    id: 'client-crm',
    title: { he: 'Client CRM', en: 'Client CRM' },
    description: {
      he: 'CRM מונחה-Webhook בסגנון Monday עם חתימה דיגיטלית ו-Google OAuth, המטפל באלפי רשומות יומיות.',
      en: 'Webhook-driven, Monday-style CRM with digital-signature flow and Google OAuth, handling thousands of daily records.',
    },
    tags: ['React', 'Fastify', 'Prisma', 'PostgreSQL'],
    category: { he: 'מערכת', en: 'System' },
    image: '/images/projects/client-crm.jpg',
    year: 2024,
    featured: false,
  },
]
