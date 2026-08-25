"use client";

/**
 * A very small, permanent credit — bottom-left, clear of the WhatsApp
 * FloatingCta (bottom-right on mobile) and the nav. Click through to see
 * more of MeetingPoint's work. 2026-08-25, per TK.
 */
export default function StudioMark() {
  return (
    <a
      href="https://meetingpointstudio.co.za"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Site by MeetingPoint Studio — see more of their work"
      className="fixed bottom-3 left-3 z-30 font-display text-[0.55rem] uppercase tracking-[0.14em] text-cream-dim opacity-40 transition-opacity duration-300 hover:text-gold hover:opacity-90"
      style={{
        marginBottom: "env(safe-area-inset-bottom)",
        marginLeft: "env(safe-area-inset-left)",
      }}
    >
      MeetingPoint Studio
    </a>
  );
}
