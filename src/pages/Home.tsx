import Hero from '../components/Hero'
import HeroStats from '../components/HeroStats'
import AbilityBadges from '../components/AbilityBadges'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import AboutPreview from '../components/AboutPreview'
import CertificationsPreview from '../components/CertificationsPreview'
import ContactForm from '../components/ContactForm'
import ImageShowcase from '../components/ImageShowcase'

export default function Home() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <Projects />
      <Skills />
      <CertificationsPreview />
      <AbilityBadges />
      <HeroStats />
      <ContactForm />
      <ImageShowcase />
    </>
  )
}
