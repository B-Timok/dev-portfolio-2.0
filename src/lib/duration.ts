const MONTH_INDEX: Record<string, number> = {
  Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
  Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
}

function parsePoint(text: string): Date | null {
  if (/present/i.test(text)) return new Date()
  const match = text.match(/(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\w*\s+(\d{4})/)
  if (!match) return null
  const month = MONTH_INDEX[match[1] as keyof typeof MONTH_INDEX]
  const year = parseInt(match[2], 10)
  return new Date(year, month, 1)
}

/**
 * Compute a human-readable duration from a period string like
 * "Dec 2025 – Present" or "Jul 2024 – March 2025". Returns "9 mos",
 * "1 yr", "1 yr 4 mos", etc. Falls back to an empty string if the
 * period can't be parsed.
 */
export function formatDuration(period: string): string {
  const [start, end] = period.split(/\s*[–-]\s*/)
  if (!start || !end) return ""
  const startDate = parsePoint(start)
  const endDate = parsePoint(end)
  if (!startDate || !endDate) return ""

  let months =
    (endDate.getFullYear() - startDate.getFullYear()) * 12 +
    (endDate.getMonth() - startDate.getMonth())
  if (months < 1) months = 1

  const years = Math.floor(months / 12)
  const rem = months % 12
  if (years === 0) return `${rem} ${rem === 1 ? "mo" : "mos"}`
  if (rem === 0) return `${years} ${years === 1 ? "yr" : "yrs"}`
  return `${years} ${years === 1 ? "yr" : "yrs"} ${rem} ${rem === 1 ? "mo" : "mos"}`
}
