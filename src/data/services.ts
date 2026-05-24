import type { Service } from '@/types'

export const services: Service[] = [
  {
    id: 'landing-pages',
    title: { he: 'אתרים ודפי נחיתה', en: 'Websites & landing pages' },
    description: {
      he: 'אתרים שיווקיים מהירים ומלוטשים שמביאים לידים.',
      en: 'Fast, polished marketing sites that convert visitors into leads.',
    },
    bullets: [
      { he: 'עיצוב מותאם אישית', en: 'Custom design' },
      { he: 'מובייל-ראשון ונגיש', en: 'Mobile-first & accessible' },
      { he: 'מהירות טעינה גבוהה', en: 'High performance (Core Web Vitals)' },
      { he: 'אינטגרציית טפסים וCTA', en: 'Forms & CTA integration' },
    ],
    startingPrice: '₪2,000',
    icon: 'Globe',
  },
  {
    id: 'ecommerce',
    title: { he: 'חנויות אונליין / E-commerce', en: 'E-commerce / online stores' },
    description: {
      he: 'חנות אונליין עם קטלוג, סל קניות, תשלומים ואדמין.',
      en: 'Online store with catalog, cart, checkout, and payments.',
    },
    bullets: [
      { he: 'קטלוג מוצרים ניהולי', en: 'Manageable product catalog' },
      { he: 'תשלומים מאובטחים', en: 'Secure payment processing' },
      { he: 'ניהול הזמנות', en: 'Order management' },
      { he: 'לוח בקרה למנהל', en: 'Admin dashboard' },
    ],
    startingPrice: '₪4,000',
    icon: 'ShoppingCart',
  },
  {
    id: 'web-apps',
    title: { he: 'אפליקציות ווב ומובייל', en: 'Web & mobile apps' },
    description: {
      he: 'אפליקציות ברמת פרודקשן: לוחות בקרה, SaaS, כלים פנימיים.',
      en: 'Production-grade apps and dashboards: SaaS, internal tools.',
    },
    bullets: [
      { he: 'ארכיטקטורה מסולמת', en: 'Scalable architecture' },
      { he: 'אותנטיקציה ואבטחה', en: 'Auth & security' },
      { he: 'אינטגרציות API', en: 'API integrations' },
      { he: 'ביצועים ומדרגיות', en: 'Performance & scalability' },
    ],
    icon: 'AppWindow',
  },
  {
    id: 'custom-systems',
    title: { he: 'מערכות ואוטומציות', en: 'Custom systems & automation' },
    description: {
      he: 'CRM, אינטגרציות, כלים פנימיים ותכונות AI.',
      en: 'CRMs, integrations, internal tools, AI features.',
    },
    bullets: [
      { he: 'אינטגרציה עם מערכות קיימות', en: 'Integration with existing systems' },
      { he: 'תהליכי עבודה אוטומטיים', en: 'Automated workflows' },
      { he: 'AI ועיבוד נתונים', en: 'AI & data processing' },
      { he: "API's וWebhooks", en: "APIs & Webhooks" },
    ],
    icon: 'Cpu',
  },
  {
    id: 'other',
    title: { he: 'רעיון אחר?', en: 'Something else in mind?' },
    description: {
      he: 'פתוח לרעיונות חדשים. ספר לי על הפרויקט שלך.',
      en: 'Open to new ideas. Tell me about your project.',
    },
    bullets: [],
    icon: 'Sparkles',
  },
]
