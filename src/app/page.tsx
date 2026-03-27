import { HeroSection } from '@/components/sections/HeroSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { StackSection } from '@/components/sections/StackSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { SectionDivider } from '@/components/ui/SectionDivider'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <SectionDivider label="Selected Work" />
      <ProjectsSection />
      
      <SectionDivider label="Tech Stack" />
      <StackSection />

      <SectionDivider label="About" />
      <AboutSection />

      <SectionDivider label="Get in Touch" />
      <ContactSection />
    </main>
  )
}
