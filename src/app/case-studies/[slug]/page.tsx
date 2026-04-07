import { notFound } from 'next/navigation'
import { getCaseStudy } from '@/data/case-studies'
import { CaseStudyPage } from '@/components/case-studies/CaseStudyPage'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const study = getCaseStudy(slug)
  if (!study) return {}
  return {
    title: `${study.title} — Case Study | Davide Sambughi`,
    description: study.pitch,
  }
}

export function generateStaticParams() {
  return [{ slug: 'getnif' }]
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const study = getCaseStudy(slug)
  if (!study) notFound()
  return <CaseStudyPage study={study} />
}
