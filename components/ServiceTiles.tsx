import Image from "next/image";
import { siteConfig } from "@/lib/site-config";
import Reveal from "@/components/Reveal";

/**
 * ServiceTiles — the six things Biggy cooks, each with one of his own
 * photographs and the label from site-config. Labels only: no blurbs, prices,
 * guest numbers or inclusions (those are quoted per event). Used on the
 * homepage and on /work, so the range is described the same way in both.
 *
 * The photograph is the proof, so it is cropped to 4:5 on phones and 4:3 from
 * tablet up; every service photo has its food in the middle of the frame.
 */
export default function ServiceTiles() {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
      {siteConfig.services.map((service, i) => (
        <li key={service.title}>
          <Reveal delay={(i % 3) * 90}>
            <figure className="relative aspect-[4/5] overflow-hidden rounded-sm bg-coal md:aspect-[4/3]">
              <Image
                src={`/images/${service.image}`}
                alt={service.alt}
                fill
                sizes="(min-width: 1024px) 30vw, (min-width: 768px) 32vw, 50vw"
                className="object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(0deg, rgba(22,21,23,0.92) 0%, rgba(22,21,23,0.55) 28%, rgba(22,21,23,0) 55%)",
                }}
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-3 font-display text-sm uppercase leading-snug tracking-[0.05em] text-paper sm:p-4 sm:text-base">
                {service.title}
              </figcaption>
            </figure>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
