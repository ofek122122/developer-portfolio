import type { Testimonial } from '@/types'

// Replace placeholders with real client quotes before launch
export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    name: '{{CLIENT_NAME_1}}',
    role: {
      he: '{{CLIENT_ROLE_HE_1}}',
      en: '{{CLIENT_ROLE_EN_1}}',
    },
    quote: {
      he: '{{CLIENT_QUOTE_HE_1}}',
      en: '{{CLIENT_QUOTE_EN_1}}',
    },
  },
  {
    id: 'testimonial-2',
    name: '{{CLIENT_NAME_2}}',
    role: {
      he: '{{CLIENT_ROLE_HE_2}}',
      en: '{{CLIENT_ROLE_EN_2}}',
    },
    quote: {
      he: '{{CLIENT_QUOTE_HE_2}}',
      en: '{{CLIENT_QUOTE_EN_2}}',
    },
  },
  {
    id: 'testimonial-3',
    name: '{{CLIENT_NAME_3}}',
    role: {
      he: '{{CLIENT_ROLE_HE_3}}',
      en: '{{CLIENT_ROLE_EN_3}}',
    },
    quote: {
      he: '{{CLIENT_QUOTE_HE_3}}',
      en: '{{CLIENT_QUOTE_EN_3}}',
    },
  },
]
