/**
 * A very small, permanent credit inside the footer — not a floating
 * overlay anymore. 2026-08-25, per TK: "I want the meetingpoint
 * watermark to stay in the footer, now it's everywhere" + "make it the
 * meetingpoint logo, not the name." Reuses the compass mark from
 * MeetingPoint's own nav; currentColor so it follows the footer's own
 * hover treatment. Click through to see more of MeetingPoint's work.
 */
export default function StudioMark() {
  return (
    <a
      href="https://meetingpointstudio.co.za"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Site by MeetingPoint Studio — see more of their work"
      className="inline-flex items-center text-cream-dim opacity-40 transition-opacity duration-300 hover:text-gold hover:opacity-90"
    >
      <svg width="13" height="13" viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <circle cx="32" cy="9" r="3.4" fill="currentColor" />
        <line x1="32" y1="9" x2="19" y2="52" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <line x1="32" y1="9" x2="45" y2="52" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <line
          x1="19"
          y1="52"
          x2="45"
          y2="52"
          stroke="currentColor"
          strokeOpacity="0.55"
          strokeWidth="2"
          strokeDasharray="2 3"
        />
      </svg>
    </a>
  );
}
