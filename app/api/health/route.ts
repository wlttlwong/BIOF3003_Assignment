import { NextResponse } from 'next/server';

const flaskUrl = process.env.FLASK_URL || 'http://127.0.0.1:5000';

export async function GET() {
  try {
    const res = await fetch(`${flaskUrl}/health`);

    if (!res.ok) {
      // Helpful for debugging
      console.error('Flask /health responded with status:', res.status);
      return NextResponse.json(
        { ok: false, error: `Backend status ${res.status}` },
        { status: 502 },
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (e) {
    console.error('Error calling Flask /health:', e);
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
