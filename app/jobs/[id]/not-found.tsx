import Link from 'next/link';

export default function NotFound() {
  return <section className="px-6 py-16 text-center"><h1 className="text-2xl font-bold text-fg">This page is no longer available.</h1><Link href="/" className="mt-5 inline-flex text-accent hover:underline">Back to news</Link></section>;
}
