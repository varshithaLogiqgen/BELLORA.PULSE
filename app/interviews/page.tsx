import type { Metadata } from 'next';
import { InterviewDirectory } from '@/components/interviews/InterviewDirectory';
export const metadata: Metadata = {
  title: 'AI Interview Preparation',
  description:
    'Practise AI and ML questions with company preparation tracks, answers, and progress tracking.',
};
export default function InterviewsPage() {
  return <InterviewDirectory />;
}
