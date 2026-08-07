import { about } from '@/content/en/about'
import { FadeIn } from '@/components/motion/FadeIn'
import { PanelFrame } from '@/components/ui/panel-frame'
import { SectionIndex } from '@/components/ui/section-index'
import type { Education, Profile } from '@/types/portfolio'

interface AboutSectionProps {
  profile: Profile | null
  education: Education[]
}

/** `2023-09-01` → `2023`. Only the year is shown (playbooks/AboutSection.md). */
function year(date: string | null): string | null {
  return date ? date.slice(0, 4) : null
}

function period(edu: Education): string {
  const start = year(edu.start_date)
  const end = year(edu.end_date) ?? about.labels.ongoing
  return start ? `${start} – ${end}` : end
}

export function AboutSection({ profile, education }: AboutSectionProps) {
  // Supabase stores the bio as one text column; the copy-layer fallback is
  // already split into paragraphs. Normalise both to string[].
  const paragraphs = profile?.bio
    ? profile.bio.split(/\n{2,}/).filter(Boolean)
    : [...about.fallback.bio]

  const hobbies = profile?.hobbies ?? about.fallback.hobbies
  const showHobbies = profile ? profile.show_hobbies : true

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="mx-auto max-w-5xl scroll-mt-20 px-6 py-24"
    >
      <FadeIn>
        <SectionIndex index={about.index} label={about.label} />
        <h2
          id="about-heading"
          className="mt-4 font-display text-h1 font-bold text-foreground"
        >
          {about.heading}
        </h2>
      </FadeIn>

      <div className="mt-10 grid gap-10 md:grid-cols-[1.4fr_1fr]">
        <FadeIn className="space-y-5">
          {paragraphs.map((paragraph, i) => (
            <p key={i} className="text-base text-fg-muted">
              {paragraph}
            </p>
          ))}
          {showHobbies && hobbies && (
            <p className="text-base text-fg-muted italic">{hobbies}</p>
          )}
        </FadeIn>

        <FadeIn delay={0.1}>
          <PanelFrame clipped className="p-6">
            <h3 className="font-mono text-caption uppercase tracking-[0.12em] text-accent">
              {about.educationHeading}
            </h3>
            {education.length === 0 ? (
              <p className="mt-4 text-sm text-fg-muted">
                {/* No DB row yet — the section stays coherent rather than
                    rendering an empty frame. */}
                HUFLIT — Data Science, 2023 – {about.labels.ongoing}
              </p>
            ) : (
              <ul className="mt-4 space-y-6">
                {education.map((edu) => (
                  <li key={edu.id}>
                    {/* School names may carry diacritics — body face only. */}
                    <p className="font-sans text-base text-foreground">
                      {edu.school}
                    </p>
                    <dl className="mt-2 space-y-1 text-sm text-fg-muted">
                      {edu.major && (
                        <Row label={about.labels.major} value={edu.major} />
                      )}
                      <Row label={about.labels.period} value={period(edu)} />
                      {edu.gpa && (
                        <Row label={about.labels.gpa} value={edu.gpa} />
                      )}
                    </dl>
                    {edu.highlights && edu.highlights.length > 0 && (
                      <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-fg-muted">
                        {edu.highlights.map((h) => (
                          <li key={h}>{h}</li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </PanelFrame>
        </FadeIn>
      </div>
    </section>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <dt className="min-w-16 font-mono text-caption uppercase tracking-[0.08em] opacity-70">
        {label}
      </dt>
      <dd>{value}</dd>
    </div>
  )
}
