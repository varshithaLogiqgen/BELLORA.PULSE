export function GET() {
  return Response.json({ error: 'This module is no longer available.' }, { status: 410 });
}
