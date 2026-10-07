import type { Metadata } from 'next';
import { Suspense } from 'react';
import { SavedView } from '@/components/SavedView';

export const metadata: Metadata = {
  title: 'Saved items',
};

export default function SavedPage() {
  return <Suspense fallback={<div role="status" className="directory-page">Loading saved items…</div>}><SavedView /></Suspense>;
}
