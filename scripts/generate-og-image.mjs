/**
 * T025 — generate `public/og.png` (1200x630, Mecha Typography system).
 *
 * Run: `pnpm og:generate`. The PNG is committed; this script only re-runs
 * when the copy or the design changes. Rendering it at request time would
 * add a serverless render to every crawl for an image that never varies.
 *
 * `next/og` ships inside Next 15 (`next/og.js`) — no new dependency. Node's
 * resolver needs the explicit `.js` because next's package exports map has
 * no `./og` subpath entry.
 *
 * Fonts are fetched from Google Fonts at generation time, matching what
 * `next/font` loads for the site itself:
 *   - Geist       — the name, which carries Vietnamese diacritics
 *   - Orbitron    — display/ASCII only (has NO diacritic glyphs; see
 *                   Typography.md § Constraint). Never used for the name.
 * Satori has no fallback chain of its own, so any glyph outside the fonts
 * passed here renders blank — hence the split.
 */
import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { ImageResponse } from 'next/og.js'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const OUT = path.join(ROOT, 'public', 'og.png')

const WIDTH = 1200
const HEIGHT = 630

// Mirrors src/styles/globals.css @layer base :root — kept in sync by hand.
// Satori resolves no CSS variables, so the literals have to appear here.
const C = {
  background: '#09090b',
  bgElevated: '#111113',
  foreground: '#fafafa',
  fgMuted: '#a1a1aa',
  accent: '#06b6d4',
  border: '#27272a',
}

/**
 * Fetch one TTF from Google Fonts.
 *
 * No `User-Agent` header on purpose: the CSS API picks a format from the UA,
 * and only the unknown-client default is TTF — which is the one format satori
 * parses. A browser UA yields woff/woff2 and the older MSIE trick now yields
 * EOT; both fail with "Unsupported OpenType signature".
 */
async function loadFont(family, weight) {
  const cssUrl = `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}`
  const css = await fetch(cssUrl)
  if (!css.ok) throw new Error(`font css ${family}@${weight}: ${css.status}`)
  const src = (await css.text()).match(/src:\s*url\(([^)]+\.ttf)\)/)
  if (!src) throw new Error(`no ttf url in css for ${family}@${weight}`)
  const font = await fetch(src[1])
  if (!font.ok) throw new Error(`font file ${family}@${weight}: ${font.status}`)
  const buf = Buffer.from(await font.arrayBuffer())
  // TrueType magic `00 01 00 00`. Guard here so a format regression surfaces
  // as a named font rather than satori's opaque signature error.
  if (buf.readUInt32BE(0) !== 0x00010000)
    throw new Error(`${family}@${weight} is not a TTF (got ${buf.subarray(0, 4).toString('hex')})`)
  return buf
}

/** Minimal hyperscript — satori takes React-element-shaped plain objects. */
const h = (type, style, ...children) => ({
  type,
  props: { style: { display: 'flex', ...style }, children: children.flat() },
})
const text = (content, style) => h('div', style, content)

/** Motif 1/5: HUD target-lock corner brackets (PanelFrame). */
function bracket(corner) {
  const [v, hSide] = corner
  return h('div', {
    position: 'absolute',
    width: 28,
    height: 28,
    [v]: 0,
    [hSide]: 0,
    [`border${v === 'top' ? 'Top' : 'Bottom'}`]: `2px solid ${C.accent}`,
    [`border${hSide === 'left' ? 'Left' : 'Right'}`]: `2px solid ${C.accent}`,
  })
}

/** Motif 4: bracketed monospace status tag — `[ … ]`. */
function statusTag(label) {
  return h(
    'div',
    {
      alignItems: 'center',
      border: `1px solid ${C.accent}66`,
      backgroundColor: 'rgba(6, 182, 212, 0.1)',
      color: C.accent,
      padding: '6px 14px',
      fontFamily: 'Orbitron',
      fontSize: 20,
      letterSpacing: '0.12em',
    },
    `[ ${label} ]`
  )
}

