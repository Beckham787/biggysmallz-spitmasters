/**
 * YearRail — five ticks on a rule, one per festival year, like the marks on a
 * ruler. The only thing it says is "2022 to 2026, five editions", which is
 * exactly the fact it stands for, so it is not decoration. Used on the
 * homepage feature and the /work and /mozambique headers.
 */
const YEARS = ["2022", "2023", "2024", "2025", "2026"];

export default function YearRail({ className = "" }: { className?: string }) {
  return (
    <ol
      aria-label="Festival years, 2022 to 2026"
      className={`grid max-w-xs grid-cols-5 border-t border-cream/50 ${className}`}
    >
      {YEARS.map((year) => (
        <li
          key={year}
          className="border-l border-cream/50 pl-2 pt-2 font-display text-xs tracking-[0.08em] text-cream"
        >
          {year}
        </li>
      ))}
    </ol>
  );
}
