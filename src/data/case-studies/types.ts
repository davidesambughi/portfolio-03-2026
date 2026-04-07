export type ProjectStatus = 'LIVE' | 'WIP' | 'SHIPPED'

export type Decision = {
  chosen: string
  alternatives: string[]
  rationale: string
}

export type Challenge = {
  title: string
  description: string
  points?: string[]   // optional bullets expanding the description
  resolution: string
  diagram?: string    // optional path to a supporting diagram
}

export type CaseStudy = {
  slug: string
  title: string
  pitch: string
  status: ProjectStatus
  liveUrl: string
  tags: string[]
  screenshot: string
  screenshotAlt: string
  problem: {
    summary: string
    constraints: string[]
  }
  architectureDiagram: string | null  // null = show placeholder
  architectureCaption: string
  architecturePoints?: string[]       // optional bullet points below caption
  challenges: Challenge[]             // rendered before decisions
  decisions: Decision[]
  reflection: string
}
