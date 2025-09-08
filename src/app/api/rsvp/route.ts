import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // TODO: persist somewhere (email, db, sheet). For now, just acknowledge.
    // Basic validation
    if (!body.email || !body.firstName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}


