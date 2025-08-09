// Predeclare classes so Tailwind picks them up at build time
const BORDER_CLASSES = [
  "border-[#7dd3fc]",
  "border-[#f9a8d4]",
  "border-[#c4b5fd]",
  "border-[#86efac]",
  "border-[#fcd34d]",
]

const MARKER_CLASSES = [
  "marker:text-[#7dd3fc]",
  "marker:text-[#f9a8d4]",
  "marker:text-[#c4b5fd]",
  "marker:text-[#86efac]",
  "marker:text-[#fcd34d]",
]

const BG_CLASSES = [
  "bg-[#7dd3fc]",
  "bg-[#f9a8d4]",
  "bg-[#c4b5fd]",
  "bg-[#86efac]",
  "bg-[#fcd34d]",
]

const BORDER_LEFT_CLASSES = [
  "border-l-[#7dd3fc]",
  "border-l-[#f9a8d4]",
  "border-l-[#c4b5fd]",
  "border-l-[#86efac]",
  "border-l-[#fcd34d]",
]

export function borderClassByIndex(index: number): string {
  return BORDER_CLASSES[index % BORDER_CLASSES.length]
}

export function markerClassByIndex(index: number): string {
  return MARKER_CLASSES[index % MARKER_CLASSES.length]
}

export function bgClassByIndex(index: number): string {
  return BG_CLASSES[index % BG_CLASSES.length]
}

export function borderLeftClassByIndex(index: number): string {
  return BORDER_LEFT_CLASSES[index % BORDER_LEFT_CLASSES.length]
}


