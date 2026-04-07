import { getnif } from './getnif'
import type { CaseStudy } from './types'

const CASE_STUDIES: Record<string, CaseStudy> = {
  getnif,
}

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES[slug]
}

export type { CaseStudy }
