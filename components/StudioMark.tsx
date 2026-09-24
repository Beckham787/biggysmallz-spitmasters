/**
 * A very small, permanent credit inside the footer (kept since 2026-08-25, per
 * TK: the studio watermark stays in the footer, as the logo, not the name).
 *
 * Stage 7 (2026-09-24): the studio rebranded from MeetingPoint Studio to TK
 * Studio on 2026-09-08, and this credit still showed MeetingPoint's compass and
 * linked to meetingpointstudio.co.za. Now it's TK Studio's woven T/K mark,
 * geometry copied from TK Studio Site/components/Mark.tsx at nav weight. The
 * knockout that makes the weave is drawn in the footer's own ground colour
 * (Jacket Black), so it reads as the ground.
 */
export default function StudioMark() {
  const weight = 6.5;
  const cut = 3.2 + weight * 0.33;
  return (
    <a
      href="https://tkstudio.co.za"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Site by TK Studio — see more of their work"
      className="inline-flex items-center text-cream-dim opacity-40 transition-opacity duration-300 hover:text-paper hover:opacity-90"
    >
      <svg width="14" height="14" viewBox="0 0 64 64" fill="none" aria-hidden="true" stroke="currentColor">
        <line x1="16" y1="17" x2="48" y2="17" strokeWidth={weight} strokeLinecap="square" />
        <line x1="32" y1="17" x2="32" y2="52" strokeWidth={weight} strokeLinecap="square" />
        <line x1="25" y1="34" x2="46" y2="19" strokeWidth={weight} strokeLinecap="round" />
        <line x1="25" y1="34" x2="46" y2="49" strokeWidth={weight} strokeLinecap="round" />
        <line x1="32" y1={39 - cut} x2="32" y2={39 + cut} stroke="#161517" strokeWidth={weight * 2} strokeLinecap="butt" />
        <line x1="32" y1={39 - cut} x2="32" y2={39 + cut} strokeWidth={weight} strokeLinecap="square" />
      </svg>
    </a>
  );
}
