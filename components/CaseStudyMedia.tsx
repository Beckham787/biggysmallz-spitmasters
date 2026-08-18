import Image from "next/image";
import CaseStudySlideshow from "@/components/CaseStudySlideshow";
import type { CaseStudy } from "@/lib/case-studies";

/**
 * CaseStudyMedia — the card/hero visual for a case study. Renders a single
 * static cover when the study defines one (e.g. corporate logos, single-photo
 * events), otherwise the three-shot crossfading slideshow.
 */
export default function CaseStudyMedia({
  study,
  aspectClassName = "aspect-[4/3]",
  sizes = "(min-width: 1024px) 58vw, 100vw",
  priority = false,
  intervalMs,
}: {
  study: CaseStudy;
  aspectClassName?: string;
  sizes?: string;
  priority?: boolean;
  intervalMs?: number;
}) {
  if (study.cover) {
    return (
      <div
        className={`relative overflow-hidden rounded-sm bg-coal ${aspectClassName}`}
      >
        <Image
          src={`/images/${study.cover.image}.png`}
          alt={study.cover.alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      </div>
    );
  }

  if (study.slideshowImages) {
    return (
      <CaseStudySlideshow
        images={study.slideshowImages}
        aspectClassName={aspectClassName}
        sizes={sizes}
        priority={priority}
        {...(intervalMs ? { intervalMs } : {})}
      />
    );
  }

  return null;
}
