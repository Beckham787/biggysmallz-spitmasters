import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70svh] items-center justify-center bg-charcoal px-6 pt-24 text-center">
      <div>
        <p className="eyebrow mb-4">404</p>
        <h1 className="text-4xl font-bold text-cream sm:text-5xl">
          Nothing on the coals here
        </h1>
        <p className="mx-auto mt-5 max-w-md text-lg text-cream-dim">
          That page has gone cold. Let&rsquo;s get you back to the fire.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/" className="btn-ember">
            Home
          </Link>
          <Link href="/book" className="btn-ghost">
            Book a Date
          </Link>
        </div>
      </div>
    </section>
  );
}
