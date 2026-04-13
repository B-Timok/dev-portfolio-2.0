export const FALLBACK_BRAND = "#c4b5fd"

export const COMPANY_BRAND: Record<string, string> = {
  "ANA Corp":  "#ef4444",
  "Athlos":    "#3ecf8e",
  "Lessi AI":  "#f97316",
  "Freelance": "#3b82f6",
  "UNLV OED":  "#cf0a2c",
}

export const TOOL_BRAND: Record<string, string> = {
  "React":        "#61dafb",
  "React Native": "#61dafb",
  "TypeScript":   "#3178c6",
  "JavaScript":   "#f7df1e",
  "Node.js":      "#5fa04e",
  "PostgreSQL":   "#4169e1",
  "Postgres":     "#4169e1",
  "Supabase":     "#3ecf8e",
  "AWS":          "#ff9900",
  "Tailwind":     "#38bdf8",
  "Docker":       "#2496ed",
  "Vite":         "#bd34fe",
  "MongoDB":      "#47a248",
  "Terraform":    "#7b42bc",
  "Python":       "#3776ab",
  "SvelteKit":    "#ff3e00",
  "FastAPI":      "#009485",
  "Textual":      "#3776ab",
}

export function brandColor(key: string, map: Record<string, string>): string {
  return map[key] ?? FALLBACK_BRAND
}
