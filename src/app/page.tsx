import { HeroSection } from '@/components/sections/HeroSection'
import { SectionDivider } from '@/components/ui/SectionDivider'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <SectionDivider label="Selected Work" />
      <section id="projects" className="min-h-screen flex items-center justify-center text-2xl text-neutral-400">Progetti</section>
      <section id="stack"    className="min-h-screen flex items-center justify-center text-2xl text-neutral-400">Stack</section>
      <section id="about"    className="min-h-screen flex items-center justify-center text-2xl text-neutral-400">About</section>
      <section id="contact"  className="min-h-screen flex items-center justify-center text-2xl text-neutral-400">Contact</section>
    </main>
  )
}
