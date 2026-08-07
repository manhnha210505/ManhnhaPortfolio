import { Navbar } from '@/components/navbar'
import { AboutSection } from '@/components/sections/AboutSection'
import { HeroSection } from '@/components/sections/HeroSection'
import { ProjectsSection } from '@/components/sections/ProjectsSection'
import { SkillsSection } from '@/components/sections/SkillsSection'
import { ContactSection } from '@/components/sections/ContactSection'
import {
  getEducation,
  getProfile,
  getProjects,
  getSkills,
} from '@/lib/data/portfolio'

/**
 * ISR: content changes only when the owner edits a Supabase row by hand
 * (ADR-0006), so a 1-hour window is generous and keeps the page static for
 * almost every request (research.md R-010).
 */
export const revalidate = 3600

export default async function Home() {
  // Parallel, not sequential — independent queries must not waterfall.
  const [profile, education, skills, projects] = await Promise.all([
    getProfile(),
    getEducation(),
    getSkills(),
    getProjects(),
  ])

  return (
    <>
      <Navbar />
      <main id="main">
        <HeroSection profile={profile} />
        <AboutSection profile={profile} education={education} />
        <SkillsSection skills={skills} />
        <ProjectsSection projects={projects} />
        <ContactSection />
      </main>
    </>
  )
}
