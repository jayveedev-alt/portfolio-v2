import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import SelectedWork from '../components/SelectedWork'
import WhatIDo from '../components/WhatIDo'
import ScrollStack from '../components/ScrollStack'
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
      {/* Two stacking stages, chained by nesting: What I Can Do pins and blurs
          while How I Work covers it; How I Work then pins (no blur) and lights
          its four phase cards while Tech Stack covers it. */}
      <ScrollStack>
        <WhatIDo />
        <ScrollStack blur={false} hold={1.1}>
          <Process />
          <Skills />
        </ScrollStack>
      </ScrollStack>
      {/* <Experience /> */}
      <GitHubActivity />
      <Faq />
      <CtaBanner />
      <Contact />
    </main>
  )
}