function card({ name, role, headline, alias, index, total }) {
  return h(
    'div',
    {
      position: 'relative',
      width: '100%',
      height: '100%',
      backgroundColor: C.background,
      // Motif: blueprint grid — visible structure, not decoration
      // (critiques/Vercel.md § grid-as-visible-structure).
      backgroundImage: `linear-gradient(${C.border} 1px, transparent 1px), linear-gradient(90deg, ${C.border} 1px, transparent 1px)`,
      backgroundSize: '60px 60px',
      padding: 56,
    },
    h(
      'div',
      {
        position: 'relative',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        backgroundColor: C.bgElevated,
        border: `1px solid ${C.border}`,
        padding: 56,
      },
      bracket(['top', 'left']),
      bracket(['top', 'right']),
      bracket(['bottom', 'left']),
      bracket(['bottom', 'right']),

      // Motif 2: `NN / TT — LABEL` section index.
      h(
        'div',
        { alignItems: 'center', gap: 10, fontFamily: 'Orbitron', fontSize: 22 },
        text(index, { color: C.accent, letterSpacing: '0.2em' }),
        text('/', { color: C.fgMuted, opacity: 0.4 }),
        text(total, { color: C.fgMuted, opacity: 0.6 }),
        text('—', { color: C.fgMuted, opacity: 0.4, margin: '0 8px' }),
        text('PORTFOLIO', { color: C.fgMuted, letterSpacing: '0.2em' })
      ),

      h(
        'div',
        { flexDirection: 'column', gap: 18 },
        // ⚠️ Geist, never Orbitron — this string has Vietnamese diacritics.
        text(name, {
          fontFamily: 'Geist',
          fontWeight: 700,
          fontSize: 92,
          color: C.foreground,
          letterSpacing: '-0.02em',
          lineHeight: 1.05,
        }),
        // ASCII only, so the display face is safe here.
        text(role.toUpperCase(), {
          fontFamily: 'Orbitron',
          fontWeight: 700,
          fontSize: 34,
          color: C.accent,
          letterSpacing: '0.14em',
        }),
        text(headline, {
          fontFamily: 'Geist',
          fontSize: 26,
          color: C.fgMuted,
          lineHeight: 1.4,
          maxWidth: 820,
        })
      ),

      h(
        'div',
        { alignItems: 'center', justifyContent: 'space-between' },
        statusTag(alias.toUpperCase()),
        text('SCHEMA.ORG / PERSON', {
          fontFamily: 'Orbitron',
          fontSize: 18,
          color: C.fgMuted,
          opacity: 0.5,
          letterSpacing: '0.2em',
        })
      )
    )
  )
}

const { hero } = await import('../src/content/en/hero.ts')
const { SECTION_TOTAL } = await import('../src/content/en/nav.ts')

const [geist, geistBold, orbitron] = await Promise.all([
  loadFont('Geist', 400),
  loadFont('Geist', 700),
  loadFont('Orbitron', 700),
])

const image = new ImageResponse(
  card({
    name: hero.name,
    role: hero.role,
    headline: hero.subheadline,
    alias: hero.alias,
    index: '00',
    total: SECTION_TOTAL,
  }),
  {
    width: WIDTH,
    height: HEIGHT,
    fonts: [
      { name: 'Geist', data: geist, weight: 400, style: 'normal' },
      { name: 'Geist', data: geistBold, weight: 700, style: 'normal' },
      { name: 'Orbitron', data: orbitron, weight: 700, style: 'normal' },
    ],
  }
)

const png = Buffer.from(await image.arrayBuffer())

// PNG IHDR: width/height are big-endian uint32 at bytes 16 and 20. Assert
// rather than trust — a wrong-size OG image is silently cropped by crawlers.
const w = png.readUInt32BE(16)
const hgt = png.readUInt32BE(20)
if (w !== WIDTH || hgt !== HEIGHT)
  throw new Error(`expected ${WIDTH}x${HEIGHT}, got ${w}x${hgt}`)

await writeFile(OUT, png)
console.log(`og.png written: ${w}x${hgt}, ${(png.length / 1024).toFixed(1)} KB`)
