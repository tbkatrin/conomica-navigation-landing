/**
 * Dev-only preview: gallery / hero animations.
 * Route: /dev/gallery-animations — not linked from the app.
 *
 * Combines every animation component built so far, oldest first:
 *  1. ImageStreamHero  — perspective corridor of images (restored)
 *  2. CircularCarousel — arc of cards with autoplay (current)
 */
import ImageStreamHeroDemo from "@/components/ui/image-stream-hero-demo";
import CircularCarouselDemo from "@/components/ui/circular-carousel-demo";

export default function GalleryAnimationsPage() {
  return (
    <main className="mx-auto max-w-[1920px] space-y-16 p-10">
      <header className="space-y-1">
        <h1 className="text-2xl font-medium tracking-tight text-neutral-900">
          Gallery animations
        </h1>
        <p className="text-sm text-neutral-500">
          Dev preview — every animation component built so far.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-sm font-medium uppercase tracking-wide text-neutral-400">
          Раньше — ImageStreamHero
        </h2>
        <ImageStreamHeroDemo />
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-medium uppercase tracking-wide text-neutral-400">
          Сейчас — CircularCarousel
        </h2>
        <CircularCarouselDemo />
      </section>
    </main>
  );
}
