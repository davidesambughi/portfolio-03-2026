export type ProjectStatus = 'LIVE' | 'WIP' | 'SHIPPED'

export type Decision = {
  chosen: string
  alternatives: string[]
  rationale: string
}

export type Challenge = {
  title: string
  description: string
  resolution: string
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
  challenges: Challenge[]             // rendered before decisions
  decisions: Decision[]
  reflection: string
}
