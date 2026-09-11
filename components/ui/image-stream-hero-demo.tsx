"use client";

import { ImageStreamHero } from "@/components/ui/image-stream-hero";

// Unsplash stock photos. The component renders plain <img>, so no
// next.config image domains are required.
const shot = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=640&q=80`;

const IMAGES = [
  { src: shot("1506744038136-46273834b3fb"), alt: "Mountain lake at dusk" },
  { src: shot("1470071459604-3b5ec3a7fe05"), alt: "Foggy pine forest" },
  { src: shot("1441974231531-c6227db76b6e"), alt: "Sunlit forest floor" },
  { src: shot("1500534314209-a25ddb2bd429"), alt: "Alpine ridge under cloud" },
  { src: shot("1518791841217-8f162f1e1131"), alt: "Cat close-up" },
  { src: shot("1507525428034-b723cf961d3e"), alt: "Tropical beach and clear water" },
  { src: shot("1519681393784-d120267933ba"), alt: "Snowy mountain at night" },
  { src: shot("1447752875215-b2761acb3c5d"), alt: "Road through autumn trees" },
  { src: shot("1470252649378-9c29740c9fa8"), alt: "Canyon overlook at sunset" },
];

// ONLY DEFAULT EXPORT WILL BE TREATED AS A DEMO
export default function DemoOne() {
  return (
    <ImageStreamHero
      images={IMAGES}
      className="h-[560px] w-full rounded-card border border-brand/15 bg-base"
    >
      <div className="relative z-10 flex h-full flex-col items-center justify-between py-12 text-center">
        <div className="px-6">
          <h1 className="text-balance text-4xl font-medium tracking-title text-ink sm:text-5xl">
            Your work,
            <br />
            front and centre.
          </h1>
        </div>
        <p className="max-w-md text-balance px-6 text-sm text-ink/60">
          A hero that leads with the images instead of describing them. Swap in
          your own and the corridor rebuilds around them.
        </p>
      </div>
    </ImageStreamHero>
  );
}
