export type Locale = 'he' | 'en'

export type Localized = {
  he: string
  en: string
}

export type ProjectStatus = 'live' | 'in-dev' | 'repo' | 'private'

export type Project = {
  id: string
  title: Localized
  description: Localized
  tags: string[]
  category: Localized
  image: string
  liveUrl?: string
  repoUrl?: string
  /** Public-facing status badge shown on the cover and work table. */
  status: ProjectStatus
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
