import Hero from '../components/Hero'
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
      <AbilityBadges />
      <Skills />
      <Projects />
      <CertificationsPreview />
      <AboutPreview />
      <ContactForm />
      <ImageShowcase />
    </>
  )
}
