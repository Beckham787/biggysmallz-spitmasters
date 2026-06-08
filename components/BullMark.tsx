/**
 * BullMark — a longhorn bull skull emblem (front view). Used sparingly: footer,
 * the About "bull" section, and as the favicon (see app/icon.svg). Deliberately
 * not scattered across the site. Inherits color via currentColor.
 *
 * Drawn as a filled silhouette: the skull uses fill-rule evenodd so the eye
 * sockets and nasal cavity read as cut-out holes; the horns are mirrored copies
 * of one tapered shape.
 */
export default function BullMark({
  className = "",
  title = "Longhorn bull skull emblem",
}: {
  className?: string;
  title?: string;
}) {
  // One horn, attached at the upper-right of the skull and sweeping up-and-out.
  // The left horn is the same shape mirrored across the vertical centre (x=100).
  const horn =
    "M112 54 C134 52 156 55 170 53 C181 51 188 44 191 33 C192 29 192 26 190 25 C188 27 186 32 183 39 C179 47 168 51 150 55 C134 58 122 60 110 60 Z";

  return (
    <svg
      viewBox="0 0 200 140"
      role="img"
      aria-label={title}
      className={className}
      fill="currentColor"
    >
      <title>{title}</title>

      {/* Horns */}
      <path d={horn} />
      <path d={horn} transform="matrix(-1 0 0 1 200 0)" />

      {/* Skull with eye sockets + nasal cavity cut out (evenodd) */}
      <path
        fillRule="evenodd"
        d="
          M100 47
          C112 46 116 47 119 49
          C129 55 135 59 136 67
          C137 75 131 81 125 87
          C121 95 117 103 113 111
          C109 117 105 121 100 123
          C95 121 91 117 87 111
          C83 103 79 95 75 87
          C69 81 63 75 64 67
          C65 59 71 55 81 49
          C84 47 88 46 100 47
          Z
          M125 63 C131 64 133 69 130 74 C127 78 121 78 118 74 C115 70 119 63 125 63 Z
          M75 63 C69 64 67 69 70 74 C73 78 79 78 82 74 C85 70 81 63 75 63 Z
          M100 81 C104 87 109 94 106 102 C104 106 96 106 94 102 C91 94 96 87 100 81 Z
        "
      />
    </svg>
  );
}
