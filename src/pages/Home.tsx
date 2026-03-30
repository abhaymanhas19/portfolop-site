import Hero from '../components/Hero'
import HeroStats from '../components/HeroStats'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import BlogCarousel from '../components/BlogCarousel'
import AboutPreview from '../components/AboutPreview'
import CertificationsPreview from '../components/CertificationsPreview'
import ContactForm from '../components/ContactForm'
import ImageShowcase from '../components/ImageShowcase'

export default function Home() {
  return (
    <>
      <Hero />
      <div id="blogs">
        <BlogCarousel />
      </div>
      <Projects />
      <Skills />
      <div id="about">
        <AboutPreview />
      </div>
      <div id="achievements">
        <CertificationsPreview />
      </div>
      <HeroStats />
      <ContactForm />
      <div id="products">
        <ImageShowcase />
      </div>
    </>
  )
}
