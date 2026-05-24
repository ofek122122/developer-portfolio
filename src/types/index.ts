export type Locale = 'he' | 'en'

export type Localized = {
  he: string
  en: string
}

export type Project = {
  id: string
  title: Localized
  description: Localized
  tags: string[]
  category: Localized
  image: string
  liveUrl?: string
  repoUrl?: string
  year: number
  featured?: boolean
}

export type Service = {
  id: string
  title: Localized
  description: Localized
  bullets: Localized[]
  startingPrice?: string
  icon: string
}

export type Testimonial = {
  id: string
  name: string
  role: Localized
  quote: Localized
  avatar?: string
}
