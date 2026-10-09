import { NextResponse } from 'next/server';

const API_URL =
  'https://www.bell-integration.com/wp-json/wp/v2/news?per_page=7&_fields=id,date,link,title,acf';

export const revalidate = 3600;

export async function GET() {
  try {
    const res = await fetch(API_URL, {
      next: { revalidate: 3600 },
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return NextResponse.json([], { status: 200 });
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
