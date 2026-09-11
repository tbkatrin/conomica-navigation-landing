/**
 * Dev-only preview: gallery / hero animations.
 * Route: /dev/gallery-animations — not linked from the app.
 */
import Demo from "@/components/ui/image-stream-hero-demo";

export default function GalleryAnimationsPage() {
  return (
    <main className="mx-auto max-w-stage space-y-10 p-10">
      <header className="space-y-1">
        <h1 className="text-2xl font-medium tracking-title text-ink">
          Gallery animations
        </h1>
        <p className="text-sm text-ink/60">
          ImageStreamHero — perspective corridor of images. Dev preview only.
        </p>
      </header>

      <Demo />
    </main>
  );
}
