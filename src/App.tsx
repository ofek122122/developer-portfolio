import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { SectionIndex } from '@/components/shared/SectionIndex'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Projects } from '@/components/sections/Projects'
import { Services } from '@/components/sections/Services'
import { Testimonials } from '@/components/sections/Testimonials'
import { Contact } from '@/components/sections/Contact'

export default function App() {
  const { i18n } = useTranslation()

  useEffect(() => {
    const lang = i18n.language.startsWith('he') ? 'he' : 'en'
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr'
  }, [i18n.language])

  return (
    <>
      <Header />
      <main className="bg-paper text-ink">
        <Hero />
        <About />
        <Projects />
        <Services />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <SectionIndex />
    </>
  )
}
