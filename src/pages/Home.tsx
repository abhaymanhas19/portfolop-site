import Hero from '../components/Hero'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import AboutPreview from '../components/AboutPreview'
import CertificationsPreview from '../components/CertificationsPreview'
import ContactForm from '../components/ContactForm'

export default function Home() {
  return (
    <>
      <Hero />
      <Skills />
      <Projects />
      <AboutPreview />
      <CertificationsPreview />
      <ContactForm />
    </>
  )
}
