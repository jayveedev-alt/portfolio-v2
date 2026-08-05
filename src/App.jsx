import Navbar     from './components/Navbar'
import Hero       from './components/Hero'
import WhatIDo    from './components/WhatIDo'
import Process    from './components/Process'
import Projects   from './components/Projects'
import Experience from './components/Experience'
import CtaBanner  from './components/CtaBanner'
import Contact    from './components/Contact'
import Footer     from './components/Footer'
import { useReveal } from './components/useReveal'

export default function App() {
  useReveal()

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhatIDo />
        <Process />
        <Projects />
        <Experience />
        <CtaBanner />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
