import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { companies } from '@/lib/interviews/catalog';
import { InterviewDirectory } from '@/components/interviews/InterviewDirectory';
type Props = { params: Promise<{ company: string }> };
export const generateStaticParams = () =>
  companies.map(({ slug }) => ({ company: slug }));
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { company: slug } = await params;
  const company = companies.find((item) => item.slug === slug);
  return {
    title: company
      ? `${company.name} AI Interview Practice`
      : 'Company not found',
    description: company?.description,
  };
}
export default async function CompanyPage({ params }: Props) {
  const { company: slug } = await params;
  const company = companies.find((item) => item.slug === slug);
  if (!company) notFound();
  return <InterviewDirectory key={slug} company={company} />;
}
