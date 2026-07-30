# Navbar

## Structure
Sticky, scroll-aware nav with active-section indicator (per `foundation/ProductRequirements.md`).

**Items:** About · Skills · Projects · Contact
*(Hero has no nav item — it's the top of the page by definition.)*

**Right side:** GitHub icon link + primary CTA button ("Resume" or "Contact" — decide once a downloadable CV/resume file exists, otherwise CTA points to Contact section).

## Behavior
- Active-section indicator updates on scroll (Intersection Observer, per `motion/MotionSystem.md`).
- Animated underline on hover/active (`motion/MicroInteractions.md`).
- Collapses to a mobile menu below the relevant breakpoint (`design/LayoutSystem.md`).
