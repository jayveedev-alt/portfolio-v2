import Navbar      from './components/Navbar'
import Hero        from './components/Hero'
import Marquee     from './components/Marquee'
import CaseStudies from './components/CaseStudies'
import Projects    from './components/Projects'
import WhatIDo     from './components/WhatIDo'
import Process     from './components/Process'
import Skills      from './components/Skills'
import Experience  from './components/Experience'
import Faq         from './components/Faq'
import CtaBanner   from './components/CtaBanner'
import Contact     from './components/Contact'
import Footer      from './components/Footer'
import { useReveal } from './components/useReveal'

export default function App() {
  useReveal()

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <CaseStudies />
        <Projects />
        <WhatIDo />
        <Process />
        <Skills />
        <Experience />
        <Faq />
        <CtaBanner />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
