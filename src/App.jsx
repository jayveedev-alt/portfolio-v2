import Navbar     from './components/Navbar'
import Hero       from './components/Hero'
import WhatIDo    from './components/WhatIDo'
import Projects   from './components/Projects'
import Experience from './components/Experience'
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
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
