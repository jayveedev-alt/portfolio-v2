import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import SelectedWork from '../components/SelectedWork'
import WhatIDo from '../components/WhatIDo'
import Process from '../components/Process'
import Skills from '../components/Skills'
// import Experience from '../components/Experience'   // section disabled
import GitHubActivity from '../components/GitHubActivity'
import Faq from '../components/Faq'
import CtaBanner from '../components/CtaBanner'
import Contact from '../components/Contact'
import { useReveal } from '../components/useReveal'

export default function Home() {
  useReveal()

  return (
    <main>
      <Hero />
      <Marquee />
      <SelectedWork />
      <WhatIDo />
      <Process />
      <Skills />
      {/* <Experience /> */}
      <GitHubActivity />
      <Faq />
      <CtaBanner />
      <Contact />
    </main>
  )
}
