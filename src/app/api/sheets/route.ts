import { NextResponse } from 'next/server';
import { getSheetData as fetchSheetData } from '@/lib/data-loader';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name') as any;

  if (!name) {
    return NextResponse.json({ error: 'Sheet name is required' }, { status: 400 });
  }

  try {
    const data = await fetchSheetData(name);
    return NextResponse.json(data);
  } catch (error) {
    console.error(`Error fetching sheet "${name}":`, error);
    return NextResponse.json({ error: 'Failed to fetch sheet data' }, { status: 500 });
  }
}
