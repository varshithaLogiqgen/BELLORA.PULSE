import type { Metadata } from 'next';
import { ToolsDirectory } from '@/components/tools/ToolsDirectory';

export const metadata: Metadata = {
  title: 'AI Tools A–Z',
  description: 'Discover AI tools by task, category, pricing, and name.',
};

export default function ToolsPage() {
  return <ToolsDirectory />;
}
